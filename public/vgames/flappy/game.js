var stage,
    w,
    h,
    loader,
    pipe1height,
    pipe2height,
    pipe3height,
    startX,
    startY,
    wiggleDelta;
var background,
    bird,
    ground,
    pipe,
    bottomPipe,
    pipes,
    rotationDelta,
    counter,
    counterOutline;
var started = false;
var startJump = false; // Has the jump started?

var jumpAmount = 120; // How high is the jump?
var jumpTime = 266;

var dead = false; // is the bird dead?
var KEYCODE_SPACE = 32; //usefull keycode
var gap = 250;
var masterPipeDelay = 78; // delay between pipes
var pipeDelay = masterPipeDelay; //counter used to monitor delay

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var gapDegreeValue = 15;

var scoreValue = 1;

const urlParams = new URLSearchParams(window.location.search);

var metaInput = document.getElementById("metaInput");

var saldoForm = document.getElementById("saldoForm");

var counterShow = false;

document.onkeydown = handleKeyDown;

// Obtém o valor do parâmetro "meta" da URL e converte-o para um número
const diff = decodeURIComponent(urlParams.get("velo"));

let velo = 0;

if (diff === "easy") {
    velo = 200;
} else if (diff === "medium") {
    velo = 400;
} else if (diff === "hard") {
    velo = 650;
} else {
    velo = 800
}

const baseurl = decodeURIComponent(urlParams.get("baseurl")).toString();
const token = decodeURIComponent(urlParams.get("token")).toString();
const aposta = +decodeURIComponent(urlParams.get("aposta"));
const xmeta     = Number.parseFloat(decodeURIComponent(urlParams.get("xmeta")));

metaInput.value = xmeta * aposta; // 'meta' é o valor que o jogador atingiu
meta = xmeta * aposta;

// alert("Aposta: " + aposta);
// alert("Meta: " + meta);
// seta o tamanho do gap por meta

function init() {
    if (window.top != window) {
    }

    stage = new createjs.Stage("testCanvas");

    createjs.Touch.enable(stage);
    // stage.canvas.width = document.body.clientWidth; //document.width is obsolete
    // stage.canvas.height = document.body.clientHeight; //document.height is obsolete

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    manifest = [
        { src: "http://www.appcycle.me/flappy/img/bird.png", id: "bird" },
        { src: "coin.png", id: "coin" },
        {
            src: "http://www.appcycle.me/flappy/img/background.png",
            id: "background",
        },
        { src: "http://www.appcycle.me/flappy/img/ground.png", id: "ground" },
        { src: "http://www.appcycle.me/flappy/img/pipe.png", id: "pipe" },
        { src: "http://www.appcycle.me/flappy/fonts/FB.eot" },
        { src: "http://www.appcycle.me/flappy/fonts/FB.svg" },
        { src: "http://www.appcycle.me/flappy/fonts/FB.ttf" },
        { src: "http://www.appcycle.me/flappy/fonts/FB.woff" },
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
}

function handleComplete() {
    var coinImg = loader.getResult("coin");
    var coin = new createjs.Bitmap(coinImg);
    // Definir a posição da moeda no palco
    coin.x = w / 3; // Defina a coordenada X desejada
    coin.y = 60; // Defina a coordenada Y desejada
    coin.zIndex = 9999; // Defina o índice Z desejado
    coin.scaleX = 0.025; // Fator de escala horizontal (largura)
    coin.scaleY = 0.025; // Fator de escala vertical (altura)

    // Adicionar a moeda ao palco
    stage.addChild(coin);

    // Atualizar o palco para renderizar a moeda
    stage.update();

    background = new createjs.Shape();
    background.graphics
        .beginBitmapFill(loader.getResult("background"))
        .drawRect(0, 0, w, h);

    var groundImg = loader.getResult("ground");
    ground = new createjs.Shape();
    ground.graphics
        .beginBitmapFill(groundImg)
        .drawRect(0, 0, w + groundImg.width, groundImg.height);
    ground.tileW = groundImg.width;
    ground.y = h - groundImg.height;

    var data = new createjs.SpriteSheet({
        images: [loader.getResult("bird")],
        //set center and size of frames, center is important for later bird roation
        frames: { width: 92, height: 64, regX: 46, regY: 32, count: 3 },
        // define two animations, run (loops, 0.21x speed) and dive (returns to dive and holds frame one static):
        animations: { fly: [0, 2, "fly", 0.21], dive: [1, 1, "dive", 1] },
    });
    bird = new createjs.Sprite(data, "fly");

    startX = w / 2 - 92 / 2;
    startY = 512;
    wiggleDelta = 18;

    // Set initial position and scale 1 to 1
    bird.setTransform(startX, startY, 1, 1);
    // Set framerate
    bird.framerate = 30;

    //338, 512
    // Use a tween to wiggle the bird up and down using a sineInOut Ease
    createjs.Tween.get(bird, { loop: true })
        .to({ y: startY + wiggleDelta }, 380, createjs.Ease.sineInOut)
        .to({ y: startY }, 380, createjs.Ease.sineInOut);

    stage.addChild(background);
    stage.addChild(coin);

    pipes = new createjs.Container();
    stage.addChild(pipes);

    stage.addChild(bird, ground);
    stage.addEventListener("stagemousedown", handleJumpStart);

    counter = 0;
    contadorText = new createjs.Text(
        "R$" + counter,
        "46px 'Flappy Money'",
        "#ffffff"
    );
    metaText = new createjs.Text(
        "META:" + meta,
        "26px 'Flappy Money'",
        "#ffffff"
    );
    counterOutline = new createjs.Text(
        "R$" + counter,
        "46px 'Flappy Money'",
        "#000000"
    );
    counterOutline.outline = 1;
    counterOutline.textAlign = "center";
    contadorText.textAlign = "center";
    metaText.x = w / 3;
    metaText.y = 120;

    contadorText.x = w / 2;
    contadorText.y = 60;
    contadorText.alpha = 1;
    contadorText.alpha = 1;
    stage.addChild(contadorText, metaText);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function playAudioOnce() {
    var audio = document.getElementById("meuAudio");

    // Verifica se o áudio está pausado antes de reproduzir
    if (audio.paused) {
        audio.play();

        // Define um evento para parar o áudio após a reprodução
        audio.addEventListener("ended", function () {
            audio.pause();
        });
    }
}

function handleKeyDown(e) {
    //cross browser issues exist
    if (!e) {
        var e = window.event;
    }
    switch (e.keyCode) {
        case KEYCODE_SPACE:
            handleJumpStart();
    }
}

function handleJumpStart() {
    if (!dead) {
        createjs.Tween.removeTweens(bird);
        bird.gotoAndPlay("jump");
        startJump = true;
        if (!started) {
            started = true;
            counterShow = true;
        }
    }
}

function diveBird() {
    bird.gotoAndPlay("dive");
}

function die() {
    dead = true;
    bird.gotoAndPlay("dive");
    createjs.Tween.removeTweens(bird);
    createjs.Tween.get(bird)
        .wait(0)
        .to({ y: bird.y + 200, rotation: 90 }, 380 / 1.5, createjs.Ease.linear)
        .call(diveBird)
        .to(
            { y: ground.y - 30 },
            (h - (bird.y + 200)) / 1.5,
            createjs.Ease.linear
        );

    createjs.Tween.get(stage).to({ alpha: 0 }, 100).to({ alpha: 1 }, 100);

    if (counter >= meta) {
        alert("O Jogo Acabou! Você Ganhou: " + "R$ " + counter);
        $.post(baseurl + "/vgames/game/sub", { bet: aposta, val: counter, token: token }, function (data) {
          window.parent.location.href = baseurl;
        }).fail(function (e) {
            console.error('Erro ao salvar o jogo', e);
            alert('Erro ao salvar o jogo: ' + e.responseText);
        });
    } else {
        alert(
            "Ops não foi dessa vez! Você Ganhou: " +
                "R$ " +
                counter +
                " e a meta era: " +
                "R$ " +
                meta +
                ""
        );
        window.parent.location.href = baseurl;
    }
}

function tick(event) {
    var deltaS = event.delta / 1000;

    var l = pipes.getNumChildren();

    if (bird.y > ground.y - 40) {
        if (!dead) {
            die();
        }
        if (bird.y > ground.y - 30) {
            createjs.Tween.removeTweens(bird);
        }
    }

    if (!dead) {
        ground.x = (ground.x - deltaS * 300) % ground.tileW;
    }

    if (started && !dead) {
        if (pipeDelay == 0) {
            pipe = new createjs.Bitmap(loader.getResult("pipe"));
            pipe.x = w + 600;
            pipe.y = (ground.y - gap * 2) * Math.random() + gap * 1.5;
            pipes.addChild(pipe);
            // createjs.Tween.get(pipe).to({x:0 - pipe.image.width}, 5100)

            pipe2 = new createjs.Bitmap(loader.getResult("pipe"));
            pipe2.scaleX = -1;
            pipe2.rotation = 180;
            pipe2.x = pipe.x; //+ pipe.image.width
            pipe2.y = pipe.y - gap;
            // createjs.Tween.get(pipe2).to({x:0 - pipe.image.width}, 5100)

            pipes.addChild(pipe2);

            pipeDelay = masterPipeDelay;
        } else {
            pipeDelay = pipeDelay - 1;
        }
        for (var i = 0; i < l; i++) {
            pipe = pipes.getChildAt(i);
            if (pipe) {
                if (true) {
                    // tried replacing true with this, but it's off: pipe.x < bird.x + 92 && pipe.x > bird.x
                    var collision = ndgmr.checkRectCollision(
                        pipe,
                        bird,
                        1,
                        true
                    );
                    if (collision) {
                        if (collision.width > 8 && collision.height > 8) {
                            die();
                        }
                    }
                }
                pipe.x = pipe.x - deltaS * 300;
                if (
                    pipe.x <= 338 &&
                    pipe.rotation == 0 &&
                    pipe.name != "counted"
                ) {
                    pipe.name = "counted"; //using the pipe name to count pipes
                    counter = counter + scoreValue;
                    gap = gap - gapDegreeValue;
                    contadorText.text = "R$ " + counter; // Atualize o texto do contador
                    playAudioOnce();
                }
                if (pipe.x + pipe.image.width <= -pipe.w) {
                    pipes.removeChild(pipe);
                }
            }
        }
        if (counterShow) {
            counter.alpha = 1;
            counterOutline.alpha = 1;
            counterShow = false;
        }
    }

    if (counter >= meta) {
      $.post(baseurl + "/vgames/game/sub", { bet: aposta, val: counter, token: token }, function (data) {
        window.parent.location.href = baseurl;
      }).fail(function (e) {
          console.error('Erro ao salvar o jogo', e);
          alert('Erro ao salvar o jogo: ' + e.responseText);
      });
    }


    if (startJump == true) {
        startJump = false;
        bird.framerate = 60;
        bird.gotoAndPlay("fly");
        if (bird.roation < 0) {
            rotationDelta = (-bird.rotation - 20) / 5;
        } else {
            rotationDelta = (bird.rotation + 20) / 5;
        }
        if (bird.y < -200) {
            bird.y = -200;
        }
        createjs.Tween.get(bird)
            .to(
                { y: bird.y - rotationDelta, rotation: -20 },
                rotationDelta,
                createjs.Ease.linear
            ) //rotate to jump position and jump bird
            .to(
                { y: bird.y - jumpAmount, rotation: -20 },
                jumpTime - rotationDelta,
                createjs.Ease.quadOut
            ) //rotate to jump position and jump bird
            .to({ y: bird.y }, jumpTime, createjs.Ease.quadIn) //reverse jump for smooth arch
            .to(
                { y: bird.y + 200, rotation: 90 },
                380 / 1.5,
                createjs.Ease.linear
            ) //rotate back
            .call(diveBird) // change bird to diving position
            .to(
                { y: ground.y - 30 },
                (h - (bird.y + 200)) / 1.5,
                createjs.Ease.linear
            ); //drop to the bedrock
    }

    stage.update(event);
}
