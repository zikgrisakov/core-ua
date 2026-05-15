(function () {
    'use strict';

    console.log('GITHUB MASSMO SCRIPT STARTED');

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
})();