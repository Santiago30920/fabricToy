<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Authenticatable
{
    use HasFactory;
    protected $fillable = ['name', 'lastName', 'typeDocument', 'numberDocument', 'mail', 'password', 'state', 'rol'];
    public $timestamps = false;
    const UPDATED_AT = null;

}
