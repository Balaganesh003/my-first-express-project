const express = require('express');
const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const app = express();

const port = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  // actions go here...
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl} ${req.url} ${delta}ms`);
});

app.use(express.json());
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
