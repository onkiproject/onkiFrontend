const mongoose = require('mongoose');

// MongoDB 연결 설정
mongoose.connect('mongodb+srv://onki24:onki2004@onki-01.abw1d.mongodb.net/onki?retryWrites=true&w=majority&appName=onki-01', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB 연결 성공');
  }).catch((err) => {
    console.error('MongoDB 연결 실패:', err);
  });
const NicknameSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Nickname', NicknameSchema);
