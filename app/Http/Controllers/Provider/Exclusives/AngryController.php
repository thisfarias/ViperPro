<?php

namespace App\Http\Controllers\Api\Providers\Exclusives;

use App\Enums\BalanceOriginEnum;
use App\Enums\BalanceStatusEnum;
use App\Enums\BalanceTypeEnum;
use App\Enums\SettingEnum;
use App\Http\Controllers\Controller;
use App\Models\Balance;
use App\Models\GameBalance;
use App\Models\User;
use App\Models\Wallet;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AngryController extends Controller
{
    public function info()
    {
        $user = User::where('id', Auth::id())->select('id')->first();
        $diff = $user->getGameDifficult('angry');

        $diff = match ($diff) {
            'easy' => 1,
            'medium' => 5,
            'hard' => 8,
            default => 14,
        };

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'last_balance' => GameBalance::lastUserBalance('angry', $user),
            'dificult' => $diff,
            'fake' => $user->is_demo_agent,
            'urls' => [
                'info' => route('exclusives.angry.win'),
                'win' => route('exclusives.angry.win'),
            ]
        ]);
    }

    public function win(Request $request)
    {
        $user = User::find(auth()->id());
        $won = $request->ganho ?? 0;

        $wallet = Wallet::where('user_id', $user->id)->first();
        $novoSaldo = $wallet->balance + $won;
        Wallet::where('user_id', $user->id)->update(['balance' => $novoSaldo]);
    }

    public function lost()
    {
        try {
            $user = User::find(auth()->id());
            $lastBalance = Balance::where([
                ['user_id', $user->id],
                ['origin', BalanceOriginEnum::GAME->value],
                ['type', BalanceTypeEnum::MONEYOUT->value],
                ['status', BalanceStatusEnum::PAID->value]
            ])->orderBy('id', 'desc')->first();
            if ($lastBalance) {
                if (!empty($user->indicator->indicator->id)) {
                    $amount = ($lastBalance->amount / 100) * $user->rev_real;
                    Balance::create([
                        'user_id' => $user->indicator->indicator->id,
                        'origin' => BalanceOriginEnum::RAV->value,
                        'type' => BalanceTypeEnum::MONEYIN->value,
                        'status' => BalanceStatusEnum::PAID->value,
                        'amount' => $amount ?? 0
                    ]);

                    $user->balance_afiliate = $user->balance_afiliate + $amount;
                }
                $user->balance_afiliate = $user->balance + $amount;
                Balance::create([
                    'user_id' => $user->id,
                    'origin' => BalanceOriginEnum::GAME->value,
                    'type' => BalanceTypeEnum::MONEYOUT->value,
                    'status' => BalanceStatusEnum::PAID->value,
                    'amount' => 0
                ]);
            } else {
                throw new Exception('not last lost find');
            }
            return response()->json(['ok'], 200);
        } catch (Exception $e) {
            return response()->json($e, 200);
        }
    }

    /* public function restart()
    {
        try {
            $user = User::find(auth()->id());
            $lastBalance = Balance::where([
                ['user_id', $user->id],
                ['origin', BalanceOriginEnum::GAME->value],
                ['type',   BalanceTypeEnum::MONEYOUT->value],
                ['status', BalanceStatusEnum::PAID->value]
            ])->orderBy('id', 'desc')->first();

            if ($lastBalance) {
                Balance::create([
                    'user_id' => $user->id,
                    'origin'  => BalanceOriginEnum::GAME->value,
                    'type'    => BalanceTypeEnum::MONEYIN->value,
                    'status'  => BalanceStatusEnum::PAID->value,
                    'amount'  => $lastBalance->amount ?? 0
                ]);
            } else {
                throw new Exception('not last deposit find');
            }
            return response()->json(['ok'], 200);
        } catch (Exception $e) {
            return response()->json($e, 200);
        }
    } */

    public function api_novamente(Request $request)
    {
        $request->validate([
            'ganho' => ['required'],
        ]);

        try {
            $user = User::find(auth()->id());
            $won = $request->ganho ?? 0;
            Balance::create([
                'user_id' => $user->id,
                'origin' => BalanceOriginEnum::GAME->value,
                'type' => BalanceTypeEnum::MONEYIN->value,
                'status' => BalanceStatusEnum::PAID->value,
                'amount' => $won
            ]);

            return response()->json(['ok'], 200);
        } catch (Exception $e) {
            return response()->json($e, 200);
        }
    }
}
