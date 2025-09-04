<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiaryEntryController;

Route::apiResource('diary', DiaryEntryController::class);
