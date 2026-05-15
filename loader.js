(async function () {

    'use strict';

    console.log('GITHUB LOADER STARTED');

    const WORKER_URL =
        'https://throbbing-heart-f9a8.zikgrisakov125.workers.dev';

    const KEY = 'USER-111';

    const deviceId = btoa([
        navigator.userAgent,
        screen.width,
        screen.height,
        screen.colorDepth,
        navigator.language,
        Intl.DateTimeFormat().resolvedOptions().timeZone
    ].join('|'));

    try {

        const response = await fetch(
            WORKER_URL +
            '/?key=' +
            encodeURIComponent(KEY) +
            '&deviceId=' +
            encodeURIComponent(deviceId)
        );

        const code = await response.text();

        if (!response.ok) {

            console.log('WORKER ERROR:', code);

            return;
        }

        eval(code);

        console.log('PRIVATE SCRIPT EXECUTED');

    } catch (e) {

        console.log('GITHUB LOADER ERROR:', e);

    }

})();