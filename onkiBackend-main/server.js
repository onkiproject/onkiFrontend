// 필요한 모듈 불러오기
const express=require('express');
const path = require('path');
const app=express();

const ejs = require('ejs');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
// const dotenv = require('dotenv').config(); // 환경변수
const port = 3000;
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



    app.get('/newdiary1', function(req, res){
        res.render('newdiary1.ejs')
    })