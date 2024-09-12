const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;
const secret = 'your-256-bit-secret';

// Beellek içinde doğrulama 
const users = {
  user0: { password: 'password0', todos: []}, 
  user1: { password: 'password1', todos: [] },
  user2: { password: 'password2', todos: [] }
};

app.use(cors());
app.use(express.json());

// Nodemailer taşıyıcı yapılandırması
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: 'alptugfirat@gmail.com', //gönderilcek olan mail adresi
    pass: 'deneme123' // mail şifresi
  }
});

// E-posta gönderme işlevi

const sendEmail = (subject , text) => {
  console.log('E-posta gönderimi hazirligi yapiliyor...')
  const mailOptions = {
    from : 'alptugfirat@gmail.com',
    to : 'alptugfirat@gmail.com',
    subject : subject,
    text : text
  };
  transporter.sendMail(mailOptions,(error,info) => {
    if ( error ){
      console.error('E-posta gönderilirken hata oluştu !',error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Login endpoint -- GİRİŞ endpoint i 
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Username or password incorrect');
  }
});

// Get todos endpoint  --yapılacakları alma endpoint i 
app.get('/todos', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, secret);
    const username = decoded.username;
    const user = users[username];
    if (user) {
      res.json(user.todos);
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
});

// Add todo endpoint --- yapılacak ekleme endpointi 
app.post('/todos', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { todo } = req.body;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, secret);
    const username = decoded.username;
    const user = users[username];
    if (user) {
      user.todos.push(todo);
      res.status(201).json(user.todos);


      // Yeni bir todo eklendiğinde e - posta gönder 
      sendEmail('Yeni Todo Eklendi', `Yeni bir todo eklendi : ${todo}`);
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (err) {
    res.status(401).send('Unauthorized');
  
 }
});


// Delete todo endpoint -- yapılacak silme endpoint
app.delete ('/todos', (req,res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const {todo} =req.body;

  if (!token){
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token,secret);
    const username = decoded.username;
    const user = users[username];
    if (user){
      const todoIndex = user.todos.indexOf(todo);
      if(todoIndex > -1 ){
        user.todos.splice (todoIndex,1);
        res.status(200).json(user.todos);

    // Bir todo silindiğinde e posta gönder 
    sendEmail('Todo Silindi ', `Bir todo silindi: ${todo}`);
      } else{
        res.status(404).send('Todo not found ');
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch(err){
    res.status(401).send('Unauthorized');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
