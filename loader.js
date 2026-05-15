(function () {
    'use strict';

    const key = prompt('Введите ключ доступа');

    if (key !== 'USER-111') {
        alert('Неверный ключ');
        return;
    }

    console.log('ACCESS GRANTED');
    console.log('MASSMO BOT STARTED');

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
                return (
                    el.closest('button') ||
                    el.closest('[role="button"]') ||
                    el.closest('a') ||
                    el
                );
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

})();
