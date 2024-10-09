document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const input = document.querySelector('.diarynameinput');
    const nextButton = document.querySelector('#next button');
    
    if (!form || !input || !nextButton) {
        console.error('필요한 엘리먼트를 찾을 수 없습니다.');
        return;
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 제출 동작 방지
        
        if (input.value.trim() === "") {
            alert("일기장의 이름을 입력해주세요!");
        } else {
            this.submit(); // 폼 제출
        }
    });
    
    // 버튼 클릭 시 폼 제출
    nextButton.addEventListener('click', function() {
        form.dispatchEvent(new Event('submit'));
    });
});