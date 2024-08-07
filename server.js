const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

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
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
