

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
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.position = 'absolute';
                        img.style.left = `${clickX}px`;
                        img.style.top = `${clickY}px`;
                        img.style.width = '82px';
                        img.style.height = '86px';
                        img.style.objectFit = 'cover';
                        container.appendChild(img);
                        callCount++;  // 이미지 추가 시 호출 카운터 증가
                        imageinput.style.display='none';
                    }
                    reader.readAsDataURL(file);
                }
            }
            
            container.addEventListener('click', addImage);
        

        
    });















  //menu4 클릭 시 editDiary.html로 페이지 이동
  function toEditDiary(){
    window.location.href ="../roots/editDiary.html";
}
