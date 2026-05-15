(function () {
    'use strict';

    alert('LOADER OK');

    const LICENSES = {
        'FRIEND-001': ''
    };

    const STORAGE_KEY = 'massmo_saved_key';

    function getDeviceId() {
        return btoa([
            navigator.userAgent,
            screen.width,
            screen.height,
            screen.colorDepth,
            navigator.language,
            Intl.DateTimeFormat().resolvedOptions().timeZone
        ].join('|'));
    }

    function startBot() {
        console.log('SCRIPT STARTED');

        function clickElement(el, name) {
            if (!el) return false;

            try {
                el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                el.focus();

                [
                    'mouseenter',
                    'mouseover',
                    'mousedown',
                    'mouseup',
                    'click'
                ].forEach(type => {
                    el.dispatchEvent(new MouseEvent(type, {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    }));
                });

                el.click();

                console.log('Нажато:', name);

                return true;

            } catch (e) {

                console.log('Ошибка:', e);

                return false;
            }
        }

        function findButton(text) {
            const buttons = document.querySelectorAll('button');

            for (const btn of buttons) {
                const btnText = btn.innerText || '';

                if (btnText.includes(text)) {
                    return btn;
                }
            }

            return null;
        }

        function processPage() {
            const payoutBtn = findButton('Получить выплату');

            if (payoutBtn) {
                clickElement(payoutBtn, 'Получить выплату');
            }

            const chooseBtn = findButton('Выбрать');

            if (chooseBtn) {
                clickElement(chooseBtn, 'Выбрать');
            }

            const allButtons = document.querySelectorAll('button');

            for (const btn of allButtons) {
                const text = btn.innerText || '';

                if (text.includes('Билайн')) {
                    clickElement(btn, 'Билайн');
                    break;
                }
            }

            const confirmBtn = findButton('Подтвердить заявку');

            if (confirmBtn) {
                clickElement(confirmBtn, 'Подтвердить заявку');
            }
        }

        setInterval(processPage, 1500);
    }

    function validateKey(key) {
        const deviceId = getDeviceId();

        if (!(key in LICENSES)) {
            alert('Неверный ключ');
            return false;
        }

        if (!LICENSES[key]) {
            alert(
                'Этот ключ ещё не привязан.\n\n' +
                'Отправь владельцу этот DEVICE ID:\n\n' +
                deviceId
            );

            console.log('DEVICE ID:', deviceId);

            return false;
        }

        if (LICENSES[key] !== deviceId) {
            alert('Этот ключ привязан к другому ПК');
            console.log('CURRENT DEVICE ID:', deviceId);
            return false;
        }

        localStorage.setItem(STORAGE_KEY, key);

        alert('Доступ разрешён');

        console.log('ACCESS GRANTED');

        return true;
    }

    function showKeyBox() {
        if (!document.body) {
            setTimeout(showKeyBox, 500);
            return;
        }

        const box = document.createElement('div');

        box.style =
            'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
            'z-index:999999999;background:#111;color:#fff;padding:20px;' +
            'border-radius:12px;font-family:Arial;box-shadow:0 0 20px #000;';

        box.innerHTML =
            '<div style="font-size:18px;margin-bottom:10px;">Введите ключ доступа</div>' +


'<input id="keyBox" placeholder="FRIEND-001" style="padding:10px;width:220px;">' +
            '<button id="keyBtn" style="padding:10px;margin-left:8px;">OK</button>';

        document.body.appendChild(box);

        document.getElementById('keyBtn').onclick = function () {
            const key = document.getElementById('keyBox').value.trim();

            if (!validateKey(key)) return;

            box.remove();

            startBot();
        };
    }

    const savedKey = localStorage.getItem(STORAGE_KEY);

    if (savedKey) {

        if (validateKey(savedKey)) {

            startBot();

        } else {

            localStorage.removeItem(STORAGE_KEY);

            showKeyBox();
        }

    } else {

        showKeyBox();
    }

})();
