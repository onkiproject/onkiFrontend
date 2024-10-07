const button = document.querySelector('.next');
const input = document.querySelector('.diarynameinput');
  
function handler(){
    if (input.value.trim() === ""){
    alert("일기장의 이름을 입력해주세요!");
    }else{
        //form.action = '/newdiary2';
   }
    document.getElementById('next').addEventListener('click', function() {
    window.location.href = 'newdiary2';  // /index 경로로 리다이렉트
     });


}
button.addEventListener('click', handler);      