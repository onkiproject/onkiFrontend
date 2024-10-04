const button = document.querySelector('.complete');
const colorInput = document.querySelector('.colorchoose');
const colorDisplay = document.querySelector('#colorDisplay');

// color-display 클릭 시 숨겨진 색상 선택기 열기
colorDisplay.addEventListener('click', () => {
    colorInput.click(); // 숨겨진 색상 선택기를 강제로 클릭
});

// 색상 선택 후 색상 적용
colorInput.addEventListener('input', () => {
    const color = colorInput.value;
    colorDisplay.style.backgroundColor = color; // 선택한 색상 적용
    colorDisplay.textContent = ''; // 텍스트 제거 후 색상 표시
});

// 완료 버튼 클릭 시 동작
button.addEventListener('click', () => {
    if (colorInput.value.trim() === "") {
        alert("색상을 선택해주세요!");
    } else {
        location.href = 'newdiary7.html';
    }
});
