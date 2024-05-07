const params = new URLSearchParams(window.location.search);

let bet = decodeURIComponent(params.get('aposta'));
let coinValue = +decodeURIComponent(params.get('coin_value'));
let diff = decodeURIComponent(params.get('velo')) || 'hard';
let xMeta = +decodeURIComponent(params.get('xmeta')) || 10;
let meta = xMeta * bet;
let baseUrl = decodeURIComponent(params.get('baseurl'));
let token = decodeURIComponent(params.get('token'));

let gravity = 0.8;
let speed = 0.8;
let pipeDis = [60, 70];
let pipeGap = [70, 80];
let target = 5;
let pipeNextDis = 50;
let pipeDisMax = 500;

switch (diff) {
    case 'easy':
        pipeGap = [140, 140];
        break;
    case 'medium':
        pipeGap = [110, 110];
        break;
    case 'hard':
        pipeGap = [90, 90];
        break;
    case 'insane':
        pipeGap = [65, 65];
        break;
}

function addMeta() {
    const metaComponent = document.createElement('p');
    metaComponent.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
        padding: 10px;
        height: auto;
        width: 100px;
        z-index: 9999;
    `;

    metaComponent.id = 'game-meta';
    document.body.appendChild(metaComponent);
    metaComponent.innerText = `META: ${meta}`;
}

addMeta();

function showReachedTheGoal() {
    const div = document.createElement('div');
    div.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        border-radius: 5px;
        font-size: 18px;
        color: #fff;
        padding: 10px;
        height: auto;
        z-index: 9999;
    `;

    div.id = 'reached-the-goal';
    document.body.appendChild(div);
    div.innerText = 'VOCÊ ALCANÇOU A META! PARABÉNS!';
}

var _0xea91 = [
    "\x61\x73\x73\x65\x72\x74",
    "\x63\x6C\x65\x61\x72",
    "\x63\x6F\x75\x6E\x74",
    "\x64\x65\x62\x75\x67",
    "\x64\x69\x72",
    "\x64\x69\x72\x78\x6D\x6C",
    "\x65\x72\x72\x6F\x72",
    "\x65\x78\x63\x65\x70\x74\x69\x6F\x6E",
    "\x67\x72\x6F\x75\x70",
    "\x67\x72\x6F\x75\x70\x43\x6F\x6C\x6C\x61\x70\x73\x65\x64",
    "\x67\x72\x6F\x75\x70\x45\x6E\x64",
    "\x69\x6E\x66\x6F",
    "\x6C\x6F\x67",
    "\x6D\x61\x72\x6B\x54\x69\x6D\x65\x6C\x69\x6E\x65",
    "\x70\x72\x6F\x66\x69\x6C\x65",
    "\x70\x72\x6F\x66\x69\x6C\x65\x45\x6E\x64",
    "\x74\x61\x62\x6C\x65",
    "\x74\x69\x6D\x65",
    "\x74\x69\x6D\x65\x45\x6E\x64",
    "\x74\x69\x6D\x65\x53\x74\x61\x6D\x70",
    "\x74\x72\x61\x63\x65",
    "\x77\x61\x72\x6E",
    "\x6C\x65\x6E\x67\x74\x68",
    "\x63\x6F\x6E\x73\x6F\x6C\x65",
    "\x68\x65\x69\x67\x68\x74",
    "\x77\x69\x64\x74\x68",
    "\x75\x73\x65\x72\x41\x67\x65\x6E\x74",
    "\x6D\x61\x74\x63\x68",
    "\x69\x4F\x53",
    "\x4F\x53\x20",
    "\x69\x6E\x64\x65\x78\x4F\x66",
    "\x41\x6E\x64\x72\x6F\x69\x64",
    "\x41\x6E\x64\x72\x6F\x69\x64\x20",
    "\x75\x6E\x6B\x6E\x6F\x77\x6E",
    "\x5F",
    "\x2E",
    "\x72\x65\x70\x6C\x61\x63\x65",
    "\x73\x75\x62\x73\x74\x72",
    "\x72\x61\x6E\x64\x6F\x6D",
    "\x66\x6C\x6F\x6F\x72",
    "\x70\x6F\x77",
    "\x73\x71\x72\x74",
    "\x73\x6F\x72\x74",
    "",
    "\x73\x70\x6C\x69\x74",
    "\x24\x31",
    "\x2C",
    "\x24\x32",
    "\x74\x65\x73\x74",
    "\x78",
    "\x79",
    "\x73\x6F\x75\x6E\x64",
    "\x70\x75\x73\x68",
    "\x70\x6C\x61\x79",
    "\x53\x6F\x75\x6E\x64",
    "\x64\x65\x66\x61\x75\x6C\x74\x56\x6F\x6C",
    "\x72\x65\x6D\x6F\x76\x65\x41\x6C\x6C\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72\x73",
    "\x63\x6F\x6D\x70\x6C\x65\x74\x65",
    "\x73\x70\x6C\x69\x63\x65",
    "\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72",
    "\x70\x61\x75\x73\x65\x64",
    "\x73\x74\x6F\x70",
    "\x76\x6F\x6C\x75\x6D\x65",
    "\x66\x75\x6E\x63\x74\x69\x6F\x6E",
    "\x67\x61\x6D\x65\x43\x61\x6E\x76\x61\x73",
    "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64",
    "\x65\x6E\x61\x62\x6C\x65",
    "\x54\x6F\x75\x63\x68",
    "\x65\x6E\x61\x62\x6C\x65\x4D\x6F\x75\x73\x65\x4F\x76\x65\x72",
    "\x6D\x6F\x75\x73\x65\x4D\x6F\x76\x65\x4F\x75\x74\x73\x69\x64\x65",
    "\x66\x72\x61\x6D\x65\x72\x61\x74\x65",
    "\x54\x69\x63\x6B\x65\x72",
    "\x74\x69\x63\x6B",
    "\x63\x61\x72\x64\x73",
    "\x70\x61\x72\x74\x69\x63\x6C\x65\x73",
    "\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64",
    "\x67\x65\x74\x52\x65\x73\x75\x6C\x74",
    "\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x50",
    "\x6C\x6F\x67\x6F",
    "\x6C\x6F\x67\x6F\x50",
    "\x62\x75\x74\x74\x6F\x6E\x53\x74\x61\x72\x74",
    "\x69\x74\x65\x6D\x47\x72\x6F\x75\x6E\x64",
    "\x67\x72\x6F\x75\x6E\x64",
    "\x6E\x61\x74\x75\x72\x61\x6C\x48\x65\x69\x67\x68\x74",
    "\x69\x6D\x61\x67\x65",
    "\x63\x6F\x70\x74\x65\x72",
    "\x73\x72\x63",
    "\x69\x74\x65\x6D\x43\x6F\x70\x74\x65\x72",
    "\x61\x6E\x69\x6D\x61\x74\x65",
    "\x69\x74\x65\x6D\x43\x6F\x69\x6E",
    "\x68\x69\x74\x41\x72\x65\x61",
    "\x64\x72\x61\x77\x52\x65\x63\x74",
    "\x23\x30\x30\x30",
    "\x62\x65\x67\x69\x6E\x46\x69\x6C\x6C",
    "\x66\x6F\x6E\x74",
    "\x35\x30\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x72\x65\x67\x75\x6C\x61\x72",
    "\x63\x6F\x6C\x6F\x72",
    "\x23\x66\x66\x66",
    "\x74\x65\x78\x74\x41\x6C\x69\x67\x6E",
    "\x63\x65\x6E\x74\x65\x72",
    "\x74\x65\x78\x74\x42\x61\x73\x65\x6C\x69\x6E\x65",
    "\x61\x6C\x70\x68\x61\x62\x65\x74\x69\x63",
    "\x74\x65\x78\x74",
    "\x72\x65\x61\x64\x79",
    "\x35\x30\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x5F\x73\x77\x61\x6E\x6B\x72\x65\x67\x75\x6C\x61\x72",
    "\x23\x30\x30\x32\x36\x31\x32",
    "\x61\x64\x64\x43\x68\x69\x6C\x64",
    "\x38\x30\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x72\x65\x67\x75\x6C\x61\x72",
    "\x38\x30\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x5F\x73\x77\x61\x6E\x6B\x72\x65\x67\x75\x6C\x61\x72",
    "\x69\x74\x65\x6D\x50\x6F\x70",
    "\x69\x74\x65\x6D\x50\x6F\x70\x50",
    "\x62\x75\x74\x74\x6F\x6E\x43\x6F\x6E\x74\x69\x6E\x75\x65",
    "\x33\x35\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x72\x65\x67\x75\x6C\x61\x72",
    "\x73\x68\x61\x72\x65",
    "\x33\x35\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x5F\x73\x77\x61\x6E\x6B\x72\x65\x67\x75\x6C\x61\x72",
    "\x72\x65\x73\x75\x6C\x74\x54\x69\x74\x6C\x65",
    "\x38\x35\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x72\x65\x67\x75\x6C\x61\x72",
    "\x38\x35\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x5F\x73\x77\x61\x6E\x6B\x72\x65\x67\x75\x6C\x61\x72",
    "\x62\x75\x74\x74\x6F\x6E\x46\x61\x63\x65\x62\x6F\x6F\x6B",
    "\x62\x75\x74\x74\x6F\x6E\x54\x77\x69\x74\x74\x65\x72",
    "\x62\x75\x74\x74\x6F\x6E\x57\x68\x61\x74\x73\x61\x70\x70",
    "\x62\x75\x74\x74\x6F\x6E\x46\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E",
    "\x62\x75\x74\x74\x6F\x6E\x53\x6F\x75\x6E\x64\x4F\x6E",
    "\x62\x75\x74\x74\x6F\x6E\x53\x6F\x75\x6E\x64\x4F\x66\x66",
    "\x76\x69\x73\x69\x62\x6C\x65",
    "\x62\x75\x74\x74\x6F\x6E\x45\x78\x69\x74",
    "\x62\x75\x74\x74\x6F\x6E\x53\x65\x74\x74\x69\x6E\x67\x73",
    "\x62\x75\x74\x74\x6F\x6E\x43\x6F\x6E\x66\x69\x72\x6D",
    "\x62\x75\x74\x74\x6F\x6E\x43\x61\x6E\x63\x65\x6C",
    "\x65\x78\x69\x74\x54\x69\x74\x6C\x65",
    "\x34\x30\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x72\x65\x67\x75\x6C\x61\x72",
    "\x6C\x69\x6E\x65\x48\x65\x69\x67\x68\x74",
    "\x65\x78\x69\x74\x4D\x65\x73\x73\x61\x67\x65",
    "\x34\x30\x70\x78\x20\x64\x69\x6D\x69\x74\x72\x69\x5F\x73\x77\x61\x6E\x6B\x72\x65\x67\x75\x6C\x61\x72",
    "\x72\x65\x64",
    "\x62\x65\x67\x69\x6E\x53\x74\x72\x6F\x6B\x65",
    "\x73\x65\x74\x53\x74\x72\x6F\x6B\x65\x53\x74\x79\x6C\x65",
    "\x67\x72\x61\x70\x68\x69\x63\x73",
    "\x69\x73\x4C\x61\x6E\x64\x73\x63\x61\x70\x65",
    "\x77",
    "\x68",
    "\x63\x57",
    "\x63\x48",
    "\x67\x61\x6D\x65",
    "\x75\x6E\x64\x65\x66\x69\x6E\x65\x64",
    "\x61\x75\x74\x6F\x43\x6C\x65\x61\x72",
    "\x72\x65\x6D\x6F\x76\x65\x41\x6C\x6C\x43\x68\x69\x6C\x64\x72\x65\x6E",
    "\x75\x70\x64\x61\x74\x65",
    "\x72\x65\x6D\x6F\x76\x65\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72",
    "\x72\x65\x67\x58",
    "\x6E\x61\x74\x75\x72\x61\x6C\x57\x69\x64\x74\x68",
    "\x72\x65\x67\x59",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x70\x69\x70\x65\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x63\x6C\x6F\x75\x64\x5F\x31\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x63\x6C\x6F\x75\x64\x5F\x32\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x63\x6C\x6F\x75\x64\x5F\x33\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x6D\x6F\x75\x6E\x74\x61\x69\x6E\x5F\x31\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x6D\x6F\x75\x6E\x74\x61\x69\x6E\x5F\x32\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x6D\x6F\x75\x6E\x74\x61\x69\x6E\x5F\x33\x2E\x70\x6E\x67",
    "\x54\x41\x50\x20\x54\x4F\x20\x42\x45\x47\x49\x4E",
    "\x45\x58\x49\x54\x20\x47\x41\x4D\x45",
    "\x41\x52\x45\x20\x59\x4F\x55\x20\x53\x55\x52\x45\x0A\x59\x4F\x55\x20\x57\x41\x4E\x54\x20\x54\x4F\x0A\x51\x55\x49\x54\x20\x54\x48\x45\x20\x47\x41\x4D\x45\x3F",
    "\x53\x48\x41\x52\x45\x20\x59\x4F\x55\x52\x20\x53\x43\x4F\x52\x45",
    "\x47\x41\x4D\x45\x20\x4F\x56\x45\x52",
    "\x5B\x4E\x55\x4D\x42\x45\x52\x5D",
    "\x48\x69\x67\x68\x73\x63\x6F\x72\x65\x20\x6F\x6E\x20\x46\x6C\x61\x70\x70\x79\x20\x43\x6F\x70\x74\x65\x72\x20\x69\x73\x20\x5B\x53\x43\x4F\x52\x45\x5D",
    "\x5B\x53\x43\x4F\x52\x45\x5D\x20\x69\x73\x20\x6D\x69\x6E\x65\x20\x6E\x65\x77\x20\x68\x69\x67\x68\x73\x63\x6F\x72\x65\x20\x6F\x6E\x20\x46\x6C\x61\x70\x70\x79\x20\x43\x6F\x70\x74\x65\x72\x20\x67\x61\x6D\x65\x21\x20\x54\x72\x79\x20\x69\x74\x20\x6E\x6F\x77\x21",
    "\x65\x64\x69\x74\x6F\x72",
    "\x66\x6F\x63\x75\x73",
    "\x62\x6C\x75\x72",
    "\x6D\x6F\x62\x69\x6C\x65",
    "\x62\x72\x6F\x77\x73\x65\x72",
    "\x6C\x6F\x63\x61\x74\x69\x6F\x6E",
    "\x70\x61\x72\x65\x6E\x74",
    "\x6F\x6E\x6B\x65\x79\x64\x6F\x77\x6E",
    "\x64\x6F\x63\x75\x6D\x65\x6E\x74",
    "\x6F\x6E\x6B\x65\x79\x75\x70",
    "\x63\x75\x72\x73\x6F\x72",
    "\x70\x6F\x69\x6E\x74\x65\x72",
    "\x63\x6C\x69\x63\x6B",
    "\x73\x6F\x75\x6E\x64\x42\x75\x74\x74\x6F\x6E",
    "\x6D\x61\x69\x6E",
    "\x66\x61\x63\x65\x62\x6F\x6F\x6B",
    "\x74\x77\x69\x74\x74\x65\x72",
    "\x77\x68\x61\x74\x73\x61\x70\x70",
    "\x73\x74\x61\x72\x74",
    "\x6B\x65\x79\x64\x6F\x77\x6E",
    "\x6B\x65\x79\x43\x6F\x64\x65",
    "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74",
    "\x6F\x6E",
    "\x3C\x64\x69\x76\x20\x69\x64\x3D\x22\x66\x6F\x63\x75\x73\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x61\x62\x73\x6F\x6C\x75\x74\x65\x3B\x20\x77\x69\x64\x74\x68\x3A\x31\x30\x30\x25\x3B\x20\x68\x65\x69\x67\x68\x74\x3A\x31\x30\x30\x25\x3B\x20\x7A\x2D\x69\x6E\x64\x65\x78\x3A\x31\x30\x30\x30\x3B\x22\x3E\x3C\x2F\x64\x69\x76",
    "\x70\x72\x65\x70\x65\x6E\x64",
    "\x23\x6D\x61\x69\x6E\x48\x6F\x6C\x64\x65\x72",
    "\x72\x65\x6D\x6F\x76\x65",
    "\x23\x66\x6F\x63\x75\x73",
    "\x73\x70\x61\x63\x65\x62\x61\x72",
    "\x73\x6F\x75\x6E\x64\x4F\x76\x65\x72",
    "\x74\x77\x65\x65\x6E\x53\x63\x6F\x72\x65",
    "\x73\x63\x6F\x72\x65",
    "\x74\x6F",
    "\x72\x65\x73\x75\x6C\x74",
    "\x61\x6C\x70\x68\x61",
    "\x6F\x76\x65\x72",
    "\x68\x69\x74\x47\x72\x6F\x75\x6E\x64",
    "\x70\x69\x70\x65",
    "\x63\x6F\x69\x6E",
    "\x6C\x65\x76\x65\x6C\x4E\x75\x6D",
    "\x63\x6F\x69\x6E\x49\x6E\x64\x65\x78",
    "\x77\x6F\x72\x6C\x64",
    "\x63\x6F\x69\x6E\x41\x70\x70\x65\x61\x72",
    "\x73\x6F\x75\x6E\x64\x43\x6F\x70\x74\x65\x72",
    "\x79\x53\x70\x65\x65\x64",
    "\x6F\x72\x69\x59",
    "\x74\x6F\x70",
    "\x6B\x69\x6C\x6C\x54\x77\x65\x65\x6E\x73\x4F\x66",
    "\x65\x61\x73\x65\x4E\x6F\x6E\x65",
    "\x6C\x6F\x6F\x70\x42\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64",
    "\x72\x6F\x74\x61\x74\x69\x6F\x6E",
    "\x73\x74\x61\x72\x74\x52\x6F\x74\x61\x74\x65",
    "\x65\x6E\x64\x52\x6F\x74\x61\x74\x65",
    "\x63\x6C\x6F\x75\x64\x44\x69\x73\x4D\x61\x78",
    "\x63\x6C\x6F\x75\x64\x4E\x65\x78\x74\x44\x69\x73",
    "\x6D\x6F\x75\x6E\x74\x61\x69\x6E\x44\x69\x73\x4D\x61\x78",
    "\x73\x70\x65\x65\x64",
    "\x70\x69\x70\x65\x44\x69\x73",
    "\x70\x69\x70\x65\x47\x61\x70",
    "\x70\x69\x70\x65\x44\x69\x73\x4D\x61\x78",
    "\x6B\x69\x6C\x6C\x41\x6C\x6C",
    "\x73\x63\x6F\x72\x65\x44\x61\x74\x61",
    "\x74\x79\x70\x65",
    "\x63\x6C\x6F\x75\x64\x44\x69\x73",
    "\x63\x6C\x6F\x75\x64\x53\x70\x65\x65\x64",
    "\x6D\x6F\x75\x6E\x74\x61\x69\x6E\x44\x69\x73",
    "\x6D\x6F\x75\x6E\x74\x61\x69\x6E\x53\x70\x65\x65\x64",
    "\x6D\x6F\x75\x6E\x74\x61\x69\x6E\x4E\x65\x78\x74\x44\x69\x73",
    "\x63\x6C\x6F\x75\x64",
    "\x61\x63\x74\x69\x76\x65",
    "\x6D\x6F\x75\x6E\x74\x61\x69\x6E",
    "\x72\x65\x6D\x6F\x76\x65\x43\x68\x69\x6C\x64",
    "\x67\x72\x61\x76\x69\x74\x79",
    "\x73\x6F\x75\x6E\x64\x43\x72\x61\x73\x68",
    "\x70\x6F\x77\x65\x72",
    "\x63\x6F\x69\x6E\x45\x6E\x61\x62\x6C\x65",
    "\x67\x6C\x6F\x62\x61\x6C\x54\x6F\x4C\x6F\x63\x61\x6C",
    "\x68\x69\x74\x54\x65\x73\x74",
    "\x70\x69\x70\x65\x53\x63\x6F\x72\x65\x45\x6E\x61\x62\x6C\x65",
    "\x70\x69\x70\x65\x53\x63\x6F\x72\x65",
    "\x73\x6F\x75\x6E\x64\x53\x63\x6F\x72\x65",
    "\x63\x6F\x69\x6E\x53\x63\x6F\x72\x65",
    "\x73\x6F\x75\x6E\x64\x43\x6F\x69\x6E",
    "\x73\x6F\x75\x6E\x64\x48\x69\x74",
    "\x70\x6F\x77\x65\x72\x44\x6F\x77\x6E\x52\x6F\x74\x61\x74\x65",
    "\x74\x61\x72\x67\x65\x74",
    "\x73\x6F\x75\x6E\x64\x53\x77\x69\x6E\x67",
    "\x70\x6F\x77\x65\x72\x55\x70\x52\x6F\x74\x61\x74\x65",
    "\x69\x74\x65\x6D\x50\x69\x70\x65",
    "\x73\x63\x61\x6C\x65\x58",
    "\x6F\x62\x6A\x65\x63\x74\x73",
    "\x63\x6C\x6F\x6E\x65",
    "\x69\x74\x65\x6D\x43\x6C\x6F\x75\x64",
    "\x69\x74\x65\x6D\x4D\x6F\x75\x6E\x74\x61\x69\x6E",
    "\x66\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E\x45\x6C\x65\x6D\x65\x6E\x74",
    "\x6D\x6F\x7A\x46\x75\x6C\x6C\x53\x63\x72\x65\x65\x6E\x45\x6C\x65\x6D\x65\x6E\x74",
    "\x77\x65\x62\x6B\x69\x74\x46\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E\x45\x6C\x65\x6D\x65\x6E\x74",
    "\x6D\x73\x46\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E\x45\x6C\x65\x6D\x65\x6E\x74",
    "\x72\x65\x71\x75\x65\x73\x74\x46\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E",
    "\x64\x6F\x63\x75\x6D\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74",
    "\x6D\x73\x52\x65\x71\x75\x65\x73\x74\x46\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E",
    "\x6D\x6F\x7A\x52\x65\x71\x75\x65\x73\x74\x46\x75\x6C\x6C\x53\x63\x72\x65\x65\x6E",
    "\x77\x65\x62\x6B\x69\x74\x52\x65\x71\x75\x65\x73\x74\x46\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E",
    "\x65\x78\x69\x74\x46\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E",
    "\x6D\x73\x45\x78\x69\x74\x46\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E",
    "\x6D\x6F\x7A\x43\x61\x6E\x63\x65\x6C\x46\x75\x6C\x6C\x53\x63\x72\x65\x65\x6E",
    "\x77\x65\x62\x6B\x69\x74\x45\x78\x69\x74\x46\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E",
    "\x65\x76\x65\x6E\x74",
    "\x68\x72\x65\x66",
    "\x2F",
    "\x6C\x61\x73\x74\x49\x6E\x64\x65\x78\x4F\x66",
    "\x73\x75\x62\x73\x74\x72\x69\x6E\x67",
    "\x5B\x53\x43\x4F\x52\x45\x5D",
    "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x74\x77\x69\x74\x74\x65\x72\x2E\x63\x6F\x6D\x2F\x69\x6E\x74\x65\x6E\x74\x2F\x74\x77\x65\x65\x74\x3F\x75\x72\x6C\x3D",
    "\x26\x74\x65\x78\x74\x3D",
    "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x73\x68\x61\x72\x65\x72\x2F\x73\x68\x61\x72\x65\x72\x2E\x70\x68\x70\x3F\x75\x3D",
    "\x73\x68\x61\x72\x65\x2E\x70\x68\x70\x3F\x64\x65\x73\x63\x3D",
    "\x26\x74\x69\x74\x6C\x65\x3D",
    "\x26\x75\x72\x6C\x3D",
    "\x26\x74\x68\x75\x6D\x62\x3D",
    "\x73\x68\x61\x72\x65\x2E\x6A\x70\x67\x26\x77\x69\x64\x74\x68\x3D\x35\x39\x30\x26\x68\x65\x69\x67\x68\x74\x3D\x33\x30\x30",
    "\x67\x6F\x6F\x67\x6C\x65",
    "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x6C\x75\x73\x2E\x67\x6F\x6F\x67\x6C\x65\x2E\x63\x6F\x6D\x2F\x73\x68\x61\x72\x65\x3F\x75\x72\x6C\x3D",
    "\x77\x68\x61\x74\x73\x61\x70\x70\x3A\x2F\x2F\x73\x65\x6E\x64\x3F\x74\x65\x78\x74\x3D",
    "\x20\x2D\x20",
    "\x6F\x70\x65\x6E",
    "\x73\x68\x6F\x77",
    "\x23\x63\x61\x6E\x76\x61\x73\x48\x6F\x6C\x64\x65\x72",
    "\x6C\x65\x66\x74",
    "\x2E\x6D\x6F\x62\x69\x6C\x65\x52\x6F\x74\x61\x74\x65",
    "\x63\x73\x73",
    "\x69\x6E\x6E\x65\x72\x57\x69\x64\x74\x68",
    "\x69\x6E\x6E\x65\x72\x48\x65\x69\x67\x68\x74",
    "\x61\x62\x73",
    "\x63\x61\x6E\x76\x61\x73",
    "\x73\x63\x72\x6F\x6C\x6C\x54\x6F\x70",
    "\x6F\x72\x69\x65\x6E\x74\x61\x74\x69\x6F\x6E\x63\x68\x61\x6E\x67\x65",
    "\x68\x69\x64\x65",
    "\x23\x72\x6F\x74\x61\x74\x65\x48\x6F\x6C\x64\x65\x72",
    "\x6F\x66\x66",
    "\x66\x61\x64\x65\x49\x6E",
    "\x66\x61\x64\x65\x4F\x75\x74",
    "\x72\x65\x73\x69\x7A\x65",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x5F\x70\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x6C\x6F\x67\x6F\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x6C\x6F\x67\x6F\x5F\x70\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x73\x74\x61\x72\x74\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x67\x72\x6F\x75\x6E\x64\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x63\x6F\x70\x74\x65\x72\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x63\x6F\x69\x6E\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x74\x77\x69\x74\x74\x65\x72\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x77\x68\x61\x74\x73\x61\x70\x70\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x63\x6F\x6E\x74\x69\x6E\x75\x65\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x70\x6F\x70\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x69\x74\x65\x6D\x5F\x70\x6F\x70\x5F\x70\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x63\x6F\x6E\x66\x69\x72\x6D\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x63\x61\x6E\x63\x65\x6C\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x66\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x73\x6F\x75\x6E\x64\x5F\x6F\x6E\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x73\x6F\x75\x6E\x64\x5F\x6F\x66\x66\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x65\x78\x69\x74\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x62\x75\x74\x74\x6F\x6E\x5F\x73\x65\x74\x74\x69\x6E\x67\x73\x2E\x70\x6E\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x73\x6F\x75\x6E\x64\x73\x2F\x73\x6F\x75\x6E\x64\x5F\x63\x6C\x69\x63\x6B\x2E\x6F\x67\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x73\x6F\x75\x6E\x64\x73\x2F\x73\x6F\x75\x6E\x64\x5F\x6F\x76\x65\x72\x2E\x6F\x67\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x73\x6F\x75\x6E\x64\x73\x2F\x73\x6F\x75\x6E\x64\x5F\x73\x77\x69\x6E\x67\x2E\x6F\x67\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x73\x6F\x75\x6E\x64\x73\x2F\x73\x6F\x75\x6E\x64\x5F\x68\x69\x74\x2E\x6F\x67\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x73\x6F\x75\x6E\x64\x73\x2F\x73\x6F\x75\x6E\x64\x5F\x73\x63\x6F\x72\x65\x2E\x6F\x67\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x73\x6F\x75\x6E\x64\x73\x2F\x73\x6F\x75\x6E\x64\x5F\x63\x72\x61\x73\x68\x2E\x6F\x67\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x73\x6F\x75\x6E\x64\x73\x2F\x73\x6F\x75\x6E\x64\x5F\x63\x6F\x70\x74\x65\x72\x2E\x6F\x67\x67",
    "\x61\x73\x73\x65\x74\x73\x2F\x73\x6F\x75\x6E\x64\x73\x2F\x73\x6F\x75\x6E\x64\x5F\x63\x6F\x69\x6E\x2E\x6F\x67\x67",
    "\x61\x6C\x74\x65\x72\x6E\x61\x74\x65\x45\x78\x74\x65\x6E\x73\x69\x6F\x6E\x73",
    "\x6D\x70\x33",
    "\x69\x6E\x73\x74\x61\x6C\x6C\x50\x6C\x75\x67\x69\x6E",
    "\x66\x69\x6C\x65\x6C\x6F\x61\x64",
    "\x70\x72\x6F\x67\x72\x65\x73\x73",
    "\x6C\x6F\x61\x64\x4D\x61\x6E\x69\x66\x65\x73\x74",
    "\x69\x74\x65\x6D",
    "\x65\x72\x72\x6F\x72\x20",
    "\x72\x6F\x75\x6E\x64",
    "\x25",
    "\x68\x74\x6D\x6C",
    "\x23\x6D\x61\x69\x6E\x4C\x6F\x61\x64\x65\x72\x20\x73\x70\x61\x6E",
    "\x23\x6D\x61\x69\x6E\x4C\x6F\x61\x64\x65\x72",
    "\x73\x74\x61\x74\x65",
    "\x63\x6F\x6E\x74\x65\x78\x74",
    "\x57\x65\x62\x41\x75\x64\x69\x6F\x50\x6C\x75\x67\x69\x6E",
    "\x73\x75\x73\x70\x65\x6E\x64\x65\x64",
    "\x72\x65\x73\x75\x6D\x65",
    "\x54\x68\x65\x72\x65\x20\x77\x61\x73\x20\x61\x6E\x20\x65\x72\x72\x6F\x72\x20\x77\x68\x69\x6C\x65\x20\x74\x72\x79\x69\x6E\x67\x20\x74\x6F\x20\x72\x65\x73\x75\x6D\x65\x20\x74\x68\x65\x20\x53\x6F\x75\x6E\x64\x4A\x53\x20\x57\x65\x62\x20\x41\x75\x64\x69\x6F\x20\x63\x6F\x6E\x74\x65\x78\x74\x2E\x2E\x2E",
    "\x70\x72\x6F\x74\x6F\x63\x6F\x6C",
    "\x66\x69\x6C\x65",
    "\x54\x6F\x20\x69\x6E\x73\x74\x61\x6C\x6C\x20\x74\x68\x65\x20\x67\x61\x6D\x65\x20\x6A\x75\x73\x74\x20\x75\x70\x6C\x6F\x61\x64\x20\x66\x6F\x6C\x64\x65\x72\x20\x27\x67\x61\x6D\x65\x27\x20\x74\x6F\x20\x79\x6F\x75\x72\x20\x73\x65\x72\x76\x65\x72\x2E\x20\x54\x68\x65\x20\x67\x61\x6D\x65\x20\x77\x6F\x6E\x27\x74\x20\x72\x75\x6E\x20\x6C\x6F\x63\x61\x6C\x6C\x79\x20\x77\x69\x74\x68\x20\x73\x6F\x6D\x65\x20\x62\x72\x6F\x77\x73\x65\x72\x20\x6C\x69\x6B\x65\x20\x43\x68\x72\x6F\x6D\x65\x20\x64\x75\x65\x20\x74\x6F\x20\x73\x6F\x6D\x65\x20\x73\x65\x63\x75\x72\x69\x74\x79\x20\x6D\x6F\x64\x65\x2E",
    "\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65",
    "\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74",
    "\x67\x65\x74\x43\x6F\x6E\x74\x65\x78\x74",
    "\x23\x6E\x6F\x74\x53\x75\x70\x70\x6F\x72\x74\x48\x6F\x6C\x64\x65\x72"];
(function () {
    var _0xbbe4x1;
    var _0xbbe4x2 = function () {
    };
    var _0xbbe4x3 = [
        _0xea91[0],
        _0xea91[1],
        _0xea91[2],
        _0xea91[3],
        _0xea91[4],
        _0xea91[5],
        _0xea91[6],
        _0xea91[7],
        _0xea91[8],
        _0xea91[9],
        _0xea91[10],
        _0xea91[11],
        _0xea91[12],
        _0xea91[13],
        _0xea91[14],
        _0xea91[15],
        _0xea91[16],
        _0xea91[17],
        _0xea91[18],
        _0xea91[19],
        _0xea91[20],
        _0xea91[21]
    ];
    var _0xbbe4x4 = _0xbbe4x3[_0xea91[22]];
    var _0xbbe4x5 = (window[_0xea91[23]] = window[_0xea91[23]] || {});
    while (_0xbbe4x4--) {
        _0xbbe4x1 = _0xbbe4x3[_0xbbe4x4];
        if (!_0xbbe4x5[_0xbbe4x1]) {
            _0xbbe4x5[_0xbbe4x1] = _0xbbe4x2
        }
    }
}());

function checkContentHeight(_0xbbe4x7) {
    var stageHeight = $(window)[_0xea91[24]]();
    var _0xbbe4x9 = (stageHeight / 2) - (_0xbbe4x7[_0xea91[24]]() / 2);
    return _0xbbe4x9
}

function checkContentWidth(_0xbbe4x7) {
    var stageWidth = $(window)[_0xea91[25]]();
    var _0xbbe4xc = (stageWidth / 2) - (_0xbbe4x7[_0xea91[25]]() / 2);
    return _0xbbe4xc
}

function getDeviceVer() {
    var _0xbbe4xe = navigator[_0xea91[26]];
    var _0xbbe4xf;
    if (_0xbbe4xe[_0xea91[27]](/(iPad|iPhone|iPod touch)/)) {
        userOS = _0xea91[28];
        _0xbbe4xf = _0xbbe4xe[_0xea91[30]](_0xea91[29])
    } else {
        if (_0xbbe4xe[_0xea91[27]](/Android/)) {
            userOS = _0xea91[31];
            _0xbbe4xf = _0xbbe4xe[_0xea91[30]](_0xea91[32])
        } else {
            userOS = _0xea91[33]
        }
    }
    ;
    if (userOS === _0xea91[28] && _0xbbe4xf > -1) {
        userOSver = _0xbbe4xe[_0xea91[37]](_0xbbe4xf + 3, 3)[_0xea91[36]](_0xea91[34], _0xea91[35])
    } else {
        if (userOS === _0xea91[31] && _0xbbe4xf > -1) {
            userOSver = _0xbbe4xe[_0xea91[37]](_0xbbe4xf + 8, 3)
        } else {
            userOSver = _0xea91[33]
        }
    }
    ;
    return Number(userOSver)
}

function shuffle(_0xbbe4x11) {
    var _0xbbe4x12 = _0xbbe4x11[_0xea91[22]], _0xbbe4x13, _0xbbe4x14;
    while (0 !== _0xbbe4x12) {
        _0xbbe4x14 = Math[_0xea91[39]](Math[_0xea91[38]]() * _0xbbe4x12);
        _0xbbe4x12 -= 1;
        _0xbbe4x13 = _0xbbe4x11[_0xbbe4x12];
        _0xbbe4x11[_0xbbe4x12] = _0xbbe4x11[_0xbbe4x14];
        _0xbbe4x11[_0xbbe4x14] = _0xbbe4x13
    }
    ;
    return _0xbbe4x11
}

function randomBoolean() {
    return Math[_0xea91[38]]() < 0.5
}

function getDistance(_0xbbe4x17, _0xbbe4x18, _0xbbe4x19, _0xbbe4x1a) {
    var _0xbbe4x1b = Math[_0xea91[41]](Math[_0xea91[40]](_0xbbe4x17 - _0xbbe4x19, 2) + Math[_0xea91[40]](_0xbbe4x18 - _0xbbe4x1a, 2));
    return _0xbbe4x1b
}

function sortOnObject(_0xbbe4x11, _0xbbe4x1d, _0xbbe4x1e) {
    if (_0xbbe4x1e) {
        _0xbbe4x11[_0xea91[42]](function (_0xbbe4x1f, _0xbbe4x20) {
            var _0xbbe4x21 = _0xbbe4x1f[_0xbbe4x1d], _0xbbe4x22 = _0xbbe4x20[_0xbbe4x1d];
            if (_0xbbe4x21 == _0xbbe4x22) {
                return 0
            }
            ;
            return _0xbbe4x21 < _0xbbe4x22 ? 1 : -1
        })
    } else {
        _0xbbe4x11[_0xea91[42]](function (_0xbbe4x1f, _0xbbe4x20) {
            var _0xbbe4x21 = _0xbbe4x1f[_0xbbe4x1d], _0xbbe4x22 = _0xbbe4x20[_0xbbe4x1d];
            if (_0xbbe4x21 == _0xbbe4x22) {
                return 0
            }
            ;
            return _0xbbe4x21 > _0xbbe4x22 ? 1 : -1
        })
    }
    ;
    return _0xbbe4x11
}

function randomIntFromInterval(_0xbbe4x24, _0xbbe4x25) {
    return Math[_0xea91[39]](Math[_0xea91[38]]() * (_0xbbe4x25 - _0xbbe4x24 + 1) + _0xbbe4x24)
}

function addCommas(_0xbbe4x27) {
    _0xbbe4x27 += _0xea91[43];
    x = _0xbbe4x27[_0xea91[44]](_0xea91[35]);
    x1 = x[0];
    x2 = x[_0xea91[22]] > 1 ? _0xea91[35] + x[1] : _0xea91[43];
    var _0xbbe4x28 = /(\d+)(\d{3})/;
    while (_0xbbe4x28[_0xea91[48]](x1)) {
        x1 = x1[_0xea91[36]](_0xbbe4x28, _0xea91[45] + _0xea91[46] + _0xea91[47])
    }
    ;
    return x1 + x2
}

function swapArray(_0xbbe4x2a, _0xbbe4x2b, _0xbbe4x2c) {
    var _0xbbe4x2d = _0xbbe4x2a[_0xbbe4x2b];
    _0xbbe4x2a[_0xbbe4x2b] = _0xbbe4x2a[_0xbbe4x2c];
    _0xbbe4x2a[_0xbbe4x2c] = _0xbbe4x2d
}

function getCenterPosition(_0xbbe4x2f, _0xbbe4x30, _0xbbe4x31, _0xbbe4x32) {
    var _0xbbe4x33 = {x: 0, y: 0};
    _0xbbe4x33[_0xea91[49]] = (_0xbbe4x2f + _0xbbe4x31) / 2;
    _0xbbe4x33[_0xea91[50]] = (_0xbbe4x30 + _0xbbe4x32) / 2;
    return _0xbbe4x33
}

var enableDesktopSound = true;
var enableMobileSound = true;
var soundOn;
var soundMute = false;
var musicMute = false;
$[_0xea91[51]] = {};
var soundID = 0;
var soundPushArr = [];
var soundLoopPushArr = [];
var musicPushArr = [];

function playSound(_0xbbe4x3e, _0xbbe4x3f) {
    if (soundOn) {
        var _0xbbe4x40 = soundID;
        soundPushArr[_0xea91[52]](_0xbbe4x40);
        soundID++;
        var _0xbbe4x41 = _0xbbe4x3f == undefined ? 1 : _0xbbe4x3f;
        $[_0xea91[51]][_0xbbe4x40] = createjs[_0xea91[54]][_0xea91[53]](_0xbbe4x3e);
        $[_0xea91[51]][_0xbbe4x40][_0xea91[55]] = _0xbbe4x41;
        setSoundVolume(_0xbbe4x40);
        $[_0xea91[51]][_0xbbe4x40][_0xea91[56]]();
        $[_0xea91[51]][_0xbbe4x40][_0xea91[59]](_0xea91[57], function () {
            var _0xbbe4x42 = soundPushArr[_0xea91[30]](_0xbbe4x40);
            if (_0xbbe4x42 != -1) {
                soundPushArr[_0xea91[58]](_0xbbe4x42, 1)
            }
        })
    }
}

function playSoundLoop(_0xbbe4x3e) {
    if (soundOn) {
        if ($[_0xea91[51]][_0xbbe4x3e] == null) {
            soundLoopPushArr[_0xea91[52]](_0xbbe4x3e);
            $[_0xea91[51]][_0xbbe4x3e] = createjs[_0xea91[54]][_0xea91[53]](_0xbbe4x3e);
            $[_0xea91[51]][_0xbbe4x3e][_0xea91[55]] = 1;
            setSoundLoopVolume(_0xbbe4x3e);
            $[_0xea91[51]][_0xbbe4x3e][_0xea91[56]]();
            $[_0xea91[51]][_0xbbe4x3e][_0xea91[59]](_0xea91[57], function () {
                $[_0xea91[51]][_0xbbe4x3e][_0xea91[53]]()
            })
        }
    }
}

function toggleSoundLoop(_0xbbe4x3e, _0xbbe4x45) {
    if (soundOn) {
        if ($[_0xea91[51]][_0xbbe4x3e] != null) {
            if (_0xbbe4x45) {
                $[_0xea91[51]][_0xbbe4x3e][_0xea91[53]]()
            } else {
                $[_0xea91[51]][_0xbbe4x3e][_0xea91[60]] = true
            }
        }
    }
}

function stopSoundLoop(_0xbbe4x3e) {
    if (soundOn) {
        if ($[_0xea91[51]][_0xbbe4x3e] != null) {
            $[_0xea91[51]][_0xbbe4x3e][_0xea91[61]]();
            $[_0xea91[51]][_0xbbe4x3e] = null;
            var _0xbbe4x47 = soundLoopPushArr[_0xea91[30]](_0xbbe4x3e);
            if (_0xbbe4x47 != -1) {
                soundLoopPushArr[_0xea91[58]](_0xbbe4x47, 1)
            }
        }
    }
}

function playMusicLoop(_0xbbe4x3e) {
    if (soundOn) {
        if ($[_0xea91[51]][_0xbbe4x3e] == null) {
            musicPushArr[_0xea91[52]](_0xbbe4x3e);
            $[_0xea91[51]][_0xbbe4x3e] = createjs[_0xea91[54]][_0xea91[53]](_0xbbe4x3e);
            $[_0xea91[51]][_0xbbe4x3e][_0xea91[55]] = 1;
            setMusicVolume(_0xbbe4x3e);
            $[_0xea91[51]][_0xbbe4x3e][_0xea91[56]]();
            $[_0xea91[51]][_0xbbe4x3e][_0xea91[59]](_0xea91[57], function () {
                $[_0xea91[51]][_0xbbe4x3e][_0xea91[53]]()
            })
        }
    }
}

function toggleMusicLoop(_0xbbe4x3e, _0xbbe4x45) {
    if (soundOn) {
        if ($[_0xea91[51]][_0xbbe4x3e] != null) {
            if (_0xbbe4x45) {
                $[_0xea91[51]][_0xbbe4x3e][_0xea91[53]]()
            } else {
                $[_0xea91[51]][_0xbbe4x3e][_0xea91[60]] = true
            }
        }
    }
}

function stopMusicLoop(_0xbbe4x3e) {
    if (soundOn) {
        if ($[_0xea91[51]][_0xbbe4x3e] != null) {
            $[_0xea91[51]][_0xbbe4x3e][_0xea91[61]]();
            $[_0xea91[51]][_0xbbe4x3e] = null;
            var _0xbbe4x47 = musicPushArr[_0xea91[30]](_0xbbe4x3e);
            if (_0xbbe4x47 != -1) {
                musicPushArr[_0xea91[58]](_0xbbe4x47, 1)
            }
        }
    }
}

function stopSound() {
    createjs[_0xea91[54]][_0xea91[61]]()
}

function toggleSoundInMute(_0xbbe4x45) {
    if (soundOn) {
        soundMute = _0xbbe4x45;
        for (var _0xbbe4x4d = 0; _0xbbe4x4d < soundPushArr[_0xea91[22]]; _0xbbe4x4d++) {
            setSoundVolume(soundPushArr[_0xbbe4x4d])
        }
        ;
        for (var _0xbbe4x4d = 0; _0xbbe4x4d < soundLoopPushArr[_0xea91[22]]; _0xbbe4x4d++) {
            setSoundLoopVolume(soundLoopPushArr[_0xbbe4x4d])
        }
        ;setAudioVolume()
    }
}

function toggleMusicInMute(_0xbbe4x45) {
    if (soundOn) {
        musicMute = _0xbbe4x45;
        for (var _0xbbe4x4d = 0; _0xbbe4x4d < musicPushArr[_0xea91[22]]; _0xbbe4x4d++) {
            setMusicVolume(musicPushArr[_0xbbe4x4d])
        }
    }
}

function setSoundVolume(_0xbbe4x50, _0xbbe4x3f) {
    if (soundOn) {
        var _0xbbe4x51 = soundPushArr[_0xea91[30]](_0xbbe4x50);
        if (_0xbbe4x51 != -1) {
            var _0xbbe4x41 = _0xbbe4x3f == undefined ? $[_0xea91[51]][soundPushArr[_0xbbe4x51]][_0xea91[55]] : _0xbbe4x3f;
            var _0xbbe4x52 = soundMute == false ? _0xbbe4x41 : 0;
            $[_0xea91[51]][soundPushArr[_0xbbe4x51]][_0xea91[62]] = _0xbbe4x52;
            $[_0xea91[51]][soundPushArr[_0xbbe4x51]][_0xea91[55]] = _0xbbe4x41
        }
    }
}

function setSoundLoopVolume(_0xbbe4x54, _0xbbe4x3f) {
    if (soundOn) {
        var _0xbbe4x47 = soundLoopPushArr[_0xea91[30]](_0xbbe4x54);
        if (_0xbbe4x47 != -1) {
            var _0xbbe4x41 = _0xbbe4x3f == undefined ? $[_0xea91[51]][soundLoopPushArr[_0xbbe4x47]][_0xea91[55]] : _0xbbe4x3f;
            var _0xbbe4x52 = soundMute == false ? _0xbbe4x41 : 0;
            $[_0xea91[51]][soundLoopPushArr[_0xbbe4x47]][_0xea91[62]] = _0xbbe4x52;
            $[_0xea91[51]][soundLoopPushArr[_0xbbe4x47]][_0xea91[55]] = _0xbbe4x41
        }
    }
}

function setMusicVolume(_0xbbe4x54, _0xbbe4x3f) {
    if (soundOn) {
        var _0xbbe4x56 = musicPushArr[_0xea91[30]](_0xbbe4x54);
        if (_0xbbe4x56 != -1) {
            var _0xbbe4x41 = _0xbbe4x3f == undefined ? $[_0xea91[51]][musicPushArr[_0xbbe4x56]][_0xea91[55]] : _0xbbe4x3f;
            var _0xbbe4x52 = musicMute == false ? _0xbbe4x41 : 0;
            $[_0xea91[51]][musicPushArr[_0xbbe4x56]][_0xea91[62]] = _0xbbe4x52;
            $[_0xea91[51]][musicPushArr[_0xbbe4x56]][_0xea91[55]] = _0xbbe4x41
        }
    }
}

var audioFile = null;

function playAudio(_0xbbe4x59, _0xbbe4x5a) {
    if (soundOn) {
        if (audioFile == null) {
            audioFile = createjs[_0xea91[54]][_0xea91[53]](_0xbbe4x59);
            setAudioVolume();
            audioFile[_0xea91[56]]();
            audioFile[_0xea91[59]](_0xea91[57], function (_0xbbe4x5b) {
                audioFile = null;
                if (typeof _0xbbe4x5a == _0xea91[63]) {
                    _0xbbe4x5a()
                }
            })
        }
    }
}

function stopAudio() {
    if (soundOn) {
        if (audioFile != null) {
            audioFile[_0xea91[61]]();
            audioFile = null
        }
    }
}

function setAudioVolume() {
    if (soundOn) {
        if (audioFile != null) {
            var _0xbbe4x52 = soundMute == false ? 1 : 0;
            audioFile[_0xea91[62]] = _0xbbe4x52
        }
    }
}

var stage;
var canvasW = 0;
var canvasH = 0;

function initGameCanvas(_0xbbe4x62, _0xbbe4x63) {
    var _0xbbe4x64 = document[_0xea91[65]](_0xea91[64]);
    _0xbbe4x64[_0xea91[25]] = _0xbbe4x62;
    _0xbbe4x64[_0xea91[24]] = _0xbbe4x63;
    canvasW = _0xbbe4x62;
    canvasH = _0xbbe4x63;
    stage = new createjs.Stage(_0xea91[64]);
    createjs[_0xea91[67]][_0xea91[66]](stage);
    stage[_0xea91[68]](20);
    stage[_0xea91[69]] = true;
    createjs[_0xea91[71]][_0xea91[70]] = 60;
    createjs[_0xea91[71]][_0xea91[59]](_0xea91[72], tick)
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, instructionContainer, resultContainer, moveContainer,
    confirmContainer;
var guideline, bg, logo, buttonOk, result, shadowResult, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp,
    buttonFullscreen, buttonSoundOn, buttonSoundOff;
$[_0xea91[73]] = {};
$[_0xea91[74]] = {};

function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    instructionContainer = new createjs.Container();
    scoreContainer = new createjs.Container();
    groundContainer = new createjs.Container();
    pipeContainer = new createjs.Container();
    coinContainer = new createjs.Container();
    backgroundContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    confirmContainer = new createjs.Container();
    bg = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[75]));
    bgP = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[77]));
    logo = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[78]));
    logoP = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[79]));
    buttonStart = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[80]));
    centerReg(buttonStart);
    itemGround = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[81]));
    centerReg(itemGround);
    gameData[_0xea91[82]] = (itemGround[_0xea91[84]][_0xea91[83]] / 2) + (worldSettings[_0xea91[85]][_0xea91[24]] / 2);
    var _0xbbe4x7b = worldSettings[_0xea91[85]][_0xea91[25]];
    var _0xbbe4x7c = worldSettings[_0xea91[85]][_0xea91[24]];
    var _0xbbe4x7d = {
        "\x72\x65\x67\x58": _0xbbe4x7b / 2,
        "\x72\x65\x67\x59": _0xbbe4x7c / 2,
        "\x68\x65\x69\x67\x68\x74": _0xbbe4x7c,
        "\x63\x6F\x75\x6E\x74": 2,
        "\x77\x69\x64\x74\x68": _0xbbe4x7b
    };
    var _0xbbe4x7e = {animate: {frames: [0, 1], speed: 0.8}};
    copterData = new createjs.SpriteSheet({
        "\x69\x6D\x61\x67\x65\x73": [loader[_0xea91[76]](_0xea91[87])[_0xea91[86]]],
        "\x66\x72\x61\x6D\x65\x73": _0xbbe4x7d,
        "\x61\x6E\x69\x6D\x61\x74\x69\x6F\x6E\x73": _0xbbe4x7e
    });
    itemCopter = new createjs.Sprite(copterData, _0xea91[88]);
    itemCopter[_0xea91[70]] = 20;
    var _0xbbe4x7b = 47;
    var _0xbbe4x7c = 47;
    var _0xbbe4x7d = {
        "\x72\x65\x67\x58": _0xbbe4x7b / 2,
        "\x72\x65\x67\x59": _0xbbe4x7c / 2,
        "\x68\x65\x69\x67\x68\x74": _0xbbe4x7c,
        "\x63\x6F\x75\x6E\x74": 4,
        "\x77\x69\x64\x74\x68": _0xbbe4x7b
    };
    var _0xbbe4x7e = {animate: {frames: [0, 1, 2, 3, 2, 1], speed: 0.8}};
    coinData = new createjs.SpriteSheet({
        "\x69\x6D\x61\x67\x65\x73": [loader[_0xea91[76]](_0xea91[89])[_0xea91[86]]],
        "\x66\x72\x61\x6D\x65\x73": _0xbbe4x7d,
        "\x61\x6E\x69\x6D\x61\x74\x69\x6F\x6E\x73": _0xbbe4x7e
    });
    itemCoin = new createjs.Sprite(coinData, _0xea91[88]);
    itemCoin[_0xea91[70]] = 20;
    stageClick = new createjs.Shape();
    stageClick[_0xea91[90]] = new createjs.Shape(new createjs.Graphics()[_0xea91[93]](_0xea91[92])[_0xea91[91]](0, 0, canvasW, canvasH));
    gameBeginTxt = new createjs.Text();
    gameBeginTxt[_0xea91[94]] = _0xea91[95];
    gameBeginTxt[_0xea91[96]] = _0xea91[97];
    gameBeginTxt[_0xea91[98]] = _0xea91[99];
    gameBeginTxt[_0xea91[100]] = _0xea91[101];
    gameBeginTxt[_0xea91[102]] = textDisplay[_0xea91[103]];
    gameBeginShadowTxt = new createjs.Text();
    gameBeginShadowTxt[_0xea91[94]] = _0xea91[104];
    gameBeginShadowTxt[_0xea91[96]] = _0xea91[105];
    gameBeginShadowTxt[_0xea91[98]] = _0xea91[99];
    gameBeginShadowTxt[_0xea91[100]] = _0xea91[101];
    gameBeginShadowTxt[_0xea91[102]] = textDisplay[_0xea91[103]];
    gameBeginShadowTxt[_0xea91[49]] += 2;
    instructionContainer[_0xea91[106]](gameBeginShadowTxt, gameBeginTxt);
    gameScoreTxt = new createjs.Text();
    gameScoreTxt[_0xea91[94]] = _0xea91[107];
    gameScoreTxt[_0xea91[96]] = _0xea91[97];
    gameScoreTxt[_0xea91[98]] = _0xea91[99];
    gameScoreTxt[_0xea91[100]] = _0xea91[101];
    gameScoreShadowTxt = new createjs.Text();
    gameScoreShadowTxt[_0xea91[94]] = _0xea91[108];
    gameScoreShadowTxt[_0xea91[96]] = _0xea91[105];
    gameScoreShadowTxt[_0xea91[98]] = _0xea91[99];
    gameScoreShadowTxt[_0xea91[100]] = _0xea91[101];
    gameScoreShadowTxt[_0xea91[49]] += 2;
    scoreContainer[_0xea91[106]](gameScoreShadowTxt, gameScoreTxt);
    itemResult = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[109]));
    itemResultP = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[110]));
    buttonContinue = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[111]));
    centerReg(buttonContinue);
    resultShareTxt = new createjs.Text();
    resultShareTxt[_0xea91[94]] = _0xea91[112];
    resultShareTxt[_0xea91[96]] = _0xea91[97];
    resultShareTxt[_0xea91[98]] = _0xea91[99];
    resultShareTxt[_0xea91[100]] = _0xea91[101];
    resultShareTxt[_0xea91[102]] = textDisplay[_0xea91[113]];
    resultShareShadowTxt = new createjs.Text();
    resultShareShadowTxt[_0xea91[94]] = _0xea91[114];
    resultShareShadowTxt[_0xea91[96]] = _0xea91[105];
    resultShareShadowTxt[_0xea91[98]] = _0xea91[99];
    resultShareShadowTxt[_0xea91[100]] = _0xea91[101];
    resultShareShadowTxt[_0xea91[102]] = textDisplay[_0xea91[113]];
    resultTitleTxt = new createjs.Text();
    resultTitleTxt[_0xea91[94]] = _0xea91[95];
    resultTitleTxt[_0xea91[96]] = _0xea91[97];
    resultTitleTxt[_0xea91[98]] = _0xea91[99];
    resultTitleTxt[_0xea91[100]] = _0xea91[101];
    resultTitleTxt[_0xea91[102]] = textDisplay[_0xea91[115]];
    resultTitleShadowTxt = new createjs.Text();
    resultTitleShadowTxt[_0xea91[94]] = _0xea91[104];
    resultTitleShadowTxt[_0xea91[96]] = _0xea91[105];
    resultTitleShadowTxt[_0xea91[98]] = _0xea91[99];
    resultTitleShadowTxt[_0xea91[100]] = _0xea91[101];
    resultTitleShadowTxt[_0xea91[102]] = textDisplay[_0xea91[115]];
    resultDescTxt = new createjs.Text();
    resultDescTxt[_0xea91[94]] = _0xea91[116];
    resultDescTxt[_0xea91[96]] = _0xea91[97];
    resultDescTxt[_0xea91[98]] = _0xea91[99];
    resultDescTxt[_0xea91[100]] = _0xea91[101];
    resultDescTxt[_0xea91[102]] = _0xea91[43];
    resultDescShadowTxt = new createjs.Text();
    resultDescShadowTxt[_0xea91[94]] = _0xea91[117];
    resultDescShadowTxt[_0xea91[96]] = _0xea91[105];
    resultDescShadowTxt[_0xea91[98]] = _0xea91[99];
    resultDescShadowTxt[_0xea91[100]] = _0xea91[101];
    resultDescShadowTxt[_0xea91[102]] = _0xea91[43];
    buttonFacebook = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[118]));
    buttonTwitter = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[119]));
    buttonWhatsapp = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[120]));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonWhatsapp);
    createHitarea(buttonWhatsapp);
    buttonFullscreen = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[121]));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[122]));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[123]));
    centerReg(buttonSoundOff);
    buttonSoundOn[_0xea91[124]] = false;
    buttonExit = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[125]));
    centerReg(buttonExit);
    buttonSettings = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[126]));
    centerReg(buttonSettings);
    createHitarea(buttonFullscreen);
    createHitarea(buttonSoundOn);
    createHitarea(buttonSoundOff);
    createHitarea(buttonExit);
    createHitarea(buttonSettings);
    optionsContainer = new createjs.Container();
    optionsContainer[_0xea91[106]](buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
    optionsContainer[_0xea91[124]] = false;
    itemExit = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[109]));
    itemExitP = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[110]));
    buttonConfirm = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[127]));
    centerReg(buttonConfirm);
    buttonCancel = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[128]));
    centerReg(buttonCancel);
    popTitleTxt = new createjs.Text();
    popTitleTxt[_0xea91[94]] = _0xea91[95];
    popTitleTxt[_0xea91[96]] = _0xea91[97];
    popTitleTxt[_0xea91[98]] = _0xea91[99];
    popTitleTxt[_0xea91[100]] = _0xea91[101];
    popTitleTxt[_0xea91[102]] = textDisplay[_0xea91[129]];
    popTitleShadowTxt = new createjs.Text();
    popTitleShadowTxt[_0xea91[94]] = _0xea91[104];
    popTitleShadowTxt[_0xea91[96]] = _0xea91[105];
    popTitleShadowTxt[_0xea91[98]] = _0xea91[99];
    popTitleShadowTxt[_0xea91[100]] = _0xea91[101];
    popTitleShadowTxt[_0xea91[102]] = textDisplay[_0xea91[129]];
    popDescTxt = new createjs.Text();
    popDescTxt[_0xea91[94]] = _0xea91[130];
    popDescTxt[_0xea91[131]] = 45;
    popDescTxt[_0xea91[96]] = _0xea91[97];
    popDescTxt[_0xea91[98]] = _0xea91[99];
    popDescTxt[_0xea91[100]] = _0xea91[101];
    popDescTxt[_0xea91[102]] = textDisplay[_0xea91[132]];
    popDescShadowTxt = new createjs.Text();
    popDescShadowTxt[_0xea91[94]] = _0xea91[133];
    popDescShadowTxt[_0xea91[131]] = 45;
    popDescShadowTxt[_0xea91[96]] = _0xea91[105];
    popDescShadowTxt[_0xea91[98]] = _0xea91[99];
    popDescShadowTxt[_0xea91[100]] = _0xea91[101];
    popDescShadowTxt[_0xea91[102]] = textDisplay[_0xea91[132]];
    confirmContainer[_0xea91[106]](itemExit, itemExitP, popTitleShadowTxt, popTitleTxt, popDescShadowTxt, popDescTxt, buttonConfirm, buttonCancel);
    confirmContainer[_0xea91[124]] = false;
    if (guide) {
        guideline = new createjs.Shape();
        guideline[_0xea91[137]][_0xea91[136]](2)[_0xea91[135]](_0xea91[134])[_0xea91[91]]((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH)
    }
    ;mainContainer[_0xea91[106]](logo, logoP, buttonStart);
    groundContainer[_0xea91[106]](backgroundContainer, pipeContainer, coinContainer, itemGround, itemCopter);
    gameContainer[_0xea91[106]](stageClick, instructionContainer, scoreContainer);
    resultContainer[_0xea91[106]](itemResult, itemResultP, buttonContinue, resultTitleShadowTxt, resultTitleTxt, resultDescShadowTxt, resultDescTxt);
    if (shareEnable) {
        resultContainer[_0xea91[106]](resultShareShadowTxt, resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp)
    }
    ;canvasContainer[_0xea91[106]](bg, bgP, groundContainer, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
    stage[_0xea91[106]](canvasContainer);

    changeViewport(viewport[_0xea91[138]]);
    resizeGameFunc()
}

function changeViewport(_0xbbe4x80) {
    if (_0xbbe4x80) {
        stageW = landscapeSize[_0xea91[139]];
        stageH = landscapeSize[_0xea91[140]];
        contentW = landscapeSize[_0xea91[141]];
        contentH = landscapeSize[_0xea91[142]]
    } else {
        stageW = portraitSize[_0xea91[139]];
        stageH = portraitSize[_0xea91[140]];
        contentW = portraitSize[_0xea91[141]];
        contentH = portraitSize[_0xea91[142]]
    }
    ;gameCanvas[_0xea91[25]] = stageW;
    gameCanvas[_0xea91[24]] = stageH;
    canvasW = stageW;
    canvasH = stageH;
    changeCanvasViewport()
}

function changeCanvasViewport() {
    if (canvasContainer != undefined) {
        groundContainer[_0xea91[49]] = canvasW / 2;
        groundContainer[_0xea91[50]] = canvasH / 100 * 110;
        instructionContainer[_0xea91[49]] = canvasW / 2;
        instructionContainer[_0xea91[50]] = canvasH / 100 * 25;
        scoreContainer[_0xea91[49]] = canvasW / 2;
        scoreContainer[_0xea91[50]] = canvasH / 100 * 25;
        stageClick[_0xea91[90]] = new createjs.Shape(new createjs.Graphics()[_0xea91[93]](_0xea91[92])[_0xea91[91]](0, 0, canvasW, canvasH));
        if (viewport[_0xea91[138]]) {
            bg[_0xea91[124]] = true;
            bgP[_0xea91[124]] = false;
            logo[_0xea91[124]] = true;
            logoP[_0xea91[124]] = false;
            buttonStart[_0xea91[49]] = canvasW / 2;
            buttonStart[_0xea91[50]] = canvasH / 100 * 73;
            itemResult[_0xea91[124]] = true;
            itemResultP[_0xea91[124]] = false;
            buttonFacebook[_0xea91[49]] = canvasW / 100 * 43;
            buttonFacebook[_0xea91[50]] = canvasH / 100 * 62;
            buttonTwitter[_0xea91[49]] = canvasW / 2;
            buttonTwitter[_0xea91[50]] = canvasH / 100 * 62;
            buttonWhatsapp[_0xea91[49]] = canvasW / 100 * 57;
            buttonWhatsapp[_0xea91[50]] = canvasH / 100 * 62;
            buttonContinue[_0xea91[49]] = canvasW / 2;
            buttonContinue[_0xea91[50]] = canvasH / 100 * 72;
            resultShareTxt[_0xea91[49]] = canvasW / 2;
            resultShareTxt[_0xea91[50]] = canvasH / 100 * 56;
            resultShareShadowTxt[_0xea91[49]] = resultShareTxt[_0xea91[49]] + 2;
            resultShareShadowTxt[_0xea91[50]] = resultShareTxt[_0xea91[50]];
            resultTitleTxt[_0xea91[49]] = canvasW / 2;
            resultTitleTxt[_0xea91[50]] = canvasH / 100 * 34;
            resultTitleShadowTxt[_0xea91[49]] = resultTitleTxt[_0xea91[49]] + 2;
            resultTitleShadowTxt[_0xea91[50]] = resultTitleTxt[_0xea91[50]];
            resultDescTxt[_0xea91[49]] = canvasW / 2;
            resultDescTxt[_0xea91[50]] = canvasH / 100 * 49;
            resultDescShadowTxt[_0xea91[49]] = resultDescTxt[_0xea91[49]] + 2;
            resultDescShadowTxt[_0xea91[50]] = resultDescTxt[_0xea91[50]];
            itemExit[_0xea91[124]] = true;
            itemExitP[_0xea91[124]] = false;
            buttonConfirm[_0xea91[49]] = (canvasW / 2) - 83;
            buttonConfirm[_0xea91[50]] = (canvasH / 100 * 70);
            buttonCancel[_0xea91[49]] = (canvasW / 2) + 83;
            buttonCancel[_0xea91[50]] = (canvasH / 100 * 70);
            popTitleTxt[_0xea91[49]] = canvasW / 2;
            popTitleTxt[_0xea91[50]] = canvasH / 100 * 34;
            popTitleShadowTxt[_0xea91[49]] = popTitleTxt[_0xea91[49]] + 2;
            popTitleShadowTxt[_0xea91[50]] = popTitleTxt[_0xea91[50]];
            popDescTxt[_0xea91[49]] = canvasW / 2;
            popDescTxt[_0xea91[50]] = canvasH / 100 * 48;
            popDescShadowTxt[_0xea91[49]] = popDescTxt[_0xea91[49]] + 2;
            popDescShadowTxt[_0xea91[50]] = popDescTxt[_0xea91[50]]
        } else {
            bg[_0xea91[124]] = false;
            bgP[_0xea91[124]] = true;
            logo[_0xea91[124]] = false;
            logoP[_0xea91[124]] = true;
            buttonStart[_0xea91[49]] = canvasW / 2;
            buttonStart[_0xea91[50]] = canvasH / 100 * 73;
            itemResult[_0xea91[124]] = false;
            itemResultP[_0xea91[124]] = true;
            buttonFacebook[_0xea91[49]] = canvasW / 100 * 40;
            buttonFacebook[_0xea91[50]] = canvasH / 100 * 60;
            buttonTwitter[_0xea91[49]] = canvasW / 2;
            buttonTwitter[_0xea91[50]] = canvasH / 100 * 60;
            buttonWhatsapp[_0xea91[49]] = canvasW / 100 * 60;
            buttonWhatsapp[_0xea91[50]] = canvasH / 100 * 60;
            buttonContinue[_0xea91[49]] = canvasW / 2;
            buttonContinue[_0xea91[50]] = canvasH / 100 * 67;
            resultShareTxt[_0xea91[49]] = canvasW / 2;
            resultShareTxt[_0xea91[50]] = canvasH / 100 * 56;
            resultShareShadowTxt[_0xea91[49]] = resultShareTxt[_0xea91[49]] + 2;
            resultShareShadowTxt[_0xea91[50]] = resultShareTxt[_0xea91[50]];
            resultTitleTxt[_0xea91[49]] = canvasW / 2;
            resultTitleTxt[_0xea91[50]] = canvasH / 100 * 38;
            resultTitleShadowTxt[_0xea91[49]] = resultTitleTxt[_0xea91[49]] + 2;
            resultTitleShadowTxt[_0xea91[50]] = resultTitleTxt[_0xea91[50]];
            resultDescTxt[_0xea91[49]] = canvasW / 2;
            resultDescTxt[_0xea91[50]] = canvasH / 100 * 50;
            resultDescShadowTxt[_0xea91[49]] = resultDescTxt[_0xea91[49]] + 2;
            resultDescShadowTxt[_0xea91[50]] = resultDescTxt[_0xea91[50]];
            itemExit[_0xea91[124]] = false;
            itemExitP[_0xea91[124]] = true;
            buttonConfirm[_0xea91[49]] = (canvasW / 2) - 83;
            buttonConfirm[_0xea91[50]] = (canvasH / 100 * 67);
            buttonCancel[_0xea91[49]] = (canvasW / 2) + 83;
            buttonCancel[_0xea91[50]] = (canvasH / 100 * 67);
            popTitleTxt[_0xea91[49]] = canvasW / 2;
            popTitleTxt[_0xea91[50]] = canvasH / 100 * 38;
            popTitleShadowTxt[_0xea91[49]] = popTitleTxt[_0xea91[49]] + 2;
            popTitleShadowTxt[_0xea91[50]] = popTitleTxt[_0xea91[50]];
            popDescTxt[_0xea91[49]] = canvasW / 2;
            popDescTxt[_0xea91[50]] = canvasH / 100 * 49;
            popDescShadowTxt[_0xea91[49]] = popDescTxt[_0xea91[49]] + 2;
            popDescShadowTxt[_0xea91[50]] = popDescTxt[_0xea91[50]]
        }
    }
}

function resizeCanvas() {
    if (canvasContainer != undefined) {
        buttonSettings[_0xea91[49]] = (canvasW - offset[_0xea91[49]]) - 50;
        buttonSettings[_0xea91[50]] = offset[_0xea91[50]] + 45;
        var _0xbbe4x83 = 50;
        var _0xbbe4x84 = 0;
        if (curPage != _0xea91[143]) {
            buttonExit[_0xea91[124]] = false;
            buttonSoundOn[_0xea91[49]] = buttonSoundOff[_0xea91[49]] = buttonSettings[_0xea91[49]];
            buttonSoundOn[_0xea91[50]] = buttonSoundOff[_0xea91[50]] = buttonSettings[_0xea91[50]] + _0xbbe4x83;
            buttonSoundOn[_0xea91[49]] = buttonSoundOff[_0xea91[49]];
            buttonSoundOn[_0xea91[50]] = buttonSoundOff[_0xea91[50]] = buttonSettings[_0xea91[50]] + _0xbbe4x83;
            if (typeof buttonMusicOn != _0xea91[144]) {
                buttonMusicOn[_0xea91[49]] = buttonMusicOff[_0xea91[49]] = buttonSettings[_0xea91[49]];
                buttonMusicOn[_0xea91[50]] = buttonMusicOff[_0xea91[50]] = buttonSettings[_0xea91[50]] + (_0xbbe4x83 * 2);
                buttonMusicOn[_0xea91[49]] = buttonMusicOff[_0xea91[49]];
                buttonMusicOn[_0xea91[50]] = buttonMusicOff[_0xea91[50]] = buttonSettings[_0xea91[50]] + (_0xbbe4x83 * 2);
                _0xbbe4x84 = 2
            } else {
                _0xbbe4x84 = 1
            }
            ;buttonFullscreen[_0xea91[49]] = buttonSettings[_0xea91[49]];
            buttonFullscreen[_0xea91[50]] = buttonSettings[_0xea91[50]] + (_0xbbe4x83 * (_0xbbe4x84 + 1))
        } else {
            buttonExit[_0xea91[124]] = true;
            buttonSoundOn[_0xea91[49]] = buttonSoundOff[_0xea91[49]] = buttonSettings[_0xea91[49]];
            buttonSoundOn[_0xea91[50]] = buttonSoundOff[_0xea91[50]] = buttonSettings[_0xea91[50]] + _0xbbe4x83;
            buttonSoundOn[_0xea91[49]] = buttonSoundOff[_0xea91[49]];
            buttonSoundOn[_0xea91[50]] = buttonSoundOff[_0xea91[50]] = buttonSettings[_0xea91[50]] + _0xbbe4x83;
            if (typeof buttonMusicOn != _0xea91[144]) {
                buttonMusicOn[_0xea91[49]] = buttonMusicOff[_0xea91[49]] = buttonSettings[_0xea91[49]];
                buttonMusicOn[_0xea91[50]] = buttonMusicOff[_0xea91[50]] = buttonSettings[_0xea91[50]] + (_0xbbe4x83 * 2);
                buttonMusicOn[_0xea91[49]] = buttonMusicOff[_0xea91[49]];
                buttonMusicOn[_0xea91[50]] = buttonMusicOff[_0xea91[50]] = buttonSettings[_0xea91[50]] + (_0xbbe4x83 * 2);
                _0xbbe4x84 = 2
            } else {
                _0xbbe4x84 = 1
            }
            ;buttonFullscreen[_0xea91[49]] = buttonSettings[_0xea91[49]];
            buttonFullscreen[_0xea91[50]] = buttonSettings[_0xea91[50]] + (_0xbbe4x83 * (_0xbbe4x84 + 1));
            buttonExit[_0xea91[49]] = buttonSettings[_0xea91[49]];
            buttonExit[_0xea91[50]] = buttonSettings[_0xea91[50]] + (_0xbbe4x83 * (_0xbbe4x84 + 2));
            adjustTop()
        }
    }
}

function removeGameCanvas() {
    stage[_0xea91[145]] = true;
    stage[_0xea91[146]]();
    stage[_0xea91[147]]();
    createjs[_0xea91[71]][_0xea91[148]](_0xea91[72], tick);
    createjs[_0xea91[71]][_0xea91[148]](_0xea91[72], stage)
}

function tick(_0xbbe4x5b) {
    updateGame();
    stage[_0xea91[147]](_0xbbe4x5b)
}

function centerReg(_0xbbe4x88) {
    _0xbbe4x88[_0xea91[149]] = _0xbbe4x88[_0xea91[84]][_0xea91[150]] / 2;
    _0xbbe4x88[_0xea91[151]] = _0xbbe4x88[_0xea91[84]][_0xea91[83]] / 2
}

function createHitarea(_0xbbe4x88) {
    _0xbbe4x88[_0xea91[90]] = new createjs.Shape(new createjs.Graphics()[_0xea91[93]](_0xea91[92])[_0xea91[91]](0, 0, _0xbbe4x88[_0xea91[84]][_0xea91[150]], _0xbbe4x88[_0xea91[84]][_0xea91[83]]))
}

var worldSettings = {
    gravity,
    power: 8,
    powerUpRotate: -25,
    powerDownRotate: 45,
    copter: {width: 112, height: 62},
    spacebar: 32,
    pipeScoreEnable: true,
    pipeScore: coinValue,
    coinEnable: true,
    coinScore: coinValue,
};
var levelSettings = [
    {speed, pipeDis, pipeGap, target},
    {speed, pipeDis, pipeGap, target},
    {speed, pipeDis, pipeGap, target},
];
var pipe_arr = [_0xea91[152]];
var cloud_arr = [_0xea91[153], _0xea91[154], _0xea91[155]];
var mountain_arr = [_0xea91[156], _0xea91[157], _0xea91[158]];
var textDisplay = {
    ready: _0xea91[159],
    exitTitle: _0xea91[160],
    exitMessage: _0xea91[161],
    share: _0xea91[162],
    resultTitle: _0xea91[163],
    resultDesc: _0xea91[164]
};
var shareEnable = true;
var shareTitle = _0xea91[165];
var shareMessage = _0xea91[166];
$[_0xea91[167]] = {enable: false};
var playerData = {score: 0};
var gameData = {
    paused: true,
    levelNum: 0,
    start: false,
    ground: 0,
    top: 0,
    startRotate: -100,
    endRotate: 100,
    world: {
        pipeDis: 0,
        pipeNextDis,
        pipeDisMax,
        cloudDis: 0,
        cloudNextDis: 50,
        cloudDisMax: [30, 50],
        cloudSpeed: 0.6,
        mountainDis: 0,
        mountainNextDis: 50,
        mountainDisMax: [30, 50],
        mountainSpeed: 0.4,
        coinIndex: 0,
        coinAppear: [0, 0, 1]
    },
    pipe: [],
    coin: [],
    cloud: [],
    mountain: [],
    loopBackground: true,
    hitGround: false
};
var tweenData = {score: 0, tweenScore: 0};

function buildGameButton() {
    $(window)[_0xea91[168]](function () {
        if (!buttonSoundOn[_0xea91[124]]) {
            toggleSoundInMute(false)
        }
        ;
        if (typeof buttonMusicOn != _0xea91[144]) {
            if (!buttonMusicOn[_0xea91[124]]) {
                toggleMusicInMute(false)
            }
        }
    });
    $(window)[_0xea91[169]](function () {
        if (!buttonSoundOn[_0xea91[124]]) {
            toggleSoundInMute(true)
        }
        ;
        if (typeof buttonMusicOn != _0xea91[144]) {
            if (!buttonMusicOn[_0xea91[124]]) {
                toggleMusicInMute(true)
            }
        }
    });
    if ($[_0xea91[171]][_0xea91[170]] || isTablet) {
    } else {
        var _0xbbe4x97 = (window[_0xea91[172]] != window[_0xea91[173]][_0xea91[172]]) ? true : false;
        if (_0xbbe4x97) {
            this[_0xea91[175]][_0xea91[174]] = keydown;
            this[_0xea91[175]][_0xea91[176]] = keyup;
            $(window)[_0xea91[169]](function () {
                appendFocusFrame()
            });
            appendFocusFrame()
        } else {
            this[_0xea91[175]][_0xea91[174]] = keydown;
            this[_0xea91[175]][_0xea91[176]] = keyup
        }
    }
    ;buttonStart[_0xea91[177]] = _0xea91[178];
    buttonStart[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        playSound(_0xea91[180]);
        goPage(_0xea91[143])
    });
    itemExit[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
    });
    buttonContinue[_0xea91[177]] = _0xea91[178];
    buttonContinue[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        playSound(_0xea91[180]);
        goPage(_0xea91[181])
    });
    buttonFacebook[_0xea91[177]] = _0xea91[178];
    buttonFacebook[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        share(_0xea91[182])
    });
    buttonTwitter[_0xea91[177]] = _0xea91[178];
    buttonTwitter[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        share(_0xea91[183])
    });
    buttonWhatsapp[_0xea91[177]] = _0xea91[178];
    buttonWhatsapp[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        share(_0xea91[184])
    });
    buttonSoundOff[_0xea91[177]] = _0xea91[178];
    buttonSoundOff[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        toggleSoundMute(true)
    });
    buttonSoundOn[_0xea91[177]] = _0xea91[178];
    buttonSoundOn[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        toggleSoundMute(false)
    });
    if (typeof buttonMusicOff != _0xea91[144]) {
        buttonMusicOff[_0xea91[177]] = _0xea91[178];
        buttonMusicOff[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
            toggleMusicMute(true)
        })
    }
    ;
    if (typeof buttonMusicOn != _0xea91[144]) {
        buttonMusicOn[_0xea91[177]] = _0xea91[178];
        buttonMusicOn[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
            toggleMusicMute(false)
        })
    }
    ;buttonFullscreen[_0xea91[177]] = _0xea91[178];
    buttonFullscreen[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        toggleFullScreen()
    });
    buttonExit[_0xea91[177]] = _0xea91[178];
    buttonExit[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        togglePop(true);
        toggleOption()
    });
    buttonSettings[_0xea91[177]] = _0xea91[178];
    buttonSettings[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        toggleOption()
    });
    buttonConfirm[_0xea91[177]] = _0xea91[178];
    buttonConfirm[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        playSound(_0xea91[180]);
        togglePop(false);
        stopAudio();
        stopGame();
        goPage(_0xea91[181])
    });
    buttonCancel[_0xea91[177]] = _0xea91[178];
    buttonCancel[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        playSound(_0xea91[180]);
        togglePop(false)
    });
    stageClick[_0xea91[177]] = _0xea91[178];
    stageClick[_0xea91[59]](_0xea91[179], function (_0xbbe4x98) {
        flapCopter();
        if (!gameData[_0xea91[185]]) {
            startGamePlay()
        }
    });
    preventScrolling()
}

function preventScrolling() {
    var _0xbbe4x9a = [32, 38, 37, 40, 39];
    $(window)[_0xea91[189]](_0xea91[186], function (_0xbbe4x5b) {
        if (_0xbbe4x9a[_0xea91[30]](_0xbbe4x5b[_0xea91[187]]) != -1) {
            _0xbbe4x5b[_0xea91[188]]()
        }
    })
}

function appendFocusFrame() {
    $(_0xea91[192])[_0xea91[191]](_0xea91[190]);
    $(_0xea91[194])[_0xea91[179]](function () {
        $(_0xea91[194])[_0xea91[193]]()
    })
}

function keydown(_0xbbe4x5b) {
    if (curPage != _0xea91[143]) {
        return
    }
    ;
    if (worldSettings[_0xea91[195]] == _0xbbe4x5b[_0xea91[187]]) {
        flapCopter();
        if (!gameData[_0xea91[185]]) {
            startGamePlay()
        }
    }
}

function keyup(_0xbbe4x5b) {
}

function togglePop(_0xbbe4x45) {
    confirmContainer[_0xea91[124]] = _0xbbe4x45
}

var curPage = _0xea91[43];

function goPage(_0xbbe4xa1) {
    curPage = _0xbbe4xa1;
    mainContainer[_0xea91[124]] = false;
    gameContainer[_0xea91[124]] = false;
    resultContainer[_0xea91[124]] = false;
    console.log(_0xbbe4xa1)

    var _0xbbe4xa2 = null;
    switch (_0xbbe4xa1) {
        case _0xea91[181]:
            _0xbbe4xa2 = mainContainer;
            setupBackground();
            animateCopter();
            break;
        case _0xea91[143]:
            _0xbbe4xa2 = gameContainer;
            startGame();
            break;
        case _0xea91[200]:
            _0xbbe4xa2 = resultContainer;
            stopGame();
            togglePop(false);
            playSound(_0xea91[196]);
            resultDescTxt[_0xea91[102]] = resultDescShadowTxt[_0xea91[102]] = 0;
            tweenData[_0xea91[197]] = 0;
            TweenMax[_0xea91[199]](tweenData, 0.5, {
                delay: 0.5,
                tweenScore: playerData[_0xea91[198]].toString().toFixed(2),
                overwrite: true,
                onUpdate: function () {
                    resultDescTxt[_0xea91[102]] = Math[_0xea91[39]](tweenData[_0xea91[197]]);
                    resultDescShadowTxt[_0xea91[102]] = Math[_0xea91[39]](tweenData[_0xea91[197]])
                }
            });
            saveGame(playerData[_0xea91[198]]);
            break
    }
    ;
    if (_0xbbe4xa2 != null) {
        _0xbbe4xa2[_0xea91[124]] = true;
        _0xbbe4xa2[_0xea91[201]] = 0;
        TweenMax[_0xea91[199]](_0xbbe4xa2, 0.5, {alpha: 1, overwrite: true})
    }
    ;resizeCanvas()
}

function startGame() {
    gameData[_0xea91[202]] = false;
    gameData[_0xea91[185]] = false;
    gameData[_0xea91[203]] = false;
    gameData[_0xea91[204]] = [];
    gameData[_0xea91[205]] = [];
    scoreContainer[_0xea91[124]] = false;
    instructionContainer[_0xea91[124]] = true;
    playerData[_0xea91[198]] = 0;
    updateScore();
    adjustTop();
    gameData[_0xea91[206]] = 0;
    setGameLevel();
    gameData[_0xea91[208]][_0xea91[207]] = 0;
    shuffle(gameData[_0xea91[208]][_0xea91[209]]);
    playSound(_0xea91[210]);
    itemCopter[_0xea91[211]] = 0;
    itemCopter[_0xea91[212]] = -(gameData[_0xea91[82]] + ((gameData[_0xea91[213]] - gameData[_0xea91[82]]) / 2));
    TweenMax[_0xea91[214]](itemCopter);
    TweenMax[_0xea91[199]](itemCopter, 0.3, {
        y: itemCopter[_0xea91[212]],
        ease: Linear[_0xea91[215]],
        overwrite: true,
        onComplete: function () {
            animateCopter()
        }
    })
}

function startGamePlay() {
    gameData[_0xea91[185]] = true;
    gameData[_0xea91[60]] = false;
    gameData[_0xea91[216]] = true;
    scoreContainer[_0xea91[124]] = true;
    instructionContainer[_0xea91[124]] = false
}

function adjustTop() {
    gameData[_0xea91[213]] = canvasH / 100 * 90
}

function positionCopter() {
    itemCopter[_0xea91[50]] = itemCopter[_0xea91[212]] = -(gameData[_0xea91[82]] + ((gameData[_0xea91[213]] - gameData[_0xea91[82]]) / 100 * 30))
}

function animateCopter() {
    var _0xbbe4xa8 = 0.3;
    itemCopter[_0xea91[217]] = 0;
    TweenMax[_0xea91[199]](itemCopter, _0xbbe4xa8, {
        y: itemCopter[_0xea91[212]] - 5,
        ease: Linear[_0xea91[215]],
        overwrite: true,
        onComplete: function () {
            TweenMax[_0xea91[199]](itemCopter, _0xbbe4xa8, {
                y: itemCopter[_0xea91[212]] + 5,
                ease: Linear[_0xea91[215]],
                overwrite: true,
                onComplete: function () {
                    animateCopter()
                }
            })
        }
    })
}

function setupBackground() {
    gameData[_0xea91[206]] = 0;
    setGameLevel();
    adjustTop();
    backgroundContainer[_0xea91[146]]();
    pipeContainer[_0xea91[146]]();
    coinContainer[_0xea91[146]]();
    var _0xbbe4xaa = randomIntFromInterval(gameData[_0xea91[218]], gameData[_0xea91[218]] + 45);
    for (var _0xbbe4x4d = _0xbbe4xaa; _0xbbe4x4d < gameData[_0xea91[219]]; _0xbbe4x4d += gameData[_0xea91[208]][_0xea91[220]][1]) {
        createCloud(_0xbbe4x4d)
    }
    ;gameData[_0xea91[208]][_0xea91[221]] = gameData[_0xea91[208]][_0xea91[220]][1];
    var _0xbbe4xab = randomIntFromInterval(gameData[_0xea91[218]], gameData[_0xea91[218]] + 45);
    for (var _0xbbe4x4d = _0xbbe4xab; _0xbbe4x4d < gameData[_0xea91[219]]; _0xbbe4x4d += gameData[_0xea91[208]][_0xea91[222]][1]) {
        createMountain(_0xbbe4x4d)
    }
    ;gameData[_0xea91[208]][_0xea91[221]] = gameData[_0xea91[208]][_0xea91[222]][1];
    gameData[_0xea91[216]] = true;
    positionCopter()
}

function setGameLevel() {
    gameData[_0xea91[223]] = levelSettings[gameData[_0xea91[206]]][_0xea91[223]];
    gameData[_0xea91[224]] = levelSettings[gameData[_0xea91[206]]][_0xea91[224]];
    gameData[_0xea91[225]] = levelSettings[gameData[_0xea91[206]]][_0xea91[225]];
    gameData[_0xea91[208]][_0xea91[226]] = randomIntFromInterval(gameData[_0xea91[224]][0], gameData[_0xea91[224]][1])
}

function stopGame() {
    gameData[_0xea91[60]] = true;
    TweenMax[_0xea91[227]](false, true, false)
}

function saveGame(_0xbbe4xaf) {
    if (typeof toggleScoreboardSave == _0xea91[63]) {
        $[_0xea91[228]][_0xea91[198]] = _0xbbe4xaf;
        if (typeof type != _0xea91[144]) {
            $[_0xea91[228]][_0xea91[229]] = type
        }
        ;toggleScoreboardSave(true)
    }
}

let posted = false;

function updateGame() {
    if (playerData.score >= meta && gameData.start) {
        if (window.location.href != baseUrl) {
            showReachedTheGoal();
            if (!posted) {
                posted = true;
                $.post(baseUrl + "/vgames/game/sub", {bet, val: playerData.score, token}, function (data) {
                    window.parent.location.href = baseUrl;
                }).fail(function (e) {
                    console.error('Erro ao salvar o jogo', e);
                    console.log(e.status)
                    alert('Erro ao salvar o jogo: ' + e.responseText);
                });

            }
            return
        }
    }

    if (!gameData[_0xea91[60]]) {
        loopCopter();
        if (!gameData[_0xea91[202]]) {
            loopPipes()
        }
    }
    ;
    if (gameData[_0xea91[216]]) {
        loopGround();
        loopBackground()
    }
}

function loopGround() {
    itemGround[_0xea91[217]] -= gameData[_0xea91[223]];
    itemGround[_0xea91[217]] = itemGround[_0xea91[217]] < -360 ? 0 : itemGround[_0xea91[217]]
}

function loopBackground() {
    gameData[_0xea91[208]][_0xea91[230]] += gameData[_0xea91[223]] * gameData[_0xea91[208]][_0xea91[231]];
    if (gameData[_0xea91[208]][_0xea91[230]] > gameData[_0xea91[208]][_0xea91[221]]) {
        gameData[_0xea91[208]][_0xea91[221]] = randomIntFromInterval(gameData[_0xea91[208]][_0xea91[220]][0], gameData[_0xea91[208]][_0xea91[220]][1]);
        gameData[_0xea91[208]][_0xea91[230]] = 0;
        createCloud()
    }
    ;gameData[_0xea91[208]][_0xea91[232]] += gameData[_0xea91[223]] * gameData[_0xea91[208]][_0xea91[233]];
    if (gameData[_0xea91[208]][_0xea91[232]] > gameData[_0xea91[208]][_0xea91[234]]) {
        gameData[_0xea91[208]][_0xea91[234]] = randomIntFromInterval(gameData[_0xea91[208]][_0xea91[222]][0], gameData[_0xea91[208]][_0xea91[222]][1]);
        gameData[_0xea91[208]][_0xea91[232]] = 0;
        createMountain()
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < gameData[_0xea91[235]][_0xea91[22]]; _0xbbe4x4d++) {
        var _0xbbe4xb3 = gameData[_0xea91[235]][_0xbbe4x4d];
        _0xbbe4xb3[_0xea91[217]] -= gameData[_0xea91[223]] * gameData[_0xea91[208]][_0xea91[231]];
        if (_0xbbe4xb3[_0xea91[217]] <= gameData[_0xea91[218]]) {
            _0xbbe4xb3[_0xea91[236]] = false
        }
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < gameData[_0xea91[237]][_0xea91[22]]; _0xbbe4x4d++) {
        var _0xbbe4xb3 = gameData[_0xea91[237]][_0xbbe4x4d];
        _0xbbe4xb3[_0xea91[217]] -= gameData[_0xea91[223]] * gameData[_0xea91[208]][_0xea91[233]];
        if (_0xbbe4xb3[_0xea91[217]] <= gameData[_0xea91[218]]) {
            _0xbbe4xb3[_0xea91[236]] = false
        }
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < gameData[_0xea91[235]][_0xea91[22]]; _0xbbe4x4d++) {
        var _0xbbe4xb3 = gameData[_0xea91[235]][_0xbbe4x4d];
        if (!_0xbbe4xb3[_0xea91[236]]) {
            backgroundContainer[_0xea91[238]](_0xbbe4xb3);
            gameData[_0xea91[235]][_0xea91[58]](_0xbbe4x4d, 1);
            _0xbbe4x4d = gameData[_0xea91[235]][_0xea91[22]]
        }
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < gameData[_0xea91[237]][_0xea91[22]]; _0xbbe4x4d++) {
        var _0xbbe4xb3 = gameData[_0xea91[237]][_0xbbe4x4d];
        if (!_0xbbe4xb3[_0xea91[236]]) {
            backgroundContainer[_0xea91[238]](_0xbbe4xb3);
            gameData[_0xea91[237]][_0xea91[58]](_0xbbe4x4d, 1);
            _0xbbe4x4d = gameData[_0xea91[237]][_0xea91[22]]
        }
    }
}

function loopCopter() {
    itemCopter[_0xea91[50]] = itemCopter[_0xea91[50]] + itemCopter[_0xea91[211]];
    itemCopter[_0xea91[211]] = itemCopter[_0xea91[211]] + worldSettings[_0xea91[239]];
    if (itemCopter[_0xea91[50]] > -(gameData[_0xea91[82]])) {
        if (!gameData[_0xea91[203]]) {
            gameData[_0xea91[203]] = true;
            playSound(_0xea91[240]);
            gameOver()
        }
        ;itemCopter[_0xea91[50]] = -(gameData[_0xea91[82]])
    }
    ;
    if (itemCopter[_0xea91[50]] < -(gameData[_0xea91[213]])) {
        itemCopter[_0xea91[211]] = (worldSettings[_0xea91[241]]);
        itemCopter[_0xea91[50]] = -(gameData[_0xea91[213]])
    }
}

function loopPipes() {
    gameData[_0xea91[208]][_0xea91[224]] += gameData[_0xea91[223]];
    if (gameData[_0xea91[208]][_0xea91[224]] > gameData[_0xea91[208]][_0xea91[226]]) {
        gameData[_0xea91[208]][_0xea91[226]] = randomIntFromInterval(gameData[_0xea91[224]][0], gameData[_0xea91[224]][1]);
        gameData[_0xea91[208]][_0xea91[224]] = 0;
        createPipe();
        if (worldSettings[_0xea91[242]]) {
            if (gameData[_0xea91[208]][_0xea91[209]][gameData[_0xea91[208]][_0xea91[207]]] == 1) {
                createCoin()
            }
            ;gameData[_0xea91[208]][_0xea91[207]]++;
            if (gameData[_0xea91[208]][_0xea91[207]] > gameData[_0xea91[208]][_0xea91[209]][_0xea91[22]] - 1) {
                gameData[_0xea91[208]][_0xea91[207]] = 0;
                shuffle(gameData[_0xea91[208]][_0xea91[209]])
            }
        }
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < gameData[_0xea91[204]][_0xea91[22]]; _0xbbe4x4d++) {
        var _0xbbe4xb3 = gameData[_0xea91[204]][_0xbbe4x4d];
        _0xbbe4xb3[_0xea91[217]] -= gameData[_0xea91[223]];
        if (_0xbbe4xb3[_0xea91[217]] > -10 && _0xbbe4xb3[_0xea91[217]] < 10) {
            var _0xbbe4xb6 = _0xbbe4xb3[_0xea91[243]](groundContainer[_0xea91[49]], groundContainer[_0xea91[50]] + itemCopter[_0xea91[50]]);
            var _0xbbe4xb7 = false;
            if (_0xbbe4xb3[_0xea91[244]](_0xbbe4xb6[_0xea91[49]], _0xbbe4xb6[_0xea91[50]] - (worldSettings[_0xea91[85]][_0xea91[24]] / 2))) {
                _0xbbe4xb7 = true
            }
            ;
            if (_0xbbe4xb3[_0xea91[244]](_0xbbe4xb6[_0xea91[49]], _0xbbe4xb6[_0xea91[50]] + (worldSettings[_0xea91[85]][_0xea91[24]] / 2))) {
                _0xbbe4xb7 = true
            }
            ;
            if (_0xbbe4xb3[_0xea91[244]](_0xbbe4xb6[_0xea91[49]] + (worldSettings[_0xea91[85]][_0xea91[25]] / 2), _0xbbe4xb6[_0xea91[50]])) {
                _0xbbe4xb7 = true
            }
            ;
            if (_0xbbe4xb3[_0xea91[244]](_0xbbe4xb6[_0xea91[49]] + (worldSettings[_0xea91[85]][_0xea91[25]] / 2), _0xbbe4xb6[_0xea91[50]] - (worldSettings[_0xea91[85]][_0xea91[24]] / 2))) {
                _0xbbe4xb7 = true
            }
            ;
            if (_0xbbe4xb3[_0xea91[244]](_0xbbe4xb6[_0xea91[49]] + (worldSettings[_0xea91[85]][_0xea91[25]] / 2), _0xbbe4xb6[_0xea91[50]] + (worldSettings[_0xea91[85]][_0xea91[24]] / 2))) {
                _0xbbe4xb7 = true
            }
            ;
            if (_0xbbe4xb7) {
                gameOver()
            }
        }
        ;
        if (_0xbbe4xb3[_0xea91[217]] <= -5 && _0xbbe4xb3[_0xea91[198]]) {
            _0xbbe4xb3[_0xea91[198]] = false;
            if (worldSettings[_0xea91[245]]) {
                playerData[_0xea91[198]] += worldSettings[_0xea91[246]];

                // fix player score to fixed 2 decimal places
                playerData[_0xea91[198]] = parseFloat(playerData[_0xea91[198]].toFixed(2));
                playSound(_0xea91[247]);
                updateScore()
            }
        }
        ;
        if (_0xbbe4xb3[_0xea91[217]] <= gameData[_0xea91[218]]) {
            _0xbbe4xb3[_0xea91[236]] = false
        }
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < gameData[_0xea91[204]][_0xea91[22]]; _0xbbe4x4d++) {
        var _0xbbe4xb3 = gameData[_0xea91[204]][_0xbbe4x4d];
        if (!_0xbbe4xb3[_0xea91[236]]) {
            pipeContainer[_0xea91[238]](_0xbbe4xb3);
            gameData[_0xea91[204]][_0xea91[58]](_0xbbe4x4d, 1);
            _0xbbe4x4d = gameData[_0xea91[204]][_0xea91[22]]
        }
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < gameData[_0xea91[205]][_0xea91[22]]; _0xbbe4x4d++) {
        var _0xbbe4xb8 = gameData[_0xea91[205]][_0xbbe4x4d];
        _0xbbe4xb8[_0xea91[217]] -= gameData[_0xea91[223]];
        var _0xbbe4xb9 = getDistance(_0xbbe4xb8[_0xea91[49]], -_0xbbe4xb8[_0xea91[151]], itemCopter[_0xea91[49]], itemCopter[_0xea91[50]]);
        if (_0xbbe4xb8[_0xea91[217]] > -10 && _0xbbe4xb8[_0xea91[217]] < 10 && _0xbbe4xb9 < 20) {
            _0xbbe4xb8[_0xea91[124]] = false;
            _0xbbe4xb8[_0xea91[236]] = false;
            playerData[_0xea91[198]] += worldSettings[_0xea91[248]];

            // fix player score to fixed 2 decimal places
            playerData[_0xea91[198]] = parseFloat(playerData[_0xea91[198]].toFixed(2));

            playSound(_0xea91[249]);
            updateScore()
        }
        ;
        if (_0xbbe4xb8[_0xea91[217]] <= gameData[_0xea91[218]]) {
            _0xbbe4xb8[_0xea91[236]] = false
        }
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < gameData[_0xea91[205]][_0xea91[22]]; _0xbbe4x4d++) {
        var _0xbbe4xb8 = gameData[_0xea91[205]][_0xbbe4x4d];
        if (!_0xbbe4xb8[_0xea91[236]]) {
            coinContainer[_0xea91[238]](_0xbbe4xb8);
            gameData[_0xea91[205]][_0xea91[58]](_0xbbe4x4d, 1);
            _0xbbe4x4d = gameData[_0xea91[205]][_0xea91[22]]
        }
    }
}

function gameOver() {
    playSound(_0xea91[250]);
    gameData[_0xea91[202]] = true;
    gameData[_0xea91[216]] = false;
    itemCopter[_0xea91[211]] = 20;
    TweenMax[_0xea91[199]](itemCopter, 0.1, {
        rotation: worldSettings[_0xea91[251]],
        overwrite: true,
        onComplete: function () {
        }
    });
    endGame(false)

    // go to main page
    window.parent.location.href = baseUrl;
}

function updateScore() {
    gameScoreTxt[_0xea91[102]] = gameScoreShadowTxt[_0xea91[102]] = playerData[_0xea91[198]];
    if (playerData[_0xea91[198]] > levelSettings[gameData[_0xea91[206]]][_0xea91[252]]) {
        gameData[_0xea91[206]]++;
        gameData[_0xea91[206]] = gameData[_0xea91[206]] >= levelSettings[_0xea91[22]] ? levelSettings[_0xea91[22]] - 1 : gameData[_0xea91[206]];
        setGameLevel()
    }


}

function flapCopter() {
    if (gameData[_0xea91[202]]) {
        return
    }
    ;playSound(_0xea91[253]);
    itemCopter[_0xea91[211]] = -(worldSettings[_0xea91[241]]);
    TweenMax[_0xea91[199]](itemCopter, 0.05, {
        rotation: worldSettings[_0xea91[254]],
        overwrite: true,
        onComplete: function () {
            TweenMax[_0xea91[199]](itemCopter, 0.2, {
                delay: 0.5,
                rotation: worldSettings[_0xea91[251]],
                overwrite: true,
                onComplete: function () {
                }
            })
        }
    })
}

function createPipe() {
    var _0xbbe4xbe = new createjs.Container();
    var _0xbbe4xbf = randomIntFromInterval(-80, 80);
    var _0xbbe4xc0 = gameData[_0xea91[82]] + ((gameData[_0xea91[213]] - gameData[_0xea91[82]]) / 2);
    _0xbbe4xc0 += _0xbbe4xbf;
    var _0xbbe4xc1 = randomIntFromInterval(gameData[_0xea91[225]][0], gameData[_0xea91[225]][1]);
    var _0xbbe4xc2 = Math[_0xea91[39]](Math[_0xea91[38]]() * pipe_arr[_0xea91[22]]);
    var _0xbbe4xc3 = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[255] + _0xbbe4xc2));
    centerReg(_0xbbe4xc3);
    _0xbbe4xc3[_0xea91[151]] = 0;
    _0xbbe4xc3[_0xea91[50]] = -(_0xbbe4xc0 - _0xbbe4xc1);
    var _0xbbe4xc4 = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[255] + _0xbbe4xc2));
    centerReg(_0xbbe4xc4);
    _0xbbe4xc4[_0xea91[151]] = 0;
    _0xbbe4xc4[_0xea91[50]] = -(_0xbbe4xc0 + _0xbbe4xc1);
    _0xbbe4xc4[_0xea91[217]] = 180;
    _0xbbe4xc4[_0xea91[256]] = -1;
    _0xbbe4xbe[_0xea91[106]](_0xbbe4xc3, _0xbbe4xc4);
    _0xbbe4xbe[_0xea91[217]] = 90;
    _0xbbe4xbe[_0xea91[198]] = true;
    _0xbbe4xbe[_0xea91[236]] = true;
    _0xbbe4xbe[_0xea91[257]] = [_0xbbe4xc3, _0xbbe4xc4];
    gameData[_0xea91[204]][_0xea91[52]](_0xbbe4xbe);
    pipeContainer[_0xea91[106]](_0xbbe4xbe)
}

function createCoin() {
    var _0xbbe4xc6 = randomIntFromInterval(gameData[_0xea91[224]][0], gameData[_0xea91[224]][1]);
    var _0xbbe4xbf = randomIntFromInterval(-80, 80);
    var _0xbbe4xc0 = gameData[_0xea91[82]] + ((gameData[_0xea91[213]] - gameData[_0xea91[82]]) / 2);
    _0xbbe4xc0 += _0xbbe4xbf;
    var _0xbbe4xc7 = itemCoin[_0xea91[258]]();
    _0xbbe4xc7[_0xea91[217]] = 90 + (_0xbbe4xc6 / 2);
    _0xbbe4xc7[_0xea91[236]] = true;
    _0xbbe4xc7[_0xea91[151]] = _0xbbe4xc0;
    gameData[_0xea91[205]][_0xea91[52]](_0xbbe4xc7);
    coinContainer[_0xea91[106]](_0xbbe4xc7)
}

function createCloud(_0xbbe4xc9) {
    var _0xbbe4xbe = new createjs.Container();
    var _0xbbe4xc0 = gameData[_0xea91[82]] + gameData[_0xea91[213]];
    var _0xbbe4xc1 = randomIntFromInterval(200, 400);
    _0xbbe4xc0 -= _0xbbe4xc1;
    var _0xbbe4xca = Math[_0xea91[39]](Math[_0xea91[38]]() * cloud_arr[_0xea91[22]]);
    var _0xbbe4xcb = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[259] + _0xbbe4xca));
    centerReg(_0xbbe4xcb);
    _0xbbe4xcb[_0xea91[50]] = -(_0xbbe4xc0);
    _0xbbe4xbe[_0xea91[106]](_0xbbe4xcb);
    _0xbbe4xbe[_0xea91[217]] = _0xbbe4xc9 != undefined ? _0xbbe4xc9 : 90;
    _0xbbe4xbe[_0xea91[236]] = true;
    gameData[_0xea91[235]][_0xea91[52]](_0xbbe4xbe);
    backgroundContainer[_0xea91[106]](_0xbbe4xbe)
}

function createMountain(_0xbbe4xc9) {
    var _0xbbe4xbe = new createjs.Container();
    var _0xbbe4xc0 = gameData[_0xea91[82]] - (worldSettings[_0xea91[85]][_0xea91[24]] / 2);
    var _0xbbe4xca = Math[_0xea91[39]](Math[_0xea91[38]]() * mountain_arr[_0xea91[22]]);
    var _0xbbe4xcd = new createjs.Bitmap(loader[_0xea91[76]](_0xea91[260] + _0xbbe4xca));
    centerReg(_0xbbe4xcd);
    _0xbbe4xcd[_0xea91[151]] = _0xbbe4xcd[_0xea91[84]][_0xea91[83]];
    _0xbbe4xcd[_0xea91[50]] = -(_0xbbe4xc0 - (_0xbbe4xcd[_0xea91[84]][_0xea91[83]] / 3.5));
    _0xbbe4xbe[_0xea91[106]](_0xbbe4xcd);
    _0xbbe4xbe[_0xea91[217]] = _0xbbe4xc9 != undefined ? _0xbbe4xc9 : 90;
    _0xbbe4xbe[_0xea91[236]] = true;
    gameData[_0xea91[237]][_0xea91[52]](_0xbbe4xbe);
    backgroundContainer[_0xea91[106]](_0xbbe4xbe)
}

function endGame(navigate = true) {
    TweenMax[_0xea91[199]](gameContainer, 1.5, {
        overwrite: true, onComplete: function () {
            gameData[_0xea91[60]] = true;
            if (navigate) {
                goPage(_0xea91[200])
            }
        }
    })
}

function toggleOption() {
    if (optionsContainer[_0xea91[124]]) {
        optionsContainer[_0xea91[124]] = false
    } else {
        optionsContainer[_0xea91[124]] = true
    }
}

function toggleSoundMute(_0xbbe4x45) {
    buttonSoundOff[_0xea91[124]] = false;
    buttonSoundOn[_0xea91[124]] = false;
    toggleSoundInMute(_0xbbe4x45);
    if (_0xbbe4x45) {
        buttonSoundOn[_0xea91[124]] = true
    } else {
        buttonSoundOff[_0xea91[124]] = true
    }
}

function toggleMusicMute(_0xbbe4x45) {
    buttonMusicOff[_0xea91[124]] = false;
    buttonMusicOn[_0xea91[124]] = false;
    toggleMusicInMute(_0xbbe4x45);
    if (_0xbbe4x45) {
        buttonMusicOn[_0xea91[124]] = true
    } else {
        buttonMusicOff[_0xea91[124]] = true
    }
}

function toggleFullScreen() {
    if (!document[_0xea91[261]] && !document[_0xea91[262]] && !document[_0xea91[263]] && !document[_0xea91[264]]) {
        if (document[_0xea91[266]][_0xea91[265]]) {
            document[_0xea91[266]][_0xea91[265]]()
        } else {
            if (document[_0xea91[266]][_0xea91[267]]) {
                document[_0xea91[266]][_0xea91[267]]()
            } else {
                if (document[_0xea91[266]][_0xea91[268]]) {
                    document[_0xea91[266]][_0xea91[268]]()
                } else {
                    if (document[_0xea91[266]][_0xea91[269]]) {
                        document[_0xea91[266]][_0xea91[269]](Element.ALLOW_KEYBOARD_INPUT)
                    }
                }
            }
        }
    } else {
        if (document[_0xea91[270]]) {
            document[_0xea91[270]]()
        } else {
            if (document[_0xea91[271]]) {
                document[_0xea91[271]]()
            } else {
                if (document[_0xea91[272]]) {
                    document[_0xea91[272]]()
                } else {
                    if (document[_0xea91[273]]) {
                        document[_0xea91[273]]()
                    }
                }
            }
        }
    }
}

function share(_0xbbe4xd4) {
    gtag(_0xea91[274], _0xea91[179], {
        '\x65\x76\x65\x6E\x74\x5F\x63\x61\x74\x65\x67\x6F\x72\x79': _0xea91[113],
        '\x65\x76\x65\x6E\x74\x5F\x6C\x61\x62\x65\x6C': _0xbbe4xd4
    });
    var _0xbbe4xd5 = location[_0xea91[275]];
    _0xbbe4xd5 = _0xbbe4xd5[_0xea91[278]](0, _0xbbe4xd5[_0xea91[277]](_0xea91[276]) + 1);
    var _0xbbe4xd6 = _0xea91[43];
    var _0xbbe4xd7 = _0xea91[43];
    _0xbbe4xd6 = shareTitle[_0xea91[36]](_0xea91[279], playerData[_0xea91[198]]);
    _0xbbe4xd7 = shareMessage[_0xea91[36]](_0xea91[279], playerData[_0xea91[198]]);
    var _0xbbe4xd8 = _0xea91[43];
    if (_0xbbe4xd4 == _0xea91[183]) {
        _0xbbe4xd8 = _0xea91[280] + _0xbbe4xd5 + _0xea91[281] + _0xbbe4xd7
    } else {
        if (_0xbbe4xd4 == _0xea91[182]) {
            _0xbbe4xd8 = _0xea91[282] + encodeURIComponent(_0xbbe4xd5 + _0xea91[283] + _0xbbe4xd7 + _0xea91[284] + _0xbbe4xd6 + _0xea91[285] + _0xbbe4xd5 + _0xea91[286] + _0xbbe4xd5 + _0xea91[287])
        } else {
            if (_0xbbe4xd4 == _0xea91[288]) {
                _0xbbe4xd8 = _0xea91[289] + _0xbbe4xd5
            } else {
                if (_0xbbe4xd4 == _0xea91[184]) {
                    _0xbbe4xd8 = _0xea91[290] + encodeURIComponent(_0xbbe4xd7) + _0xea91[291] + encodeURIComponent(_0xbbe4xd5)
                }
            }
        }
    }
    ;window[_0xea91[292]](_0xbbe4xd8)
}

var stageW = 1280;
var stageH = 768;
var contentW = 1024;
var contentH = 576;
var viewport = {isLandscape: true};
var landscapeSize = {w: stageW, h: stageH, cW: contentW, cH: contentH};
var portraitSize = {w: 768, h: 1024, cW: 576, cH: 900};

function initMain() {
    if (!$[_0xea91[171]][_0xea91[170]] || !isTablet) {
        $(_0xea91[294])[_0xea91[293]]()
    }
    ;initGameCanvas(stageW, stageH);
    buildGameCanvas();
    buildGameButton();
    if (typeof buildScoreBoardCanvas == _0xea91[63]) {
        buildScoreBoardCanvas()
    }
    ;goPage(_0xea91[181]);
    checkMobileOrientation();
    resizeCanvas()
}

var windowW = windowH = 0;
var scalePercent = 0;
var offset = {x: 0, y: 0, left: 0, top: 0};

function resizeGameFunc() {
    setTimeout(function () {
        $(_0xea91[296])[_0xea91[297]](_0xea91[295], checkContentWidth($(_0xea91[296])));
        $(_0xea91[296])[_0xea91[297]](_0xea91[213], checkContentHeight($(_0xea91[296])));
        windowW = window[_0xea91[298]];
        windowH = window[_0xea91[299]];
        scalePercent = windowW / contentW;
        if ((contentH * scalePercent) > windowH) {
            scalePercent = windowH / contentH
        }
        ;scalePercent = scalePercent > 1 ? 1 : scalePercent;
        if (windowW > stageW && windowH > stageH) {
            if (windowW > stageW) {
                scalePercent = windowW / stageW;
                if ((stageH * scalePercent) > windowH) {
                    scalePercent = windowH / stageH
                }
            }
        }
        ;var _0xbbe4xe5 = ((stageW) * scalePercent);
        var _0xbbe4xe6 = ((stageH) * scalePercent);
        offset[_0xea91[295]] = 0;
        offset[_0xea91[213]] = 0;
        if (_0xbbe4xe5 > windowW) {
            offset[_0xea91[295]] = -((_0xbbe4xe5) - windowW)
        } else {
            offset[_0xea91[295]] = windowW - (_0xbbe4xe5)
        }
        ;
        if (_0xbbe4xe6 > windowH) {
            offset[_0xea91[213]] = -((_0xbbe4xe6) - windowH)
        } else {
            offset[_0xea91[213]] = windowH - (_0xbbe4xe6)
        }
        ;offset[_0xea91[49]] = 0;
        offset[_0xea91[50]] = 0;
        if (offset[_0xea91[295]] < 0) {
            offset[_0xea91[49]] = Math[_0xea91[300]]((offset[_0xea91[295]] / scalePercent) / 2)
        }
        ;
        if (offset[_0xea91[213]] < 0) {
            offset[_0xea91[50]] = Math[_0xea91[300]]((offset[_0xea91[213]] / scalePercent) / 2)
        }
        ;$(_0xea91[301])[_0xea91[297]](_0xea91[25], _0xbbe4xe5);
        $(_0xea91[301])[_0xea91[297]](_0xea91[24], _0xbbe4xe6);
        $(_0xea91[301])[_0xea91[297]](_0xea91[295], (offset[_0xea91[295]] / 2));
        $(_0xea91[301])[_0xea91[297]](_0xea91[213], (offset[_0xea91[213]] / 2));
        $(window)[_0xea91[302]](0);
        resizeCanvas();
        if (typeof resizeScore == _0xea91[63]) {
            resizeScore()
        }
    }, 100)
}

var resizeTimer;

function checkMobileEvent() {
    if ($[_0xea91[171]][_0xea91[170]] || isTablet) {
        $(window)[_0xea91[306]](_0xea91[303])[_0xea91[189]](_0xea91[303], function (_0xbbe4x5b) {
            $(_0xea91[294])[_0xea91[304]]();
            $(_0xea91[305])[_0xea91[304]]();
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkMobileOrientation, 1000)
        });
        checkMobileOrientation()
    }
}

function checkMobileOrientation() {
    var _0xbbe4x80 = false;
    if (window[_0xea91[298]] > window[_0xea91[299]]) {
        _0xbbe4x80 = true
    }
    ;
    if ($[_0xea91[167]][_0xea91[66]]) {
        viewport[_0xea91[138]] = edit[_0xea91[138]]
    } else {
        viewport[_0xea91[138]] = _0xbbe4x80
    }
    ;changeViewport(viewport[_0xea91[138]]);
    resizeGameFunc();
    $(_0xea91[294])[_0xea91[293]]()
}

function toggleRotate(_0xbbe4x45) {
    if (_0xbbe4x45) {
        $(_0xea91[305])[_0xea91[307]]()
    } else {
        $(_0xea91[305])[_0xea91[308]]()
    }
    ;resizeGameFunc()
}

function initPreload() {
    toggleLoader(true);
    checkMobileEvent();
    $(window)[_0xea91[309]](function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkMobileOrientation, 1000)
    });
    resizeGameFunc();
    loader = new createjs.LoadQueue(false);
    manifest = [{src: _0xea91[310], id: _0xea91[75]}, {src: _0xea91[311], id: _0xea91[77]}, {
        src: _0xea91[312],
        id: _0xea91[78]
    }, {src: _0xea91[313], id: _0xea91[79]}, {src: _0xea91[314], id: _0xea91[80]}, {
        src: _0xea91[315],
        id: _0xea91[81]
    }, {src: _0xea91[316], id: _0xea91[87]}, {src: _0xea91[152], id: _0xea91[255]}, {
        src: _0xea91[317],
        id: _0xea91[89]
    }, {src: _0xea91[318], id: _0xea91[118]}, {src: _0xea91[319], id: _0xea91[119]}, {
        src: _0xea91[320],
        id: _0xea91[120]
    }, {src: _0xea91[321], id: _0xea91[111]}, {src: _0xea91[322], id: _0xea91[109]}, {
        src: _0xea91[323],
        id: _0xea91[110]
    }, {src: _0xea91[324], id: _0xea91[127]}, {src: _0xea91[325], id: _0xea91[128]}, {
        src: _0xea91[326],
        id: _0xea91[121]
    }, {src: _0xea91[327], id: _0xea91[122]}, {src: _0xea91[328], id: _0xea91[123]}, {
        src: _0xea91[329],
        id: _0xea91[125]
    }, {src: _0xea91[330], id: _0xea91[126]}];
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < pipe_arr[_0xea91[22]]; _0xbbe4x4d++) {
        manifest[_0xea91[52]]({src: pipe_arr[_0xbbe4x4d], id: _0xea91[255] + _0xbbe4x4d})
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < cloud_arr[_0xea91[22]]; _0xbbe4x4d++) {
        manifest[_0xea91[52]]({src: cloud_arr[_0xbbe4x4d], id: _0xea91[259] + _0xbbe4x4d})
    }
    ;
    for (var _0xbbe4x4d = 0; _0xbbe4x4d < mountain_arr[_0xea91[22]]; _0xbbe4x4d++) {
        manifest[_0xea91[52]]({src: mountain_arr[_0xbbe4x4d], id: _0xea91[260] + _0xbbe4x4d})
    }
    ;
    if (typeof addScoreboardAssets == _0xea91[63]) {
        addScoreboardAssets()
    }
    ;soundOn = true;
    if ($[_0xea91[171]][_0xea91[170]] || isTablet) {
        if (!enableMobileSound) {
            soundOn = false
        }
    } else {
        if (!enableDesktopSound) {
            soundOn = false
        }
    }
    ;
    if (soundOn) {
        manifest[_0xea91[52]]({src: _0xea91[331], id: _0xea91[180]});
        manifest[_0xea91[52]]({src: _0xea91[332], id: _0xea91[196]});
        manifest[_0xea91[52]]({src: _0xea91[333], id: _0xea91[253]});
        manifest[_0xea91[52]]({src: _0xea91[334], id: _0xea91[250]});
        manifest[_0xea91[52]]({src: _0xea91[335], id: _0xea91[247]});
        manifest[_0xea91[52]]({src: _0xea91[336], id: _0xea91[240]});
        manifest[_0xea91[52]]({src: _0xea91[337], id: _0xea91[210]});
        manifest[_0xea91[52]]({src: _0xea91[338], id: _0xea91[249]});
        createjs[_0xea91[54]][_0xea91[339]] = [_0xea91[340]];
        loader[_0xea91[341]](createjs.Sound)
    }
    ;loader[_0xea91[59]](_0xea91[57], handleComplete);
    loader[_0xea91[59]](_0xea91[342], fileComplete);
    loader[_0xea91[59]](_0xea91[6], handleFileError);
    loader[_0xea91[189]](_0xea91[343], handleProgress, this);
    loader[_0xea91[344]](manifest)
}

function fileComplete(_0xbbe4x98) {
    var _0xbbe4xed = _0xbbe4x98[_0xea91[345]]
}

function handleFileError(_0xbbe4x98) {
    console[_0xea91[12]](_0xea91[346], _0xbbe4x98)
}

function handleProgress() {
    $(_0xea91[350])[_0xea91[349]](Math[_0xea91[347]](loader[_0xea91[343]] / 1 * 100) + _0xea91[348])
}

function handleComplete() {
    toggleLoader(false);
    initMain()
}

function toggleLoader(_0xbbe4x45) {
    if (_0xbbe4x45) {
        $(_0xea91[351])[_0xea91[293]]()
    } else {
        $(_0xea91[351])[_0xea91[304]]()
    }
}

var stageWidth, stageHeight = 0;
var isLoaded = false;
$(function () {
    var _0xbbe4xf3 = function () {
        try {
            if (createjs[_0xea91[354]][_0xea91[353]][_0xea91[352]] === _0xea91[355]) {
                createjs[_0xea91[354]][_0xea91[353]][_0xea91[356]]();
                window[_0xea91[148]](_0xea91[179], _0xbbe4xf3)
            }
        } catch (e) {
            console[_0xea91[6]](_0xea91[357]);
            console[_0xea91[6]](e)
        }
    };
    window[_0xea91[59]](_0xea91[179], _0xbbe4xf3);
    if (window[_0xea91[172]][_0xea91[358]][_0xea91[37]](0, 4) === _0xea91[359]) {
        alert(_0xea91[360])
    }
    ;$(window)[_0xea91[309]](function () {
        resizeLoaderFunc()
    });
    resizeLoaderFunc();
    checkBrowser()
});

function resizeLoaderFunc() {
    stageWidth = $(window)[_0xea91[25]]();
    stageHeight = $(window)[_0xea91[24]]();
    $(_0xea91[351])[_0xea91[297]](_0xea91[295], checkContentWidth($(_0xea91[351])));
    $(_0xea91[351])[_0xea91[297]](_0xea91[213], checkContentHeight($(_0xea91[351])))
}

var browserSupport = false;
var isTablet;

function checkBrowser() {
    isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i[_0xea91[48]](navigator[_0xea91[26]][_0xea91[361]]()));
    deviceVer = getDeviceVer();
    var _0xbbe4xf8 = document[_0xea91[362]](_0xea91[301]);
    if (_0xbbe4xf8[_0xea91[363]]) {
        browserSupport = true
    }
    ;
    if (browserSupport) {
        if (!isLoaded) {
            isLoaded = true;
            initPreload()
        }
    } else {
        $(_0xea91[364])[_0xea91[293]]()
    }
}
