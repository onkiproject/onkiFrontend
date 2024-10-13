

//햄버거메뉴
function toggleMenu() {
    const menu = document.getElementById('hamMenu');
    const ham = document.getElementById('ham');
    menu.classList.toggle('show');
    if (menu.classList.contains('show')) {
        menu.style.right = '0px';
        ham.style.visibility = 'hidden';
    } else {
        menu.style.right = '-250px';
        ham.style.visibility = 'viㄴsible';
    }
}

const hamButton = document.getElementById('ham');
if (hamButton) {
    hamButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMenu();
    });
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('hamMenu');
    if (menu && !menu.contains(event.target) && menu.classList.contains('show')) {
        toggleMenu();
    }
});

const hamMenu = document.getElementById('hamMenu');
if (hamMenu) {
    hamMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}
//햄버거 끝



    const textIcon = document.querySelector('.svg-icon.icon-1');
    const imgIcon = document.querySelector('.svg-icon.icon-2');
    const drawIcon = document.querySelector('.svg-icon.icon-3');


    const palletecont = document.querySelector('.palletecont'); 
    const strokecont = document.querySelector('.strokecont'); 
    const thicknessBtns = document.querySelectorAll('.thick1, .thick2, .thick3, .thick4, .thick5');
    const eraserBtn = document.querySelector('.eraser');


    drawIcon.addEventListener('click', function() {
        palletecont.style.display = 'flex';
        strokecont.style.display='flex';
        textinput.style.display = 'none';
        imageinput.style.display = 'none';

        const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext("2d");
        const eraserBtn = document.querySelector('.eraser');

        let painting = false;
        let lastX = 0;
        let lastY = 0;
        let isErasing = false;
        const eraserLineWidth = 20;
        
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseout',stopPainting);

        canvas.addEventListener('touchstart', handleStart);
        canvas.addEventListener('touchmove', handleMove);
        canvas.addEventListener('touchend', handleEnd);

        

        function startPainting(e) {
            painting = true;
            ctx.lineWidth = isErasing ? eraserLineWidth : currentLineWidth;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
        function stopPainting() {
            painting = false;
        
        }

        function draw(e) {
            if (!painting) return;

            ctx.lineWidth = isErasing ? eraserLineWidth : currentLineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function handleStart(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }

        function handleMove(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }

        function handleEnd(e) {
            e.preventDefault();
            const mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }
       
        





        //굵기랑 색 설정

        const buttons = [
                "navy", "black"
            ];
            

            buttons.forEach((content) => {
                let button = document.querySelector(`.${content}`);
                button.style.backgroundColor = content;
                button.onclick = () => {
                    isErasing = false;
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.strokeStyle = content;
                    lineColor = content;
                    currentLineWidth = normalLineWidth;
                };
            });
       
            

            //굵기 설정 
            const lineWidths = [1, 3, 5, 8, 10];
            let currentLineWidth = 1;
            
            thicknessBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    currentLineWidth = lineWidths[index];
                    isErasing = false;
                    ctx.globalCompositeOperation = 'source-over';
                });
            });
            //지우기
            eraserBtn.addEventListener('click', () => {
                isErasing = true;
                ctx.globalCompositeOperation = 'destination-out';
                currentLineWidth = eraserLineWidth;
                
            });


    });

    textIcon.addEventListener('click', function() {
        palletecont.style.display = 'flex';
        textinput.style.display = 'flex';
        strokecont.style.display='none';
        imageinput.style.display = 'none';


        const buttons = [
            "navy", "black"
        ];
        

        buttons.forEach((content) => {
            let button = document.querySelector(`.${content}`);
            button.style.backgroundColor = content;
            button.onclick = () => {
                isErasing = false;
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = content;
                lineColor = content;
                currentLineWidth = normalLineWidth;
            };
        });

        const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext("2d");
        textinput.style.display='flex';
        
        let isAddingText = false;
        canvas.addEventListener("mousedown", (e) => {
            if (isAddingText) {
                const textInput = document.getElementById('text-to-add');
                const text = textInput.value;
                if (text) {
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    ctx.font = '15px SokchoBadaDotum';
                    ctx.fillStyle = lineColor;
                    ctx.fillText(text, x, y);
                    // 서버로 데이터 전송
                    fetch('/saveText', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            text: text,
                            x: x,
                            y: y,
                            color: lineColor,
                            font: '15px SokchoBadaDotum'
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Data saved:', data);
                    })
                    .catch(error => {
                        console.error('Error saving text:', error);
                    });
                    isAddingText = false;
                    canvas.style.cursor = 'default';
                    textInput.value = ''; // 텍스트가 추가된 후 입력 필드 초기화
                }
            } 
        });


        document.getElementById('add-text').addEventListener('click', () => {
            isAddingText = true;
            canvas.style.cursor = 'crosshair';
        });
        
    });

    imgIcon.addEventListener('click', function() {
        palletecont.style.display = 'none';
        textinput.style.display = 'none';
        strokecont.style.display='none';
        imageinput.style.display='flex';

        const canvas = document.getElementById('drawingCanvas');
        const container = document.getElementById('imageContainer');
        const fileInput = document.getElementById('fileInput');
            
            let clickX, clickY;
            let callCount = 0;  // 호출 횟수 카운터
            const maxCalls = 1; // 호출 횟수 제한 설정
        
            function addImage(e) {
                if (callCount >= maxCalls) {
                    console.log("이미지를 추가할 수 있는 최대 횟수에 도달했습니다.");
                    return;
                }
        
                clickX = e.offsetX;
                clickY = e.offsetY;
                fileInput.click();
            }
            
            fileInput.onchange = function(event) {
                const file = event.target.files[0];
                if (file) {
                  const formData = new FormData();
                  formData.append('image', file);
                  formData.append('x', clickX);
                  formData.append('y', clickY);
                  formData.append('width', 82);
                  formData.append('height', 86);
            
                  fetch('/uploadImage', {
                    method: 'POST',
                    body: formData
                  })
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      const img = document.createElement('img');
                      img.src = data.imageUrl;
                      img.style.position = 'absolute';
                      img.style.left = `${clickX}px`;
                      img.style.top = `${clickY}px`;
                      img.style.width = '82px';
                      img.style.height = '86px';
                      img.style.objectFit = 'cover';
                      container.appendChild(img);
                      
                      callCount++;
                      imageinput.style.display = 'none';
                    } else {
                      console.error('이미지 업로드 실패:', data.message);
                    }
                  })
                  .catch(error => console.error('Error:', error));
                }
              }
            
              container.addEventListener('click', addImage);
            });

    //기존에 있던것들 띄우기

    // 페이지가 로드될 때 저장된 텍스트를 불러오는 함수
    function loadTexts() {
        fetch('/getTexts')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // 각 텍스트 객체를 순회하며 캔버스에 그리기
                    data.texts.forEach(item => {
                        drawTextOnCanvas(item.text, item.textx, item.texty, item.textcolor, item.textfont);
                    });
                } else {
                    console.error(data.message);
                }
            })
            .catch(err => console.error('Error loading texts:', err));
    }
    
        // 캔버스에 텍스트 그리기 함수
        function drawTextOnCanvas(text, textx, texty, textcolor, textfont) {
            const canvas = document.getElementById('drawingCanvas');
            const ctx = canvas.getContext('2d');
            ctx.font = textfont;
            ctx.fillStyle = textcolor;
            ctx.fillText(text, textx, texty);
        }
    
        // 페이지가 로드될 때 텍스트를 불러옴
        window.onload = loadTexts;

        // 페이지 로드 시 저장된 이미지 불러오기
        function loadImages() {
            fetch('/getImages')
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  const container = document.getElementById('imageContainer');
                  data.images.forEach(imgInfo => {
                    const img = document.createElement('img');
                    img.src = imgInfo.path;
                    img.style.position = 'absolute';
                    img.style.left = `${imgInfo.x}px`;
                    img.style.top = `${imgInfo.y}px`;
                    img.style.width = `${imgInfo.width}px`;
                    img.style.height = `${imgInfo.height}px`;
                    img.style.objectFit = 'cover';
                    container.appendChild(img);
                  });
                }
              })
              .catch(error => console.error('Error loading images:', error));
          }
          
          // 페이지 로드 시 이미지 불러오기
          window.addEventListener('load', loadImages);
            













  //menu4 클릭 시 editDiary.html로 페이지 이동
  function toEditDiary(){
    window.location.href ="../roots/editDiary.html";
}




