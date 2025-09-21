<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ChatController extends Controller
{
  /**
   * Customer: Open (or create) a conversation with a vendor.
   * Only allowed if the authenticated customer has a purchase/subscription/transaction
   * tied to that vendor.
   */

  public function vendorIndex()
  {
    $vendorId = Auth::id();

    $conversations = Conversation::where('vendor_id', $vendorId)
      ->with(['customer']) // optional: eager load customer
      ->orderByDesc('updated_at')
      ->get();

    return Inertia::render('Vendor/Conversations', [
      'conversations' => $conversations,
      'auth' => ['user' => Auth::user()],
    ]);
  }

  public function openWithVendor(int $vendorId)
  {
    $customerId = Auth::id();

    // Prevent chatting with yourself
    if ($customerId === (int) $vendorId) {
      abort(400, 'Invalid vendor.');
    }

    // Ensure customer actually bought from this vendor
    if (!$this->hasPurchasedFromVendor($customerId, $vendorId)) {
      abort(403, 'You are not authorized to chat with this vendor. Purchase required.');
    }

    // Create or return existing conversation between this customer & vendor
    $conversation = Conversation::firstOrCreate(
      ['customer_id' => $customerId, 'vendor_id' => $vendorId]
    );

    // Render Inertia chat page (your Public/Chat Inertia component should render Chat UI)
    return Inertia::render('Public/Chat', [
      'conversationId' => $conversation->id,
      'auth' => ['user' => Auth::user()],
    ]);
  }

  /**
   * Open an existing conversation by id (customer or vendor).
   * Both participants are allowed; others are blocked.
   */
  public function show(Conversation $conversation)
  {
    $userId = Auth::id();

    if (! in_array($userId, [$conversation->customer_id, $conversation->vendor_id])) {
      abort(403, 'Not allowed.');
    }

    return Inertia::render('Public/Chat', [
      'conversationId' => $conversation->id,
      'auth' => ['user' => Auth::user()],
      'conversation' => [
        'customer_id' => $conversation->customer_id,
        'vendor_id' => $conversation->vendor_id,
      ],
    ]);
  }

  /**
   * Fetch messages for a conversation (authorized participants only).
   */
  public function fetch(Conversation $conversation)
  {
    $userId = Auth::id();
    if (! in_array($userId, [$conversation->customer_id, $conversation->vendor_id])) {
      abort(403);
    }

    return $conversation->messages()->with('user')->orderBy('created_at')->get();
  }

  /**
   * Send message in a conversation (participant only).
   * Broadcasts MessageSent event to private channel chat.{conversationId}
   */
  public function send(Request $request, Conversation $conversation)
  {
    $userId = Auth::id();
    if (! in_array($userId, [$conversation->customer_id, $conversation->vendor_id])) {
      abort(403);
    }

    $data = $request->validate([
      'body' => 'required|string|max:2000',
    ]);

    $message = $conversation->messages()->create([
      'user_id' => $userId,
      'body' => $data['body'],
    ]);

    // Broadcast immediately (dev friendly). Use ShouldBroadcast in prod if queued.
    broadcast(new MessageSent($message))->toOthers();
    Log::info('MessageSent broadcasted', ['conversation' => $conversation->id, 'message_id' => $message->id]);

    return response()->json($message->load('user'));
  }

  /**
   * Check if customer actually purchased from vendor.
   * Conditions:
   *  - customer has an active subscription for any vendor_service that belongs to $vendorId
   *    OR
   *  - customer has a completed transaction on a subscription where that subscription's vendor service belongs to $vendorId
   */
  protected function hasPurchasedFromVendor(int $customerId, int $vendorId): bool
  {
    // 1) Active subscription on a vendorService owned by $vendorId
    $hasActiveSubscription = \App\Models\CustomerSubscription::where('user_id', $customerId)
      ->whereHas('vendorService', function ($q) use ($vendorId) {
        $q->where('user_id', $vendorId);
      })
      ->where('status', 'active')
      ->exists();

    if ($hasActiveSubscription) {
      return true;
    }

    // 2) Completed transaction tied to a subscription whose vendorService belongs to $vendorId
    $hasCompletedTransaction = \App\Models\CustomerTransaction::whereHas('subscription', function ($q) use ($customerId, $vendorId) {
      $q->where('user_id', $customerId)
        ->whereHas('vendorService', function ($qq) use ($vendorId) {
          $qq->where('user_id', $vendorId);
        });
    })
      ->where('status', 'completed')
      ->exists();

    return $hasCompletedTransaction;
  }
}
