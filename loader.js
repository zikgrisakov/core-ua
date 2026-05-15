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

        console.log('KEY ENTERED:', key);

        if (key !== 'USER-111') {
            alert('Неверный ключ');
            return;
        }

        alert('Ключ принят. Сейчас добавим запуск бота.');
        box.remove();
    };
})();

 