(function () {
'use strict';

const LICENSES = {
'FRIEND-001':'TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NDsgcnY6MTUwLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvMTUwLjB8MTkyMHwxMDgwfDI0fHJ1LVJVfEV1cm9wZS9Nb3Njb3c=',
'FRIEND-002':'TW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTAuMTU7IHJ2OjE1MC4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzE1MC4wfDE3MTB8MTEwN3wzMHxydS1SVXxFdXJvcGUvTW9zY293','FRIEND-003':'','FRIEND-004':'','FRIEND-005':'',
'FRIEND-006':'','FRIEND-007':'','FRIEND-008':'','FRIEND-009':'',
'FRIEND-010':'','FRIEND-011':'','FRIEND-012':'','FRIEND-013':'',
'FRIEND-014':'','FRIEND-015':'','FRIEND-016':'','FRIEND-017':'',
'FRIEND-018':'','FRIEND-019':'','FRIEND-020':'','FRIEND-021':'',
'FRIEND-022':'','FRIEND-023':'','FRIEND-024':'','FRIEND-025':'',
'FRIEND-026':'','FRIEND-027':'','FRIEND-028':'','FRIEND-029':'',
'FRIEND-030':'','FRIEND-031':'','FRIEND-032':'','FRIEND-033':'',
'FRIEND-034':'','FRIEND-035':'','FRIEND-036':'','FRIEND-037':'',
'FRIEND-038':'','FRIEND-039':'','FRIEND-040':''
};

const STORAGE_KEY='massmo_saved_key';

function getDeviceId(){
return btoa([
navigator.userAgent,
screen.width,
screen.height,
screen.colorDepth,
navigator.language,
Intl.DateTimeFormat().resolvedOptions().timeZone
].join('|'));
}

function startBot(){
console.log('SCRIPT STARTED');

let confirmed=false;
let chosen=false;
let beelineSelected=false;

function clickElement(el,name){
if(!el)return false;
try{
el.scrollIntoView({behavior:'smooth',block:'center'});
el.focus();
['mouseenter','mouseover','mousedown','mouseup','click'].forEach(function(type){
el.dispatchEvent(new MouseEvent(type,{bubbles:true,cancelable:true,view:window}));
});
el.click();
console.log('Нажато:',name);
return true;
}catch(e){
console.log('Ошибка:',e);
return false;
}
}

function findButton(text){
const buttons=document.querySelectorAll('button');
 for(const btn of buttons){
  const btnText=btn.innerText||'';
  if(btnText.includes(text))return btn;
 }
return null;
}

function checkErrors(){
const pageText=document.body ? document.body.innerText || '' : '';
if(pageText.includes('"status":"FETCH_ERROR"')||pageText.includes('FETCH_ERROR')||pageText.includes('NetworkError when attempting to fetch resource')){
console.log('FETCH ERROR DETECTED -> RELOAD');
setTimeout(function(){location.reload();},2000);
}
}
setInterval(checkErrors,3000);

function processPage(){
const payoutBtn=findButton('Получить выплату');
if(payoutBtn){
clickElement(payoutBtn,'Получить выплату');
confirmed=false;
chosen=false;
beelineSelected=false;
}

const chooseBtn=findButton('Выбрать');
if(chooseBtn&&!chosen){
clickElement(chooseBtn,'Выбрать');
chosen=true;
}

if(chosen&&!beelineSelected){
const buttons=document.querySelectorAll('button');
for(const btn of buttons){
const text=btn.innerText||'';
if(text.includes('Билайн')){
clickElement(btn,'Билайн');
beelineSelected=true;
break;
}
}
}

const confirmBtn=findButton('Подтвердить заявку');
if(confirmBtn&&beelineSelected&&!confirmed){
clickElement(confirmBtn,'Подтвердить заявку');
confirmed=true;
}
}

setInterval(processPage,1500);
}

function validateKey(key){
const deviceId=getDeviceId();

if(!(key in LICENSES)){
alert('Неверный ключ');
return false;
}

if(!LICENSES[key]){
alert('Ключ ещё не привязан.\n\nОтправь владельцу этот DEVICE ID:\n\n'+deviceId);
console.log('DEVICE ID:',deviceId);
return false;
}

if(LICENSES[key]!==deviceId){
alert('Этот ключ привязан к другому ПК');
console.log('CURRENT DEVICE ID:',deviceId);
return false;
}

localStorage.setItem(STORAGE_KEY,key);
console.log('ACCESS GRANTED');
return true;
}

function showKeyBox(){
if(!document.body){
setTimeout(showKeyBox,500);
return;
}

const box=document.createElement('div');
box.style='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999999999;background:#111;color:#fff;padding:20px;border-radius:12px;font-family:Arial;box-shadow:0 0 20px #000;';
box.innerHTML='<div style="font-size:18px;margin-bottom:10px;">Введите ключ доступа</div><input id="keyBox" placeholder="FRIEND-001" style="padding:10px;width:220px;"><button id="keyBtn" style="padding:10px;margin-left:8px;">OK</button>';
document.body.appendChild(box);

document.getElementById('keyBtn').onclick=function(){
const key=document.

getElementById('keyBox').value.trim();
if(!validateKey(key))return;
box.remove();
startBot();
};
}

const savedKey=localStorage.getItem(STORAGE_KEY);

if(savedKey){
if(validateKey(savedKey)){
startBot();
}else{
localStorage.removeItem(STORAGE_KEY);
showKeyBox();
}
}else{
showKeyBox();
}

})();
