const button = document.querySelector('.next');
const input = document.querySelector('.nicknameinput');


function handler(){
    if (input.value.trim()===""){
    alert("닉네임을 입력해주세요!");
    }else{
    location.href='newdiary6.html';
   }
}
button.addEventListener('click', handler);     
