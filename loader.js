(function () {
    'use strict';

    console.log('PRIVATE GITHUB MASSMO STARTED');

    const box = document.createElement('div');
    box.style = `
        position: fixed;
        z-index: 999999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #111;
        color: white;
        padding: 20px;
        border-radius: 12px;
        font-family: Arial;
        box-shadow: 0 0 20px #000;
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

        let chooseClicked = false;
        let beelineSelected = false;
        let confirmed = false;

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

                console.log('Ошибка клика:', name, e);

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

                chooseClicked = false;
                beelineSelected = false;
                confirmed = false;
            }

            if (!chooseClicked) {

                const chooseBtn = findButton('Выбрать');

                if (chooseBtn) {

                    clickElement(chooseBtn, 'Выбрать');

                    chooseClicked = true;
                }
            }

            if (chooseClicked && !beelineSelected) {

                const buttons = document.querySelectorAll('button');

                for (const btn of buttons) {

                    const text = btn.innerText || '';

                    if (text.includes('Билайн')) {

                        clickElement(btn, 'Билайн');

                        beelineSelected = true;

                        break;
                    }
                }
            }

            if (beelineSelected && !confirmed) {

                const confirmBtn = findButton('Подтвердить заявку');

                if (confirmBtn) {

                    clickElement(confirmBtn, 'Подтвердить заявку');

                    confirmed = true;
                }
            }
        }

        setInterval(processPage, 1500);
    };

})();
 