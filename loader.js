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

    const requestUrl =
        WORKER_URL +
        '/?key=' +
        encodeURIComponent(KEY) +
        '&deviceId=' +
        encodeURIComponent(deviceId);

    console.log('WORKER REQUEST:', requestUrl);

    try {

        const response = await fetch(requestUrl);

        console.log('WORKER STATUS:', response.status);

        const code = await response.text();

        console.log('WORKER RESPONSE START:', code.slice(0, 200));

        if (!response.ok) {
            console.log('WORKER ERROR:', code);
            return;
        }

        eval(code);

        console.log('PRIVATE SCRIPT EXECUTED');

    } catch (e) {

        console.log('WORKER FETCH ERROR:', e);
    }

})();