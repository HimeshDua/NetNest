<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  use HasFactory;

  protected $table = 'messages';

  protected $fillable = ['conversation_id', 'user_id', 'body'];

  public function conversation()
  {
    return $this->belongsTo(\App\Models\Conversation::class);
  }

  public function user()
  {
    return $this->belongsTo(\App\Models\User::class);
  }
}
