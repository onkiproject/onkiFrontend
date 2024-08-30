

//아래 다이어리 수정 버튼들
document.addEventListener('DOMContentLoaded', function() {
    function toggleMenu() {
        const menu = document.getElementById('hamMenu');
        const ham = document.getElementById('ham');
        menu.classList.toggle('show');
        if (menu.classList.contains('show')) {
            menu.style.right = '0px';
            ham.style.display = 'none';
        } else {
            menu.style.right = '-250px';
            ham.style.display = 'block';
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
    document.querySelector('.downpart').addEventListener('click', function(event) {
        const svg = event.target.closest('svg');
        const palletecont = document.querySelector('.palletecont');
        const strokecont = document.querySelector('.strokecont');

        const thicknessBtns = document.querySelectorAll('.thick1, .thick2, .thick3, .thick4, .thick5');
        const eraserBtn = document.querySelector('.eraser');

        


        // 이미지 추가 기능
        function setupImageAddition() {
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
                    }
                    reader.readAsDataURL(file);
                }
            }
            
            container.addEventListener('click', addImage);
        }
        
        
        // 편집 기능
        function setupDrawing() {
            palletecont.style.display = 'flex';
            strokecont.style.display='flex';



            const canvas = document.getElementById('drawingCanvas');
            const ctx = canvas.getContext('2d');
            const eraserBtn = document.querySelector('.eraser');


            let isDrawing = false;
            let lastX = 0;
            let lastY = 0;
            let isErasing = false;
            const eraserLineWidth = 20;
            
            
            // 마우스 이벤트
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);

            // 터치 이벤트
            canvas.addEventListener('touchstart', handleStart);
            canvas.addEventListener('touchmove', handleMove);
            canvas.addEventListener('touchend', handleEnd);

            function startDrawing(e) {
                isDrawing = true;
                ctx.lineWidth = isErasing ? eraserLineWidth : currentLineWidth;
                [lastX, lastY] = [e.offsetX, e.offsetY];
                
            }

            function draw(e) {
                if (!isDrawing) return;
                
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
            function stopDrawing() {
                isDrawing = false;
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
        }

        let currentMode = null;

        function disableAllModes() {
        const canvas = document.getElementById('drawingCanvas');
        canvas.removeEventListener('click', setupDrawing);
        // 다른 모드의 이벤트 리스너도 여기서 제거
        }

    




        if (svg) {
            disableAllModes();
           
            if (svg && svg.classList.contains('icon-1')) {
                alert('첫 번째 아이콘: 텍스트 입력 기능');
                const canvas = document.getElementById('drawingCanvas');
                const container = document.getElementById('textContainer');
                const hiddenInput = document.getElementById('hiddenTextInput');

                

                container.addEventListener('click', function(e) {
                    // 클릭된 위치를 가져옵니다.
                    const clickX = e.offsetX;
                    const clickY = e.offsetY;
            
                    // 새 입력 필드 생성
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.style.position = 'absolute';
                    input.placeholder = hiddenInput.placeholder;
                    input.maxLength = hiddenInput.maxLength;
                    input.size = hiddenInput.size;
                    input.className = 'textInputField';


                    input.style.backgroundColor= '#E2E2E2';
                    input.style.left = `${clickX}px`;
                    input.style.top = `${clickY}px`;
                    input.style.width = '100px'; // 너비 설정
                    input.style.height = '12px';  // 높이 설정
                    
                    // 입력 필드를 컨테이너에 추가
                    container.appendChild(input);

                    // 포커스를 입력 필드로 설정
                    input.focus();
            });

            } else if (svg.classList.contains('icon-2')) {
                alert('두 번째 아이콘: 이미지 추가 기능'); 

                setupImageAddition(); 
                
                const canvas = document.getElementById('drawingCanvas'); 

                // setupDrawing 함수를 이벤트 리스너에서 제거
                currentMode = 'imageAddition';


            } else if (svg.classList.contains('icon-3')) {
                alert('세 번째 아이콘: 편집 기능');

                setupDrawing();
                currentMode = 'drawing';


            } else if (svg.classList.contains('icon-4')) {
                alert('네 번째 아이콘: 음악 재생 기능');
                // 여기에 음악 재생 관련 코드를 추가하세요
            } else if (svg.classList.contains('icon-5')) {
                alert('다섯 번째 아이콘: 설정 기능');
                // 여기에 설정 관련 코드를 추가하세요
            }
        }
    });
});