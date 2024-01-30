const express = require('express');
const session = require('express-session');
const hashedSecret = require('./crypto/config');
const route = require('./routes/users');



const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: hashedSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false}
  })
);

app.use('/',route)

/*
app.use('/', (req, res, next) => {
  const userToken = req.session.token;
  if (userToken) {
    res.locals.loggedIn = true;
  }
  next();
});


function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
  const token = req.session.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
}

app.get('/', (req, res) => {
  if (res.locals.loggedIn) {
    res.send(`
      <h2>Bienvenido de nuevo</h2>
      <a href="/dashboard">Dashboard</a>
      <form action="/logout" method="post">
        <button type="submit">Cerrar sesión</button>
      </form>
    `);
  } else {
    res.send(`
      <h1>Bienvenido a Alvarolandia</h1>
      <form action="/login" method="post">
        <label for="username">Usuario</label>
        <input type="text" id="username" name="username" required><br>
        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" required><br>
        <button type="submit">Iniciar sesión</button>
      </form>
    `);
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && bcrypt.compareSync(password, u.password));

  if (user) {
    const token = generateToken(user);
    req.session.token = token;
    res.redirect('/dashboard');
  } else {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

app.get('/dashboard', verifyToken, (req, res) => {
  res.send(`
    <h2>Dashboard de ${req.user.username}, bienvenido</h2>
    <a href="/">Home</a></br>
    <form action="/logout" method="post">
      <button type="submit">Cerrar sesión</button>
    </form>
  `);
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});*/

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});
