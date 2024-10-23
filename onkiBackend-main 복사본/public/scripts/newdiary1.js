document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const input = document.querySelector('.diarynameinput');
    
    if (!form || !input) {
        console.error('필요한 엘리먼트를 찾을 수 없습니다.');
        return;
    }

    form.addEventListener('submit', function(event) {
        if (input.value.trim() === "") {
            event.preventDefault();
            alert("일기장의 이름을 입력해주세요!");
            return false;
        }
        // 폼이 유효하면 자연스럽게 제출되도록 둡니다
    });
});