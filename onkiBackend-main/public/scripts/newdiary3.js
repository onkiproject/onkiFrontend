const button = document.querySelector('.end');
const input = document.querySelector('.diarypasswordinput1');
const input2 = document.querySelector('.diarypasswordinput2');

async function handler() {
  if (input.value.trim() === "" || input2.value.trim() === "") {
    alert("비밀번호를 모두 입력해주세요!");
  } else if (input.value.trim() !== input2.value.trim()) {
    alert("비밀번호와 비밀번호 확인이 같지 않아요!");
  } else {
    // 비밀번호와 비밀번호 확인을 서버로 POST 전송

        const diaryId = '여기에_다이어리_ID를_입력하세요'; // 실제 diaryId로 대체
        
        try {
          const response = await fetch('/save-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              diaryId: diaryId,
              password: input.value.trim(),
              confirmPassword: input2.value.trim()
            })
          });
      
          const result = await response.text();
          if (response.ok) {
            alert(result); // 성공 메시지
            window.location.href = '/newdiary4';
          } else {
            alert(result); // 오류 메시지
          }
        } catch (error) {
          alert('서버 오류가 발생했습니다.');
        }
      }
      
    }
  

button.addEventListener('click', handler);
