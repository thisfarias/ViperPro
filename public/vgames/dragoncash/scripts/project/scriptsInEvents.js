


const scriptsInEvents = {

	async Egame_Event8_Act3(runtime, localVars)
	{
		var xhr = new XMLHttpRequest();
		
		const 
		baseUrl = runtime.globalVars.BaseUrl,
		bet = runtime.globalVars.Bet,
		coinMeta = runtime.globalVars.Meta,
		token = runtime.globalVars.Token;
		
		xhr.open("POST", baseUrl + "/vgames/game/sub", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
			debugger
			console.log(xhr);
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					alert('VOCÊ ATINGIU A META!');
					window.parent.location.href = baseUrl;
				} else {
					console.error('Erro ao salvar o jogo', xhr);
					console.log(xhr.status);
					alert('Erro ao salvar o jogo: ' + xhr.responseText);
				}
			}
		};
		
		xhr.send("bet=" + encodeURIComponent(bet) + "&val=" + encodeURIComponent(coinMeta) + "&token=" + encodeURIComponent(token));
	},

	async Esplash_Event1_Act4(runtime, localVars)
	{
		function GetParamOrDefault(params, key, _default) {
			if (!params.has(key)) {
				return _default;
			}
			
			return params.get(key);
		}
		
		function ThrowIfEmtpy(value) {
			if(!value) {
				throw new Error('The value cannot be empty');
			}
			
			return value;
		}
		
		function GetUrlParams() {
			const params = new URLSearchParams(window.location.search)	
			
			runtime.globalVars.CoinValue = GetParamOrDefault(params, 'coin_value', 0.01);
			runtime.globalVars.Bet = Number(ThrowIfEmtpy(GetParamOrDefault(params, 'aposta', undefined)));
			runtime.globalVars.Meta = Number(GetParamOrDefault(params, 'xmeta', 50)) * runtime.globalVars.Bet
			runtime.globalVars.BaseUrl = ThrowIfEmtpy(GetParamOrDefault(params, 'baseurl', undefined))
			runtime.globalVars.Token = ThrowIfEmtpy(GetParamOrDefault(params, 'token', undefined));
			
			const difficult = GetParamOrDefault(params, 'velo', undefined);
			
			switch(difficult) {
				case 'easy':
					runtime.globalVars.WallMinRandomSpan = 1.5;
					runtime.globalVars.WallMaxRandomSpan = 2;
					runtime.globalVars.WallDistance = 700;
					break;
				case 'medium':
					runtime.globalVars.WallMinRandomSpan = 1.3;
					runtime.globalVars.WallMaxRandomSpan = 1.8;
					runtime.globalVars.WallDistance = 680;
					break;
				case 'hard':
					runtime.globalVars.WallMinRandomSpan = 1.2;
					runtime.globalVars.WallMaxRandomSpan = 1.5;
					runtime.globalVars.WallDistance = 670;
					break;
				default:
					runtime.globalVars.WallMinRandomSpan = 1;
					runtime.globalVars.WallMaxRandomSpan = 1;
					runtime.globalVars.WallDistance = 650;
					break;			
			}
		}
		
		GetUrlParams();
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

