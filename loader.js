(function () {
    'use strict';

    console.log('PRIVATE GITHUB MASSMO STARTED');

    const box = document.createElement('div');
    box.style = `
        position: fixed; z-index: 999999; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: #111; color: white; padding: 20px;
        border-radius: 12px; font-family: Arial; box-shadow: 0 0 20px #000;
    `;

    box.innerHTML = `
        <div style="font-size:18px;margin-bottom:10px;">Введите ключ доступа</div>
        <input id="massmoKeyInput" style="padding:10px;width:220px;" placeholder="USER-111">
        <button id="massmoKeyBtn" style="padding:10px;margin-left:8px;">OK</button>
    `;

    document.body.appendChild(box);

    document.getElementById('massmoKeyBtn').onclick = function () {
        const key = document.getElementById('massmoKeyInput').value.trim();

        if (key !== 'USER-111') {
            alert('Неверный ключ');
            return;
        }

        box.remove();
        console.log('ACCESS GRANTED');
        startBot();
    };

    function startBot() {
        let chooseClicked = false;
        let beelineSelected = false;
        let confirmed = false;

        function clickElement(el, name) {
            if (!el) return false;

            try {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.focus();

                ['mouseenter', 'mouseover', 'mousedown', 'mouseup', 'click'].forEach(type => {
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
                console.log('Ошибка клика:', name, e);
                return false;
            }
        }

        function getText(el) {
            return (el.innerText  el.textContent  '').trim();
        }

        function findClickableByText(text) {
            const elements = document.querySelectorAll('button, div, span, a, [role="button"]');

            for (const el of elements) {
                const elText = getText(el);

                if (elText.includes(text)) {
                    const clickable =
                        el.closest('button') ||
                        el.closest('[role="button"]') ||
                        el.closest('a') ||
                        el;

                    return clickable;
                }
            }

            return null;
        }

        function processPage() {
            console.log('BOT CHECK');

            const payoutBtn = findClickableByText('Получить выплату');

            if (payoutBtn) {
                clickElement(payoutBtn, 'Получить выплату');

                chooseClicked = false;
                beelineSelected = false;
                confirmed = false;
            }

            if (!chooseClicked) {
                const chooseBtn = findClickableByText('Выбрать');

                if (chooseBtn) {
                    clickElement(chooseBtn, 'Выбрать');
                    chooseClicked = true;
                }
            }

            if (chooseClicked && !beelineSelected) {
                const beelineBtn = findClickableByText('Билайн');

                if (beelineBtn) {
                    clickElement(beelineBtn, 'Билайн');
                    beelineSelected = true;
                }
            }

            if (beelineSelected && !confirmed) {
                const confirmBtn = findClickableByText('Подтвердить заявку');

                if (confirmBtn) {
                    clickElement(confirmBtn, 'Подтвердить заявку');
                    confirmed = true;
                }
            }
        }

        processPage();
        setInterval(processPage, 1500);
    }
})();