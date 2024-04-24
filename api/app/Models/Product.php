<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'name', 'quantity', 'price', 'state', 'img1', 'img2', 'img3', 'pdf', 'description'];
    public $timestamps = false;
    const UPDATED_AT = null;
}
