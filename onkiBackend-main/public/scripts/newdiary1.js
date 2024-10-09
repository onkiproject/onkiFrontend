

const form = document.querySelector('form');
const input = document.querySelector('.diarynameinput');
const nextButton = document.getElementById('next').querySelector('button');

nextButton.addEventListener('click', function(event) {
    event.preventDefault(); // 기본 제출 동작 방지
    
    if (input.value.trim() === "") {
        alert("일기장의 이름을 입력해주세요!");
    } else {
        form.submit(); // 폼 제출
    }
});