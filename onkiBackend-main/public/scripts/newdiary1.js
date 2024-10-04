const button = document.querySelector('.next');
const input = document.querySelector('.diarynameinput');
  
function handler(){
    if (input.value.trim() === ""){
    alert("일기장의 이름을 입력해주세요!");
    }else{
    location.href='newdiary2.html';
   }
}
button.addEventListener('click', handler);      