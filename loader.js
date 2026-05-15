(function () {
    'use strict';

    alert('LOADER OK');

    const box = document.createElement('div');
    box.style = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999999;background:#111;color:#fff;padding:20px;border-radius:12px;font-family:Arial;';
    box.innerHTML = '<div>Введите ключ доступа</div><input id="keyBox" placeholder="USER-111" style="padding:10px;margin-top:10px;"><button id="keyBtn" style="padding:10px;margin-left:8px;">OK</button>';

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
    };

})();
