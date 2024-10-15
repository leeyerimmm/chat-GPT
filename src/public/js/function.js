const $frmMsg = document.querySelector('form');
const $msg = document.getElementById('msg');
const $dialog = document.querySelector('.dialog');

//메세지 출력함수
const addMssageFn = (msg, me) => {
  const $ul = $dialog.firstElementChild;

  const $li = document.createElement('li');
  me && ($li.style.textAlign = 'right');

  const $span = document.createElement('span');
  me && ($span.style.backgroundColor = '#34c759');
  me && ($span.style.color = '#fff');

  $span.textContent = msg;
  $li.appendChild($span);
  $ul.appendChild($li);
  
  $dialog.scrollTo(0, $ul.scrollHeight);
};

// 서버로 메세지를 전송하는 함수
const sendMessageFn = async(message) => {
 const response = await fetch("/chat", {
  method:'post',
  headers: {'content-type':'application/json'},
  body: JSON.stringify({'message':message})
 });

 const data = await response.json();
 console.log('data =', data);

 addMssageFn(data.response, false);
};

$frmMsg.addEventListener('submit', (evt)=>{
  evt.preventDefault();

  const message = $msg.value.trim();
  // alert(message);
  
  addMssageFn(message, true);
  sendMessageFn(message);

  $msg.value = '';
  $msg.focus();
});


function getTime(){
  const nowTime = new Date();
  let hours = nowTime.getHours();
  let minutes = nowTime.getMinutes();

  if (hours < 10) {
    hours = '0' + hours;
}
if (minutes < 10) {
    minutes = '0' + minutes;
}
const time = `${hours}:${minutes}`;
document.getElementById('updateTime').textContent = time;
}

function init(){
  getTime();
  setInterval(getTime,1000);
}



init();

