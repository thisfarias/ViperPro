    var SpilData = {
        id: '576742227280298086',
        pauseGame: function() {
            if (typeof GEMIOLI !== 'undefined' && GEMIOLI.Application)
                GEMIOLI.Application.dispatchEvent({ type: 'blur' });
        },
        resumeGame: function() {
            if (typeof GEMIOLI !== 'undefined' && GEMIOLI.Application)
                GEMIOLI.Application.dispatchEvent({ type: 'focus' });
        },
        onLoad: function(callback) {
            if (SpilData.apiInstance)
                callback();
            else
                this.callbacks.push(callback);
        },
        callbacks: []
    };
    window.addEventListener('scroll', function() {
        if (document.activeElement === document.body && window.scrollY > 0) {
            document.body.scrollTop = 0;
        }
    }, true);