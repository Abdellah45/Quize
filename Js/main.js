let Count = document.querySelector(".Count_Ques span");
let bullets = document.querySelector(".bulets .spans");
let quizeArea = document.querySelector(".Quize_area");
let AnswersArea = document.querySelector(".answers_area");
let subBtn = document.querySelector(".submit_btn");
let DownContai = document.querySelector(".countDown");
let ctg = document.querySelector(".Category span");

let url = "https://quizapi.io/api/v1/questions?apiKey=txZRly5bESy74G9YANAjvhzTLcnQUtX6zr6zv6k5&difficulty=Easy&limit=10";

let anseCar = ["a","b","c","d"];

let currentNum = 0;
let RightAnswers = 0;
let CountDownTimer;

function getQuestions () {
 fetch(url).then(res => res.json())
   .then(RespOb => {
      
      
    let myQuestions = RespOb;
    
    let quesCount = myQuestions.length;
    
    createBul(quesCount);
    
    getData(myQuestions[currentNum],quesCount);
    
    CountDown(60,quesCount);
    
    ctg.innerHTML = myQuestions[currentNum].category;
    
   subBtn.onclick = () => {
      
      let rightCont = myQuestions[currentNum].correct_answers;
      let anseTrue = Object.keys(rightCont);
      let right;
      
      ctg.innerHTML = myQuestions[currentNum].category;
      
      for (let i = 0; i < anseTrue.length; i++) {
         
         if (rightCont[anseTrue[i]] === "true") {
            
            right = anseTrue[i].substring(0,8);
         }
         
      }
      
      
      
      let rightQue = myQuestions[currentNum].answers[right];
      
     
      currentNum++;
      
      chackAnswer(rightQue,quesCount);
      
      quizeArea.innerHTML = "";
      AnswersArea.innerHTML = "";
      
      getData(myQuestions[currentNum],quesCount);
      
      handel();
     
     clearInterval(CountDownTimer);
     
      CountDown(100,quesCount);
      
      if (currentNum === quesCount) {
         showResult(quesCount);
      }
   }
    
   });
};

getQuestions();

function createBul (num) {
   Count.innerHTML = num;
   
   for (let i = 0; i < num; i++) {
    
    let bull = document.createElement("span");
    
    if (i === 0) {
       bull.className = "on";
    }
    
    bullets.appendChild(bull);
    
   }
}

function getData(obj,Cou) {
   if (currentNum < Cou){
      let myQue = document.createElement("h3");
      let myQueText = document.createTextNode(obj.question);
   
   myQue.appendChild(myQueText);
   quizeArea.appendChild(myQue);
   
   for (let i = 0; i < 4; i++) {
      
      let mainDiv = document.createElement("div");
      
      mainDiv.className = "answer";
      
      let radio = document.createElement("input");
      
      radio.type = "radio";
      radio.name = "questions";
      radio.id = `answer_${anseCar[i]}`;
      radio.dataset.answer = obj.answers[`answer_${anseCar[i]}`];
      
      if (i === 0) {
         radio.checked = true;
      }
      
      let label = document.createElement("label");
      
      label.htmlFor = `answer_${anseCar[i]}`;
      
      let labelText = document.createTextNode(obj.answers[`answer_${anseCar[i]}`]);
      
      label.appendChild(labelText);
      
      mainDiv.appendChild(radio);
      mainDiv.appendChild(label);
      
      AnswersArea.appendChild(mainDiv);
   }
  
}
}

function chackAnswer(rAnswer,count){
   
   let answers = document.getElementsByName("questions");
   let choosenAnswer;
   
   for (let i = 0; i < answers.length; i++) {
      
      if (answers[i].checked) {
         choosenAnswer = answers[i].dataset.answer;
      }
   }
   if (rAnswer === choosenAnswer) {
      RightAnswers++;
   }
}

function handel() {
   let mySpans = document.querySelectorAll(".spans span");
   let arrSpans = Array.from(mySpans);
   
   arrSpans.forEach((span,index) => {
      
      if (currentNum === index) {
         span.classList.add("on");
      }
   })
}

function showResult(count) {
   let theResult;
      quizeArea.remove();
      AnswersArea.remove();
      subBtn.remove();
      document.querySelector(".bulets").remove();
      
      if (RightAnswers > (count / 2) && RightAnswers < count){
         
         theResult = `<span class="good">Good</span> ${RightAnswers} from ${count}`;
         
      }else if(RightAnswers === count){
        
          theResult = `<span class="perfect">perfect</span>, All Answers is Right`;
          
      }else{
          theResult = `<span class="bad">Bad</span>, ${RightAnswers} from ${count}`;
      }
      
   document.querySelector(".results").innerHTML = theResult;
}


function CountDown(dure,count) {
   
   if (currentNum < count) {
      let min,sec;
      
   CountDownTimer = setInterval(function() {
      
      min = parseInt(dure / 60);
      sec = parseInt(dure % 60);
      
    min =  min < 10 ? `0${min}` : min;
    sec =  sec < 10 ? `0${sec}` : sec;
      
    DownContai.innerHTML = `${min}:${sec}`
      
   if (--dure < 0) {
      
      clearInterval(CountDownTimer);
      subBtn.click();
   }
      
   },1000);
      
      
   }
   
}