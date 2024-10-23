// 필요한 모듈 불러오기
const express=require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app=express();
const cors = require('cors');

app.use(bodyParser.json());

// URL-encoded 형식의 데이터를 파싱
app.use(bodyParser.urlencoded({ extended: true }));
const ejs = require('ejs');
const multer = require('multer');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(cors()); // CORS 설정
app.use(express.json()); // JSON 파싱 설정


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
// const dotenv = require('dotenv').config(); // 환경변수
const port = 3000;
const { ObjectId } = require('mongodb'); // mongodb에서 ObjectId 가져오기

const mongoclient = require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectId;
let mydb;
const url = "mongodb+srv://onki24:onki2004@onki-01.abw1d.mongodb.net/?retryWrites=true&w=majority&appName=onki-01"; 


//mongodb와 연동, 서버 띄우기 
mongoclient.connect(url)
    .then(client => {
        mydb = client.db('onki');
        app.listen(port, function(){
            console.log(`서버가 포트 ${port}에서 실행 중입니다!`);
        });
    }).catch(err => {
        console.log("MongoDB 연결 오류", err.message);
   });

//사진 관련
let storage = multer.diskStorage({
    destination: function(req, file, done){
        done(null, './public/images')

    },
    filename: function(req, file, done){
        done(null,file.originalname)
    }
});
const upload = multer({ 
    storage: storage,
    
  });

    app.get('/newdiary1', function(req, res){
        res.render('newdiary1.ejs')
    })

    app.get('/index', function(req, res) {
        res.render('index.ejs');
    });
    app.get('/index3-1', function(req, res) {
        res.render('index3-1.ejs');
    });

    //newdiary1
    app.get('/newdiary1', function(req, res){
        res.render('newdiary1.ejs')
    });
    //입력된 일기장 이름 DB에 저장...
    app.post('/newdiary1', async function(req, res) {
        try {
            const diary = {
                title: req.body.diaryname,
            };
            
            const result = await mydb.collection('diaries').insertOne(diary);
            console.log("새로운 일기 저장 완료:", result.insertedId);
            
            // 리다이렉트 전에 응답 헤더 설정
            res.writeHead(302, {
                'Location': `/newdiary2?diaryId=${result.insertedId}`
            });
            res.end();
        } catch (err) {
            console.error("DB 저장 중 오류:", err);
            res.status(500).send("DB 저장 중 오류가 발생했습니다.");
        }
    });
    
    

    //newdiary2
    app.get('/newdiary2', function(req, res) {
        console.log("Received request for /newdiary2 with diaryId:", req.query.diaryId);
        const diaryId = req.query.diaryId; // 일기장 ID 가져오기
        if (!diaryId) {
            return res.status(400).send("diaryId가 필요합니다."); // diaryId가 없을 경우 에러 처리
        }
        res.render('newdiary2.ejs', { diaryId: diaryId }); // diaryId를 전달
    });
    app.post('/newdiary2', function(req, res) {
        const diaryName = req.body.diaryname; // 'diaryname'은 input의 name 속성과 일치
        
        // 여기서 필요한 처리를 수행합니다
        // 예: 데이터베이스에 저장
        
        res.render('newdiary2.ejs', { diaryName: diaryName });
        // 또는 다른 페이지로 리다이렉트
        // res.redirect('/next-page');
    });
    // 기존 문서에 이미지 추가
    
    app.post('/upload-image/:diaryId', upload.single('image'), async (req, res) => {
        try {
            const diaryId = req.params.diaryId;
            
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: '파일이 업로드되지 않았습니다.' 
                });
            }
    
            const imageInfo = {
                filename: req.file.filename,
                originalname: req.file.originalname,
                path: `/uploads/${req.file.filename}`,
                uploadDate: new Date()
            };
    
            if (!mydb) {
                throw new Error('Database connection is not established');
            }
    
            const result = await mydb.collection('diaries').updateOne(
                { _id: new ObjectId(diaryId) },
                { $set: { image: imageInfo } }  // $push 대신 $set 사용
            );
    
            if (result.matchedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: '해당 일기장을 찾을 수 없습니다.'
                });
            }
    
            res.json({
                success: true,
                message: '이미지가 성공적으로 업로드되었습니다.',
                imageUrl: imageInfo.path
            });
            
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                message: '서버 오류가 발생했습니다.',
                error: error.message
            });
        }
    });



    app.get('/newdiary3', function(req, res){
        res.render('newdiary3.ejs')
    });

    const bcrypt = require('bcrypt');
    const DiaryPassword = require('./modules/DiaryPassword'); // 경로가 맞는지 확인

    app.post('/save-password', async (req, res) => {
        const { diaryId, password } = req.body; // diaryId를 포함하도록 수정
      
        // 비밀번호와 diaryId가 모두 제공되었는지 확인
        if (!diaryId || !password) {
          return res.status(400).send("다이어리 ID와 비밀번호를 모두 제공해야 합니다.");
        }
      
        try {
          // 비밀번호 저장
          const diaryPassword = new DiaryPassword({
            diaryId: diaryId,
            password: password
          });
      
          await diaryPassword.save();
          res.send("비밀번호가 성공적으로 저장되었습니다.");
        } catch (error) {
          console.error('비밀번호 저장 오류:', error);
          res.status(500).send("비밀번호를 저장하는 중 오류가 발생했습니다.");
        }
      });
    






    app.get('/newdiary4', function(req, res){
        res.render('newdiary4.ejs')
    });



    app.get('/newdiary5', function(req, res) {
        const diaryId = req.params.diaryId;
        if (!diaryId) {
            return res.status(400).send("diaryId가 필요합니다.");
        }
        res.render('newdiary5.ejs', { diaryId: diaryId });
    });
    const Nickname = require('./modules/User');

    app.post('/save-nickname/:diaryId', async (req, res) => {
        console.log('닉네임 저장 요청 받음:', req.params.diaryId, req.body.nickname);
        
        try {
            const diaryId = req.params.diaryId;
            const nickname = req.body.nickname;
    
            // diaryId 유효성 검사
            if (!ObjectId.isValid(diaryId)) {
                console.error('Invalid diaryId:', diaryId);
                return res.status(400).json({
                    success: false,
                    message: '유효하지 않은 일기장 ID입니다.'
                });
            }
    
            // nickname 유효성 검사
            if (!nickname) {
                return res.status(400).json({
                    success: false,
                    message: '닉네임이 필요합니다.'
                });
            }
    
            // MongoDB에 닉네임 업데이트
            const result = await mydb.collection('diaries').updateOne(
                { _id: new ObjectId(diaryId) },
                { 
                    $set: { 
                        nickname: nickname,
                        updatedAt: new Date()
                    } 
                }
            );
    
            console.log('Database update result:', result);
    
            if (result.matchedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: '해당 일기장을 찾을 수 없습니다.'
                });
            }
    
            res.json({
                success: true,
                message: '닉네임이 성공적으로 저장되었습니다.',
                diaryId: diaryId
            });
    
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({
                success: false,
                message: '서버 오류가 발생했습니다.',
                error: error.message
            });
        }
    });



    app.get('/newdiary6', function(req, res){
        res.render('newdiary6.ejs')
    });
    app.get('/newdiary7', function(req, res){
        res.render('newdiary7.ejs')
    });


    app.get('/roomNum', (req, res) => {
        res.render('roomNum.ejs'); // roomNum.ejs 파일이 존재하는지 확인하세요.
    });










    //다이어리

    //다이어리 텍스트
    app.post('/saveText', (req, res) => {
        const { text, x, y, color, font } = req.body;
    
         // MongoDB에 텍스트 데이터 저장
        mydb.collection('diaries').insertOne({
            text: text,
            textx: x,
            texty: y,
            textcolor: color,
            textfont: font,
            //date: new Date()
        })
        .then(result => {
            console.log('Text data saved:', result);
            res.json({ success: true, message: 'Text data saved successfully' });
        })
        .catch(err => {
            console.log('Error saving text data:', err.message);
            res.status(500).json({ success: false, message: 'Failed to save text data' });
        });
    });
    //다이어리에 있는 텍스트 띄우기 위한
    app.get('/getTexts', (req, res) => {
        mydb.collection('diaries').find().toArray()
        .then(results => {
            res.json({ success: true, texts: results });
        })
        .catch(err => {
            console.log('Error fetching text data:', err.message);
            res.status(500).json({ success: false, message: 'Failed to fetch text data' });
        });
    });

    //다이어리 사진






      app.post('/uploadImage', upload.single('image'), (req, res) => {
        if (!req.file) {
          return res.status(400).json({ success: false, message: '파일이 업로드되지 않았습니다.' });
        }
      
        // 이미지 정보를 MongoDB에 저장
        const imageInfo = {
          filename: req.file.filename,
          originalname: req.file.originalname,
          path: `/images/${req.file.filename}`, // 클라이언트에서 접근할 경로
          x: req.body.x,
          y: req.body.y,
          width: req.body.width,
          height: req.body.height
        };
      
        mydb.collection('diaries').insertOne(imageInfo)
          .then(result => {
            res.json({ 
              success: true, 
              id: result.insertedId,
              imageUrl: imageInfo.path
            });
          })
          .catch(err => {
            console.error('Error saving image info to database:', err);
            res.status(500).json({ success: false, message: '이미지 정보 저장 중 오류가 발생했습니다.' });
          });
      });
      app.get('/getImages', (req, res) => {
        mydb.collection('images').find().toArray()
          .then(images => {
            res.json({ success: true, images });
          })
          .catch(err => {
            console.error('Error fetching images:', err);
            res.status(500).json({ success: false, message: '이미지를 불러오는 중 오류가 발생했습니다.' });
          });
      });
      
      // 정적 파일 제공
      app.use('/images', express.static('public/images'));
