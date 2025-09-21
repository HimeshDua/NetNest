<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\CustomerSubscription;


class ChatController extends Controller
{
  /**
   * Customer: Open (or create) a conversation with a vendor.
   * Only allowed if the authenticated customer has a purchase/subscription/transaction
   * tied to that vendor.
   */
  public function openWithVendor(int $vendorServiceId)
  {
    $customerId = Auth::id();

    // Prevent chatting with yourself
    if ($customerId === (int) $vendorServiceId) {
      abort(400, 'Invalid vendor.');
    }

    if ((int) !$customerId || (int) !$customerId) {
      abort(400, 'Invalid customer or vendor.');
    }

    // Ensure customer actually bought from this vendor
    if (!$this->hasPurchasedFromVendor($customerId, $vendorServiceId)) {
      abort(403, 'You are not authorized to chat with this vendor. Purchase required.');
    }

    // Create or return existing conversation between this customer & vendor
    $conversation = Conversation::firstOrCreate(
      ['customer_id' => $customerId, 'vendor_id' => $vendorServiceId]
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
   *  - customer has an active subscription for any vendor_service that belongs to $vendorServiceId
   *    OR
   *  - customer has a completed transaction on a subscription where that subscription's vendor service belongs to $vendorServiceId
   */
  protected function hasPurchasedFromVendor(int $customerId, int $vendorServiceId): bool
  {

    $hasActiveSubscription = CustomerSubscription::where('user_id', $customerId)
      ->where('status', 'active')
      ->whereHas('vendorService', function ($q) use ($vendorServiceId) {
        $q->where('id', $vendorServiceId);
      })->get();


    // dd(
    //   $hasActiveSubscription,
    //   // 'my id',
    //   // $customerId,
    //   // 'vendor service id',
    //   // $vendorServiceId
    // );

    if ($hasActiveSubscription) {
      return true;
    }

    // 2) Completed transaction tied to a subscription whose vendorService belongs to $vendorServiceId
    $hasCompletedTransaction = \App\Models\CustomerTransaction::whereHas('subscription', function ($q) use ($customerId, $vendorServiceId) {
      $q->where('user_id', $customerId)
        ->whereHas('vendorService', function ($qq) use ($vendorServiceId) {
          $qq->where('user_id', $vendorServiceId);
        });
    })
      ->where('status', 'completed')
      ->exists();

    return $hasCompletedTransaction;
  }
}
