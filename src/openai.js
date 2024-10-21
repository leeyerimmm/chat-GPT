const dotenv = require('dotenv');
dotenv.config();

// dotenv 모듈을 이용해 중요한 정보를 분리해서 관리
const apiKey = process.env.OPEN_API_KEY
const url =  process.env.REQUEST_URL

  // console.log(`APIKEY = ${apiKey}`);
  // console.log(`url = ${url}`);



async function callChatGPT(prompt){
  console.log(`전달받은 메세지는 ${prompt}`);

  const option = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",  // 사용할 AI 모델
        messages: [{
            role: "user", // 메시지생성 주체 user | assistant
            content: prompt // 입력메시지
        }, ],
        temperature: 0.8, // 출력 다양성
        max_tokens: 1024, // 응답메시지 최대토큰(단어)수
        top_p: 1.0, // 토큰 샘플링 확률
        frequency_penalty: 0.5, // 잘 안쓰는 단어 억제
        presence_penalty: 0.5, // 동일한 단어나 구문 반복 억제
        stop: ["Human"], // 생성된 텍스트에서 종료 구문을 설정
    })
  };

  try{
  //GPT에게 비동기요청
  const gptAnswer = await fetch(url, option)
  const data = await gptAnswer.json();

  const response = data.choices[0].message.content;

  console.log('response =', response);
  return response;
  
}catch(err){
  console.error('오류메세지 =', err);
  return '오류가 발생하였습니다';
  }


}//callChatGPT

module.exports = callChatGPT;
