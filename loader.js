const SUPABASE_URL = 'https://tuozemcmikaxdxxdorzk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b3plbWNtaWtheGR4eGRvcnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NzY2NzAsImV4cCI6MjA5NDU1MjY3MH0.MY04aQQIxrVzYBGLVs0vTanJ6sIr3KPRljYqhR_yxg8';

const API_URL = SUPABASE_URL + '/rest/v1/licenses';

async function loadKeys() {
  const res = await fetch(API_URL + '?select=*', {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY
    }
  });

  const data = await res.json();
  const table = document.getElementById('keysTable');
  table.innerHTML = '';

  data.forEach(function(item) {
    const row = document.createElement('tr');

    row.innerHTML =
      '<td>' + item.license_key + '</td>' +
      '<td>' + (item.device_id || 'не привязан') + '</td>' +
      '<td>' + item.status + '</td>' +
      '<td>' +
      '<button onclick="banKey(\'' + item.license_key + '\')">Бан</button> ' +
      '<button onclick="unbanKey(\'' + item.license_key + '\')">Разбан</button> ' +
      '<button onclick="resetDevice(\'' + item.license_key + '\')">Сбросить ПК</button>' +
      '</td>';

    table.appendChild(row);
  });
}

async function addKey() {
  const key = document.getElementById('keyInput').value.trim();

  if (!key) {
    alert('Введите ключ');
    return;
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      license_key: key,
      device_id: null,
      status: 'active'
    })
  });

  document.getElementById('keyInput').value = '';
  loadKeys();
}

async function updateKey(key, data) {
  await fetch(API_URL + '?license_key=eq.' + encodeURIComponent(key), {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  loadKeys();
}

function banKey(key) {
  updateKey(key, { status: 'banned' });
}

function unbanKey(key) {
  updateKey(key, { status: 'active' });
}

function resetDevice(key) {
  updateKey(key, { device_id: null });
}

loadKeys();

(function () {
'use strict';

const SUPABASE_URL='https://tuozemcmikaxdxxdorzk.supabase.co';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b3plbWNtaWtheGR4eGRvcnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NzY2NzAsImV4cCI6MjA5NDU1MjY3MH0.MY04aQQIxrVzYBGLVs0vTanJ6sIr3KPRljYqhR_yxg8';
const STORAGE_KEY='massmo_saved_key';

function askKey(){
let saved=localStorage.getItem(STORAGE_KEY);
if(saved)return saved;
let key=prompt('Введите ключ доступа');
if(key)localStorage.setItem(STORAGE_KEY,key);
return key;
}

async function checkKey(key){
const url=SUPABASE_URL+'/rest/v1/licenses?license_key=eq.'+encodeURIComponent(key)+'&select=*';

const res=await fetch(url,{
headers:{
apikey:SUPABASE_ANON_KEY,
Authorization:'Bearer '+SUPABASE_ANON_KEY
}
});

const data=await res.json();

if(!data.length){
alert('Ключ не найден');
localStorage.removeItem(STORAGE_KEY);
return false;
}

const license=data[0];

if(license.status!=='active'){
alert('Ключ отключён');
localStorage.removeItem(STORAGE_KEY);
return false;
}

console.log('ACCESS GRANTED:',key);
return true;
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
el.dispatchEvent(new MouseEvent(type,{
bubbles:true,
cancelable:true,
view:window
}));
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

(async function(){
const key=askKey();

if(!key){
alert('Ключ не введён');
return;
}

let ok=false;

try{
ok=await checkKey(key);
}catch(e){
console.log('SUPABASE CHECK ERROR:',e);
alert('Ошибка подключения к панели. Попробуй обновить страницу.');
return;
}

if(ok)startBot();

if(ok)startBot();
})();

})();
