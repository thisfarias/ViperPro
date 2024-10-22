<?php

namespace App\Traits\Gateways;

use App\Models\AffiliateHistory;
use App\Models\Deposit;
use App\Models\GamesKey;
use App\Models\Gateway;
use App\Models\Setting;
use App\Models\EzzeBankPayment;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use App\Notifications\NewDepositNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Core as Helper;

trait EzzebankTrait
{
    /**
     * @var $uri
     * @var $clienteId
     * @var $clienteSecret
     */
    protected static string $uri;
    protected static string $clienteId;
    protected static string $clienteSecret;

    /**
     * Generate Credentials
     * Metodo para gerar credenciais
     * @dev victormsalatiel - Corra de golpista, me chame no instagram
     * @return void
     */
    private static function generateCredentials()
    {
        $setting = Gateway::first();
        if (!empty($setting)) {
            self::$uri = $setting->getAttributes()['ezzebank_uri'];
            self::$clienteId = $setting->getAttributes()['ezzebank_cliente_id'];
            self::$clienteSecret = $setting->getAttributes()['ezzebank_cliente_secret'];
        }
    }

    private static function getAccessToken()
    {
        self::generateCredentials();

        $data = [
            'grant_type' => 'client_credentials',
            'password' => env('DINERO_CLIENT_APIKEY'),
        ];

        $response = Http::asForm()->withBasicAuth(self::$clienteId,self::$clienteSecret)->post(self::$uri . 'oauth/token', $data);

        if ($response->successful()) {
            $responseData = $response->json();
            return $responseData['access_token'];
        } else {
            return null;
        }
    }

    /**
     * Request QRCODE
     * Metodo para solicitar uma QRCODE PIX
     * @dev victormsalatiel - Corra de golpista, me chame no instagram
     * @return array
     */
    public static function requestQrcode($request)
    {
        $accessToken = self::getAccessToken();

        if (!$accessToken) {
            return response()->json(['error' => 'Failed to get access token'], 500);
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken
        ])->post(self::$uri.'pix/qrcode', [
            "amount" => \Helper::amountPrepare($request->amount),
            "payer" => [
                "name" => auth('api')->user()->name,
                "document" =>\Helper::soNumero($request->cpf),
            ],
        ]);

        if($response->successful()) {
            $responseData = $response->json();

            self::generateTransaction($responseData['transactionId'], \Helper::amountPrepare($request->amount)); /// gerando historico
            self::generateDeposit($responseData['transactionId'], \Helper::amountPrepare($request->amount)); /// gerando deposito

            return [
                'status' => true,
                'idTransaction' => $responseData['transactionId'],
                'qrcode' => $responseData['emvqrcps']
            ];
        }

        return [
            'status' => false,
        ];
    }

    /**
     * Consult Status Transaction
     * Consultar o status da transação
     * @dev victormsalatiel - Corra de golpista, me chame no instagram
     *
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public static function consultStatusTransaction($request)
    {
        $accessToken = self::getAccessToken();

        if (!$accessToken) {
            return response()->json(['error' => 'Failed to get access token'], 500);
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken
        ])->get(self::$uri . 'pix/qrcode/' . $request->idTransaction . '/detail');

        if($response->successful()) {
            $responseData = $response->json();

            if($responseData["status"] == "APPROVED") {
                if(self::finalizePayment($request->idTransaction)) {
                    return response()->json(['status' => 'PAID']);
                }

                return response()->json(['status' => $responseData], 400);
            }

            return response()->json(['status' => $responseData], 400);
        }
    }

    /**
     * @param $idTransaction
     * @dev victormsalatiel - Corra de golpista, me chame no instagram
     * @return bool
     */
    public static function finalizePayment($idTransaction) : bool
    {
        $transaction = Transaction::where('payment_id', $idTransaction)->where('status', 0)->first();
        $setting = \Helper::getSetting();

        if(!empty($transaction)) {
            $user = User::find($transaction->user_id);

            $wallet = Wallet::where('user_id', $transaction->user_id)->first();
            if(!empty($wallet)) {
                $setting = Setting::first();

                /// verifica se é o primeiro deposito, verifica as transações, somente se for transações concluidas
                $checkTransactions = Transaction::where('user_id', $transaction->user_id)
                    ->where('status', 1)
                    ->count();

                if($checkTransactions == 0 || empty($checkTransactions)) {
                    /// pagar o bonus
                    $bonus = Helper::porcentagem_xn($setting->initial_bonus, $transaction->price);
                    $wallet->increment('balance_bonus', $bonus);
                    $wallet->update(['balance_bonus_rollover' => $bonus * $setting->rollover]);
                }

                /// rollover deposito
                $wallet->update(['balance_deposit_rollover' => $transaction->price * intval($setting->rollover_deposit)]);

                /// acumular bonus
                Helper::payBonusVip($wallet, $transaction->price);

                if($wallet->increment('balance', $transaction->price)) {
                    if($transaction->update(['status' => 1])) {
                        $deposit = Deposit::where('payment_id', $idTransaction)->where('status', 0)->first();
                        if(!empty($deposit)) {

                            /// fazer o deposito em cpa
                            $affHistoryCPA = AffiliateHistory::where('user_id', $user->id)
                                ->where('commission_type', 'cpa')
                                //->where('deposited', 1)
                                ->where('status', 0)
                                ->first();

                            if(!empty($affHistoryCPA)) {

                                /// verifcia se já pode receber o cpa
                                $sponsorCpa = User::find($user->inviter);
                                if(!empty($sponsorCpa)) {
                                    if($affHistoryCPA->deposited_amount >= $sponsorCpa->affiliate_baseline || $deposit->amount >= $sponsorCpa->affiliate_baseline) {
                                        $walletCpa = Wallet::where('user_id', $affHistoryCPA->inviter)->first();
                                        if(!empty($walletCpa)) {

                                            /// paga o valor de CPA
                                            $walletCpa->increment('refer_rewards', $sponsorCpa->affiliate_cpa); /// coloca a comissão
                                            $affHistoryCPA->update(['status' => 1, 'commission_paid' => $sponsorCpa->affiliate_cpa]); /// desativa cpa
                                        }
                                    }else{
                                        $affHistoryCPA->update(['deposited_amount' => $transaction->price]);
                                    }
                                }
                            }

                            if($deposit->update(['status' => 1])) {
                                $admins = User::where('role_id', 0)->get();
                                foreach ($admins as $admin) {
                                    $admin->notify(new NewDepositNotification($user->name, $transaction->price));
                                }

                                return true;
                            }
                            return false;
                        }
                        return false;
                    }
                }

                return false;
            }
            return false;
        }
        return false;
    }

    /**
     * @param $idTransaction
     * @param $amount
     * @dev victormsalatiel - Corra de golpista, me chame no instagram
     * @return void
     */
    private static function generateDeposit($idTransaction, $amount)
    {
        $userId = auth('api')->user()->id;
        $wallet = Wallet::where('user_id', $userId)->first();

        Deposit::create([
            'payment_id'=> $idTransaction,
            'user_id'   => $userId,
            'amount'    => $amount,
            'type'      => 'pix',
            'currency'  => $wallet->currency,
            'symbol'    => $wallet->symbol,
            'status'    => 0
        ]);
    }

    /**
     * @param $idTransaction
     * @param $amount
     * @dev victormsalatiel - Corra de golpista, me chame no instagram
     * @return void
     */
    private static function generateTransaction($idTransaction, $amount)
    {
        $setting = \Helper::getSetting();

        Transaction::create([
            'payment_id' => $idTransaction,
            'user_id' => auth('api')->user()->id,
            'payment_method' => 'pix',
            'price' => $amount,
            'currency' => $setting->currency_code,
            'status' => 0
        ]);
    }

    /**
     * @param $request
     * @dev victormsalatiel - Corra de golpista, me chame no instagram
     * @return \Illuminate\Http\JsonResponse|void
     */
    public static function pixCashOut(array $array): bool
    {
        $accessToken = self::getAccessToken();

        if (!$accessToken) {
            return response()->json(['error' => 'Failed to get access token'], 500);
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
        ])->post(self::$uri . 'pix/payment', [
            "amount" => $array['amount'],
            "creditParty" => [
                "name" => $array['beneficiary_name'],
                "keyType" => $array['pix_type'],
                "key" => $array['pix_key'],
                "taxId" => $array['tax_id']
            ]
        ]);

        if ($response->successful()) {
            $responseData = $response->json();

            if ($responseData['status'] == 'PROCESSING') {
                $ezzeBankPayment = EzzeBankPayment::lockForUpdate()->find($array['ezzebankpayment_id']);
                if (!empty($ezzeBankPayment)) {
                    if ($ezzeBankPayment->update(['status' => 1, 'payment_id' => $responseData['idTransaction']])) {
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;
        }
        return false;
    }
}
