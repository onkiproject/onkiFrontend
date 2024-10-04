document.addEventListener('DOMContentLoaded', function () {
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
  });
  