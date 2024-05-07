<?php

namespace App\Traits\Providers;

use App\Helpers\Core as Helper;
use App\Models\Game;
use App\Models\Provider;
use App\Models\GamesKey;
use App\Models\GGRGames;
use App\Models\Order;
use App\Models\User;
use App\Models\Wallet;
use App\Traits\Missions\MissionTrait;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

trait RenanTrait
{
    use MissionTrait;




    public static function GameLaunchRenan($provider_code, $game_code, $lang, $userId)
    {
       

             

            $endpointwo = "https://slots1.igamiesoft.com/api/v1/game_launch";


                $wallet = Wallet::where('user_id', $userId)->where('active', 1)->first();

                error_log($game_code);

                switch ($game_code) {
                    case '40':
                        $gamename = "jungle-delight";
                        break;
						
						      case '98':
                        $gamename = "fortune-ox";
                        break;
						        case '63':
                        $gamename = "dragon-tiger-luck";
                        break;
						
						 case '42':
                        $gamename = "ganesha-gold";
                        break;
						
							 case '48':
                        $gamename = "double-fortune";
                        break;
						
						
                    case '68':
                        $gamename = "fortune-mouse";
                        break;
                    case '69':
                        $gamename = "bikini-paradise";
                    break;
                    case '126':
                        $gamename = "fortune-tiger";
                        break;
                    case '1543462':
                        $gamename = "fortune-rabbit";
                        break;
                    case '1695365':
                        $gamename = "fortune-dragon";
                        break;
                }

                $user = User::where('id', $userId)->first();
                $postArray = [
                    "secretKey"    => '1e2854de-ef2c-4852-a30a-350dbd2da1ef',
                    "agentToken"   => 'c12b0e1e-c99a-45da-bf99-577a304fea17',
                    "user_code"     => $userId.'',
                    "provider_code" => $provider_code,
                    "game_code"     => $gamename,
                    "user_balance" => $wallet->total_balance,
                    "is_influencer" => $user->is_demo_agent,
                    "lang"          => $lang
                ];
                $wallet = Wallet::where('user_id', $userId)->where('active', 1)->first();

                $response = Http::post($endpointwo, $postArray);
                $data = $response->json();

                $data['launchUrl'] = $data['launch_url'];

            

            return $data;

        }

    }

 









?>