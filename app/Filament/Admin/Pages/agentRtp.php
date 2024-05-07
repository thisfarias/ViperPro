<?php

namespace App\Filament\Admin\Pages;

use App\Models\GamesKey;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Support\Exceptions\Halt;

class AgentRtp extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static string $view = 'filament.pages.games-key-page';

    protected static ?string $title = 'RTP Jogos Renan';

    // protected static ?string $slug = 'chaves-dos-jogos';

    /**
     * @dev @victormsalatiel
     * @return bool
     */
    public static function canAccess(): bool
    {
        return auth()->user()->hasRole('admin');
    }


    public ?array $data = [];
    public ?GamesKey $setting;

    /**
     * @return void
     */
    public function mount(): void
    {   
        $urlExternalApi = 'https://chslots1.igamiesoft.com/api.php';
        $domain = "https" . "://$_SERVER[HTTP_HOST]/";;
        $data = array(
            'domain'=> $domain,
          	'event'=> 'get'
        );
        $headers = array(
            'Content-Type: application/json'
        );
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $urlExternalApi,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => $headers,
        ));
        $response = curl_exec($curl);
        $dict = json_decode($response, true);
        curl_close($curl);
        if (isset($dict['code']) && $dict['code'] == 200) {
            $this->data = $dict;
            $this->form->fill($this->data);
        }else{
            $this->form->fill();
            if (isset($dict['error'])) {
                Log::warning('Erro da API', ['error' => $dict['error']]);
            }
        }
    }

    /**
     * @param Form $form
     * @return Form
     */
    public function form(Form $form): Form
    {
        $options = [];

        // Gerar valores de 001 a 099
        for ($i = 1; $i <= 99; $i++) {
            $formattedNumber = str_pad($i, 3, '0', STR_PAD_LEFT);
            $options[$formattedNumber] = $formattedNumber;
        }
        $options['100'] = '100';

        return $form
            ->schema([
                Section::make('Probabilidade de Ganhos e Perdas em Porcentagem')
                    ->description('Escolha entre 001 até 100.')
                    ->schema([
                        Select::make('probganho')
                            ->label('Probabilidade de Ganho')
                            ->placeholder('Selecione Probabilidade de Ganho')
                            ->options($options),
                        Select::make('probbonus')
                            ->label('Probabilidade do Bônus')
                            ->placeholder('Selecione Probabilidade do Bônus')
                            ->options($options),
                        Select::make('probganhortp')
                            ->label('Probabilidade do Ganho RTP')
                            ->placeholder('Selecione Probabilidade do Ganho RTP')
                            ->options($options),
                        Select::make('probganhoinfluencer')
                            ->label('Probabilidade de Ganho do Influencer')
                            ->placeholder('Selecione Probabilidade de Ganho do Influencer')
                            ->options($options),
                        Select::make('probbonusinfluencer')
                            ->label('Probabilidade de Bônus do Influencer')
                            ->placeholder('Selecione Probabilidade de Bônus do Influencer')
                            ->options($options),
                        Select::make('probganhoaposta')
                            ->label('Probabilidade do Ganho da Aposta')
                            ->placeholder('Selecione Probabilidade do Ganho da Aposta')
                            ->options($options),
                        Select::make('probganhosaldo')
                            ->label('Probabilidade do Ganho Saldo')
                            ->placeholder('Selecione Probabilidade do Ganho Saldo')
                            ->options($options),
                    ])
                    ->columns(7),
            ])
            ->statePath('data');
    }


    /**
     * @return void
     */
    public function submit(): void
    {
        try {
            $urlExternalApi = 'https://chslots1.igamiesoft.com/api.php';
            $domain = "https" . "://$_SERVER[HTTP_HOST]/";;
            $data = array(
                'domain'=> $domain,
                'event'=> 'change',
                'probganho' => str_pad($this->data['probganho'], 3, '0', STR_PAD_LEFT),
                'probbonus' => str_pad($this->data['probbonus'], 3, '0', STR_PAD_LEFT),
                'probganhortp' => str_pad($this->data['probganhortp'], 3, '0', STR_PAD_LEFT),
                'probganhoinfluencer' => str_pad($this->data['probganhoinfluencer'], 3, '0', STR_PAD_LEFT),
                'probbonusinfluencer' => str_pad($this->data['probbonusinfluencer'], 3, '0', STR_PAD_LEFT),
                'probganhoaposta' => str_pad($this->data['probganhoaposta'], 3, '0', STR_PAD_LEFT),
                'probganhosaldo' => str_pad($this->data['probganhosaldo'], 3, '0', STR_PAD_LEFT),               
            );
            $headers = array(
                'Content-Type: application/json'
            );
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => $urlExternalApi,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => false,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => json_encode($data),
                CURLOPT_HTTPHEADER => $headers,
            ));
            $response = curl_exec($curl);
            $dict = json_decode($response, true);
            curl_close($curl);
            if (isset($dict['code']) && $dict['code'] == 200) {
                $this->data = $dict;
                $this->form->fill($this->data);
            }else{
                $this->form->fill();
                if (isset($dict['error'])) {
                    Log::warning('Erro da API', ['error' => $dict['error']]);
                }
            }
        } catch (Halt $exception) {
            Notification::make()
                ->title('Erro ao alterar dados!')
                ->body('Erro ao alterar dados!')
                ->danger()
                ->send();
        }
    }
}
