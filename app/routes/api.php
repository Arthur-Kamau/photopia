<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// routes/api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\PhotosController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// get photos and albums
Route::get('/gallery', [GalleryController::class, 'gallery'])->middleware('auth:sanctum');

// get photos
Route::get('/photos', [PhotosController::class, 'photos'])->middleware('auth:sanctum');
// new photo
Route::post('/photos', [PhotosController::class, 'addPhoto'])->middleware('auth:sanctum');
// delete photo
Route::delete('/photos', [PhotosController::class, 'deletePhoto'])->middleware('auth:sanctum');
// share
Route::post('/share/photo', [PhotosController::class, 'sharePhoto'])->middleware('auth:sanctum');

// get albums
Route::get('/album', [AlbumController::class, 'albums'])->middleware('auth:sanctum');
//create albm
Route::post('/album', [AlbumController::class, 'addAlbum'])->middleware('auth:sanctum');
//delete album
Route::delete('/album', [AlbumController::class, 'deleteAlbum'])->middleware('auth:sanctum');
// add and remove
Route::post('/album/add', [AlbumController::class, 'addPhotoToAlbum'])->middleware('auth:sanctum');
Route::post('/album/remove', [AlbumController::class, 'removePhotoToAlbum'])->middleware('auth:sanctum');
//share sharable
Route::post('/share/album', [AlbumController::class, 'shareAlbum'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
