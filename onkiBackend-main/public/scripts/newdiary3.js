document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.end');
    const input = document.querySelector('.diarypasswordinput1');
    const input2 = document.querySelector('.diarypasswordinput2');

    // URL에서 diaryId 가져오기
    const diaryId = window.location.pathname.split('/').pop(); // 경로에서 diaryId 추출

    if (!diaryId) {
        console.error('diaryId not found in URL');
        alert('일기장 정보를 찾을 수 없습니다.');
        return;
    }

    async function handler() {
        if (input.value.trim() === "" || input2.value.trim() === "") {
            alert("비밀번호를 모두 입력해주세요!");
        } else if (input.value.trim() !== input2.value.trim()) {
            alert("비밀번호와 비밀번호 확인이 같지 않아요!");
        } else {
            try {
                const response = await fetch('/save-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        diaryId: diaryId,
                        password: input.value.trim()
                    })
                });

                const result = await response.json();
                
                if (response.ok && result.success) {
                    alert(result.message);  // 성공 메시지
                    window.location.href = `/newdiary4/${diaryId}`;
                } else {
                    alert(result.message || '비밀번호 저장 중 오류가 발생했습니다.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('서버 오류가 발생했습니다.');
            }
        }
    }

    button.addEventListener('click', handler);
});
