<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;
use App\Http\Controllers\productController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Routers para generar CRUD en usuario
 */
Route::get('user/consultar', [userController::class, "index"]);
Route::post('user/verificar', [userController::class, "Verificar"]);
Route::post('user/crear', [userController::class, "save"]);
Route::patch('user/editarUser/{id}', [userController::class, "updateUser"]);
Route::patch('user/editarLogin/{id}', [userController::class, "updateLogin"]);
/**
 * Routers para generar CRUD en producto
 */
Route::get('product/consultar', [productController::class, "index"]);
Route::post('product/verificar', [productController::class, "Verificar"]);
Route::post('product/crear', [productController::class, "save"]);
Route::patch('product/updateProduct/{id}', [productController::class, "updateProduct"]);
Route::patch('product/updateQuantity/{id}', [productController::class, "updateQuantity"]);
