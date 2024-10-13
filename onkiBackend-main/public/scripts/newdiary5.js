document.querySelector('.next').addEventListener('click', async function() {
    const nicknameInput = document.querySelector('.nicknameinput');
    const nickname = nicknameInput.value.trim(); // 입력한 닉네임 가져오기

    // 닉네임 입력 확인
    if (!nickname) {
        alert('닉네임을 입력해주세요!');
        return;
    }

    try {
        // 닉네임을 서버에 POST 요청으로 전송
        const response = await fetch('/save-nickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname }) // 닉네임을 JSON 형태로 전송
        });

        if (response.ok) {
            // 성공적으로 저장되면 다음 페이지로 이동
            window.location.href = '/newdiary6'; // 다음 페이지 URL로 변경
        } else {
            // 서버 오류 처리
            const errorMessage = await response.text();
            alert(`오류 발생: ${errorMessage}`);
        }
    } catch (error) {
        console.error('닉네임 저장 중 오류 발생:', error);
        alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
});
