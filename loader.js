(function () {
    'use strict';

    alert('LOADER OK');

    function startBot() {
        console.log('BOT STARTED');

        function clickByText(text) {
            const els = document.querySelectorAll('button, div, span, a, [role="button"]');

            for (const el of els) {
                const t = (el.innerText  el.textContent  '').trim();

                if (t.includes(text)) {
                    el.click();
                    console.log('BOT CHECK:', text);
                    return true;
                }
            }

            return false;
        }

        setInterval(function () {
            clickByText('Получить выплату') ||
            clickByText('Выбрать') ||
            clickByText('Билайн') ||
            clickByText('Подтвердить заявку');
        }, 1500);
    }

    const key = prompt('Введите ключ доступа');

    if (key !== 'USER-111') {
        alert('Неверный ключ');
        return;
    }

    alert('Ключ принят');
    console.log('ACCESS GRANTED');

    startBot();

})();
