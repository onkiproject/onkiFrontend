document.addEventListener('DOMContentLoaded', function() {
    const nicknameInput = document.querySelector('.nicknameinput');
    const nextButton = document.querySelector('.next');
    
    // URL에서 diaryId 가져오기 - URLSearchParams 사용
    const diaryId = window.location.pathname.split('/').pop(); // 경로에서 diaryId 추출
    
    // diaryId가 없는 경우 처리
    if (!diaryId) {
        console.error('diaryId not found in URL');
        alert('일기장 정보를 찾을 수 없습니다.');
        return;
    }

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

            const result = await response.json();
            
            if (response.ok && result.success) {
                // 성공 시 다음 페이지로 이동 - diaryId를 쿼리 파라미터로 포함
                window.location.href = `/newdiary6?diaryId=${diaryId}`;
            } else {
                alert(result.message || '닉네임 저장 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('네트워크 오류가 발생했습니다.');
        }
    });
});