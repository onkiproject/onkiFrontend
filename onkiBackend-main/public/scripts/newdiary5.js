document.addEventListener('DOMContentLoaded', function() {
    const nicknameInput = document.querySelector('.nicknameinput');
    const nextButton = document.querySelector('.next');
    
    // URL에서 diaryId 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const diaryId = urlParams.get('diaryId');

    nextButton.addEventListener('click', async function(event) {
        event.preventDefault();
        const nickname = nicknameInput.value.trim();
        
        if (!nickname) {
            alert('닉네임을 입력해주세요!');
            return;
        }

        try {
            const response = await fetch(`/save-nickname/${diaryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nickname })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    window.location.href = '/newdiary6';
                } else {
                    alert(result.message || '닉네임 저장 중 오류가 발생했습니다.');
                }
            } else {
                const errorData = await response.json();
                alert(errorData.message || '서버 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('네트워크 오류가 발생했습니다.');
        }
    });
});