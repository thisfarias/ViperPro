((w) => {
    w.addEventListener('beforeunload', (e) => {
       w.parent.location.href = '/';
    })

    let a = document.documentElement;
    let c;

    const noop = () => {}

    a.requestFullscreen
        ? c = a.requestFullscreen()
        : a.mozRequestFullScreen
            ? c = a.mozRequestFullScreen()
            : a.msRequestFullscreen
                ? c = a.msRequestFullscreen()
                : a.webkitRequestFullScreen && (c = "undefined" !== typeof Element.ALLOW_KEYBOARD_INPUT
                ? a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
                : a.webkitRequestFullScreen());
    c instanceof Promise && c.catch(noop)

    /**
     *
     *     <meta name="apple-mobile-web-app-capable" content="yes">
     *     <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
     *     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
     */
    const makeMeta = (name, content) => {
        const meta = document.createElement('meta')
        meta.name = name
        meta.content = content
        return meta
    }

    [
        [
            'apple-mobile-web-app-capable',
            'yes'
        ],
        [
            'apple-mobile-web-app-status-bar-style',
            'black-translucent'
        ],
        [
            'viewport',
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        ]
    ].forEach(([name, content]) => {
        document.head.appendChild(makeMeta(name, content))
    })
})(window)
