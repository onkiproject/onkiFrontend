const button = document.querySelector('.end');
const input = document.querySelector('.diarypasswordinput1');
const input2 = document.querySelector('.diarypasswordinput2');
  
function handler(){
    if (input.value.trim() === "" || input2.value.trim() === ""){
    alert("비밀번호를 모두 입력해주세요!");
    }else{
    location.href='newdiary4.html';
   }
}
button.addEventListener('click', handler);     