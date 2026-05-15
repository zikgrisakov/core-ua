(function () {
    alert('LOADER JS EXECUTED');

    const box = document.createElement('div');
    box.style = 'position:fixed;top:20px;left:20px;z-index:999999;background:red;color:white;padding:20px;font-size:20px;';
    box.innerText = 'loader.js работает';
    document.body.appendChild(box);
})();