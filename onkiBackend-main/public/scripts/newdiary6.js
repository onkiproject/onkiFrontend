const button = document.querySelector('.complete');
const diaryId = document.querySelector('#diaryId')?.value;
const nickname = document.querySelector('#nickname')?.value;
const colorInput = document.querySelector('.colorchoose');
const colorDisplay = document.querySelector('#colorDisplay');

// 모든 요소가 제대로 선택되었는지 확인
console.log('Elements found:', {
    buttonElement: button,
    diaryIdElement: document.querySelector('#diaryId'),
    nicknameElement: document.querySelector('#nickname'),
    colorInputElement: colorInput,
    colorDisplayElement: colorDisplay
});

// 값들이 제대로 들어있는지 확인
console.log('Values:', {
    diaryId,
    nickname,
    colorInputInitialValue: colorInput?.value
});

// 이벤트 리스너가 제대로 설정되었는지 확인
if (colorDisplay && colorInput) {
    colorDisplay.addEventListener('click', () => {
        console.log('Color display clicked');
        colorInput.click();
    });

    colorInput.addEventListener('input', (event) => {
        const color = event.target.value;
        console.log('Color selected:', color);
        colorDisplay.style.backgroundColor = color;
        colorDisplay.textContent = '';
    });
}

if (button) {
    button.addEventListener('click', async () => {
        console.log('Button clicked');
        const color = colorInput?.value;
        
        console.log('Submit data:', {
            nickname,
            color,
            diaryId
        });

        if (!color) {
            alert("색상을 선택해주세요!");
            return;
        }

        try {
            const response = await fetch(`/save-nickname/${diaryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nickname,
                    color
                })
            });

            console.log('Response status:', response.status);
            
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                alert('닉네임과 색상이 저장되었습니다!');
                window.location.href = '/newdiary7';
            } else {
                alert(data.message || "저장에 실패했습니다.");
            }
        } catch (error) {
            console.error('Error details:', error);
            alert('서버와의 통신에 실패했습니다.');
        }
    });
} else {
    console.error('Complete button not found!');
}