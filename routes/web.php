<?php

use App\Models\Game;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|Sme
*/
Route::get('clear', function() {
    Artisan::command('clear', function () {
        Artisan::call('optimize:clear');
       return back();
    });

    return back();
});

Route::middleware(['web'])
    ->as('web.')
    ->group(function ()
    {
        include_once(__DIR__ . '/groups/web/vgames.php');
    });

Route::prefix('exclusives')
    ->as('exclusives.')
    ->group(function ()
    {
        // angry
        Route::get('angry/info', [\App\Http\Controllers\Api\Providers\Exclusives\AngryController::class, 'info'])->name('angry.info');
        Route::post('angry/win', [\App\Http\Controllers\Api\Providers\Exclusives\AngryController::class, 'win'])->name('angry.win');
        Route::post('angry/lost', [\App\Http\Controllers\Api\Providers\Exclusives\AngryController::class, 'lost'])->name('angry.lost');

        // mario2
        Route::get('mario2/saldoatual', [\App\Http\Controllers\Api\Providers\Exclusives\Mario2Controller::class, 'saldoatual'])->name('mario2.saldoatual');
        Route::post('mario2/remover_saldo', [\App\Http\Controllers\Api\Providers\Exclusives\Mario2Controller::class, 'remover_saldo'])->name('mario2.remover_saldo');
        Route::get('mario2/info', [\App\Http\Controllers\Api\Providers\Exclusives\Mario2Controller::class, 'info'])->name('mario2.info');
        Route::get('mario2/gameover', [\App\Http\Controllers\Api\Providers\Exclusives\Mario2Controller::class, 'gameover'])->name('mario2.gameover');
        Route::get('mario2/xmeta', [\App\Http\Controllers\Api\Providers\Exclusives\Mario2Controller::class, 'xmetaInfo'])->name('mario2.xgame');
        Route::any('mario2/coin_value', [\App\Http\Controllers\Api\Providers\Exclusives\Mario2Controller::class, 'coinValue'])->name('mario2.coin_value');
    });

// GAMES PROVIDER
include_once(__DIR__ . '/groups/provider/games.php');
include_once(__DIR__ . '/groups/provider/venix.php');
include_once(__DIR__ . '/groups/provider/salsa.php');


// GATEWAYS
include_once(__DIR__ . '/groups/gateways/digitopay.php');
include_once(__DIR__ . '/groups/gateways/ezzebank.php');
include_once(__DIR__ . '/groups/gateways/sharkpay.php');
include_once(__DIR__ . '/groups/gateways/mercadopago.php');
include_once(__DIR__ . '/groups/gateways/suitpay.php');

/// SOCIAL
include_once(__DIR__ . '/groups/auth/social.php');

// APP
include_once(__DIR__ . '/groups/layouts/app.php');

