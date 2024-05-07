<?php
use App\Http\Controllers\Gateway\EzzeBankController;
use Illuminate\Support\Facades\Route;

Route::prefix('ezzebank')
    ->group(function ()
    {
        Route::post('qrcode-pix', [EzzeBankController::class, 'getQRCodePix']);
        Route::post('consult-status-transaction', [EzzeBankController::class, 'consultStatusTransactionPix']);
    });



