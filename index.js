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

app.get('/friends', (req, res) => {
  res.json(friends);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
