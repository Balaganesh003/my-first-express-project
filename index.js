const express = require('express');

const app = express();

const port = 3000;

const friends = [
  {
    id: 1,
    name: 'Balaganesh',
  },
  {
    id: 2,
    name: 'Eshwarthath K R',
  },
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  const start = Date.now();
  next();
  // actions go here...
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());

app.post('/friend', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'Missing Friend name',
    });
  }

  const newFriend = {
    name: req.body.name,
    id: friends.length + 1,
  };

  friends.push(newFriend);

  res.json(newFriend);
});

app.get('/friends', (req, res) => {
  res.json(friends);
});

app.get('/friends/:friendId', (req, res) => {
  const friendId = req.params.friendId;
  const friend = friends.find((frd) => frd.id == friendId);
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json([
      {
        Error: 'Frined Does not exits',
      },
    ]);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
