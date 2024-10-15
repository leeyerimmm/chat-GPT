const path = require('path');
const callChatGPT = require('./src/openai');
const express = require('express');
const { request } = require('http');
const app = express();

app.set('PORT', process.env.PORT || 7000);


//ejs 설정
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'src', 'views'));

//정적파일설정
const publicPath = path.resolve(__dirname, 'src', 'public');
app.use(express.static(publicPath));

//post 방식으로 보내온 데이터를 req.body에 넣어준다.
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//라우팅설정
app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/', (req,res)=>{
  res.redirect('/');
});

//클라이언트에서 보내온 메세지 수신
app.post('/chat', async(req,res)=>{
  const message = req.body.message;
  console.log(`message = ${message}`);
  const response = await callChatGPT(message);


  if(response){
    res.json({response});
  }else{
    res.status(500).json({'error' : 'fail ChatGPT API'});
  }
})

app.listen(app.get('PORT'), (req, res)=>{
  console.log(`웹서버가 ${app.get('PORT')}번 포트에서 접속 대기중....`);
})