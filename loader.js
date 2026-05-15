(function () {
    'use strict';

    alert('LOADER OK');

    const key = prompt('Введите ключ доступа');

    if (key !== 'USER-111') {
        alert('Неверный ключ');
        return;
    }

    alert('Ключ принят');
    console.log('ACCESS GRANTED');

})();
