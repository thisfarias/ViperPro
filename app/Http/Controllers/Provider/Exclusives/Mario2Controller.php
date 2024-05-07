<?php

namespace App\Http\Controllers\Api\Providers\Exclusives;

use App\Enums\BalanceOriginEnum;
use App\Enums\BalanceStatusEnum;
use App\Enums\BalanceTypeEnum;
use App\Enums\SettingEnum;
use App\Http\Controllers\Controller;
use App\Models\Balance;
use App\Models\GameBalance;
use App\Models\GameExclusive;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class Mario2Controller extends Controller
{
    public function saldoatual()
    {
        try {
            $user = User::where('id', Auth::id())->select('id')->first();
            $wallet = $user->wallet;

            // return a text with only the balance e.g. echo 10;
            return response($wallet->balance);
        } catch (\Exception $e) {
            // return a text response with only the error message e.g. "Error: Could not retrieve balance"
            return response()->json($e->getMessage());
        }
    }

    public function remover_saldo()
    {
        return response()->json('Not implemented');
    }

    public function info()
    {
        $user = User::where('id', Auth::id())->select('id')->first();

        $diff = match ($user->getGameDifficult('angry')) {
            'easy' => 10,
            'medium' => 7,
            'hard' => 3,
            default => 1,
        };

        return response()->json([
            /**
             * {
             * "id": 1,
             * "has_first_deposit": true,
             * "balances": {
             * "money_out": {
             * "paid": 16,
             * "total": 16
             * },
             * "money_in": {
             * "paid": 200,
             * "total": 200
             * },
             * "total_balance": 184
             * }
             * },
             */
            'user' => null,
            'aposta' => [
                'amount' => GameBalance::lastUserBalance('angry', $user)->amount,
            ],
            'dificult' => 4,
        ]);
    }

    public function gameover()
    {
        return redirect('/');
    }

    public function xmetaInfo()
    {
        try {
            $user = User::where('id', Auth::id())->first();
            $lastBalance = GameBalance::lastUserBalance('angry', $user);
            $game = GameExclusive::where('slug', 'mario2')->first();
            $xmeta = $game->xmeta;
            $value = $xmeta->value * $lastBalance->amount;

            return response($value);
        } catch (\Exception $e) {
            return response(10);
        }
    }

    public function coinValue()
    {
        try {
            $user = User::where('id', Auth::id())->first();

            return response()->json([
                'coin_value' => $user->getGameCoinValue('mario2'),
            ]);
        } catch (\Exception $e) {
            throw $e;
            return response()->json([
                'coin_value' => 0.01,
            ]);
        }
    }
}
