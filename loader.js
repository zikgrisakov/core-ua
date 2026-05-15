(function () {
    'use strict';

    const key = prompt('Введите ключ доступа');

    if (key !== 'USER-111') {
        alert('Неверный ключ');
        return;
    }

    alert('Ключ принят, бот готов к запуску');
    console.log('ACCESS GRANTED');
})();
