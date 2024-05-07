<?php


use App\Http\Controllers\Gateway\EzzeBankController;
use Illuminate\Support\Facades\Route;


Route::prefix('ezzebank')
    ->group(function ()
    {
        Route::post('callback', [EzzeBankController::class, 'callbackMethod']);
        Route::post('payment', [EzzeBankController::class, 'callbackMethodPayment']);
        Route::get('withdrawal/{id}', [EzzeBankController::class, 'withdrawalFromModal'])->name('ezzebank.withdrawal');
        Route::get('cancelwithdrawal/{id}', [EzzeBankController::class, 'cancelWithdrawalFromModal'])->name('ezzebank.cancelwithdrawal');
    });

