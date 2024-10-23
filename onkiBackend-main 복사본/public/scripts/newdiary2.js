document.addEventListener('DOMContentLoaded', function () {
    const imageForm = document.getElementById('imageForm');
    const imageDiv = document.getElementById('image');
    const fileInput = document.getElementById('fileInput');
    
    // diaryId 가져오기 (form의 action에서 추출)
    const diaryId = imageForm.getAttribute('action').split('/').pop();

    imageDiv.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageDiv.innerHTML = `<img src="${e.target.result}" alt="Selected Image">`;
            };
            reader.readAsDataURL(file);
        }
    });

    imageForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        try {
            const response = await fetch(`/upload-image/${diaryId}`, {  // URL 수정
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    window.location.href = '/newdiary3';
                } else {
                    alert(result.message || '이미지 업로드 중 오류가 발생했습니다.');
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