document.addEventListener('DOMContentLoaded', function () {
  const imageForm = document.getElementById('imageForm');
  const imageDiv = document.getElementById('image');
  const fileInput = document.getElementById('fileInput');

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
          const response = await fetch('/upload-diary-image', {
              method: 'POST',
              body: formData
          });
          
          if (response.ok) {
              window.location.href = '/newdiary3';
          } else {
              alert('이미지 업로드 중 오류가 발생했습니다.');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('이미지 업로드 중 오류가 발생했습니다.');
      }
  });
});