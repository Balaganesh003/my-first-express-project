const express = require('express');
const path = require('path');
const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const port = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  // actions go here...
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl} ${req.url} ${delta}ms`);
});

app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'CodeChef',
    caption: 'Photo',
  });
});
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
