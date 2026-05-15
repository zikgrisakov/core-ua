(function () {
    'use strict';

    alert('LOADER OK');

    function showKeyBox() {
        if (!document.body) {
            setTimeout(showKeyBox, 500);
            return;
        }

        const box = document.createElement('div');
        box.style = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999999999;background:#111;color:#fff;padding:20px;border-radius:12px;font-family:Arial;';

        box.innerHTML =
            '<div>Введите ключ доступа</div>' +
            '<input id="keyBox" placeholder="USER-111">' +
            '<button id="keyBtn">OK</button>';

        document.body.appendChild(box);

        document.getElementById('keyBtn').onclick = function () {
            if (document.getElementById('keyBox').value.trim() !== 'USER-111') {
                alert('Неверный ключ');
                return;
            }

            alert('Ключ принят');
            console.log('ACCESS GRANTED');
            box.remove();
        };
    }

    showKeyBox();
})();
