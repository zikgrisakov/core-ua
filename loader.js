(function () {

    'use strict';

    alert('LOADER OK');

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
            '<input id="keyBox" placeholder="USER-111" style="padding:10px;width:220px;">' +
            '<button id="keyBtn" style="padding:10px;margin-left:8px;">OK</button>';

        document.body.appendChild(box);

        document.getElementById('keyBtn').onclick = function () {

            const key = document.getElementById('keyBox').value.trim();

            if (key !== 'USER-111') {

                alert('Неверный ключ');

                return;
            }

            alert('Ключ принят');

            console.log('ACCESS GRANTED');

            box.remove();

            startBot();
        };
    }

    function startBot() {

        console.log('SCRIPT STARTED');

        // =====================================
        // УНИВЕРСАЛЬНЫЙ КЛИК
        // =====================================

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

        // =====================================
        // ПОИСК КНОПКИ ПО ТЕКСТУ
        // =====================================

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

        // =====================================
        // ОСНОВНАЯ ЛОГИКА
        // =====================================

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

        // =====================================
        // АВТОЗАПУСК
        // =====================================

        setInterval(processPage, 1500);
    }

    showKeyBox();

})();
