const model = require('../models/friends.model');

function postFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'Missing Friend name',
    });
  }

  const newFriend = {
    name: req.body.name,
    id: model.friends.length + 1,
  };

  model.friends.push(newFriend);

  res.json(newFriend);
}

function getFriends(req, res) {
  res.json(model.friends);
}

function getFriend(req, res) {
  const friendId = req.params.friendId;
  const friend = model.friends.find((frd) => frd.id == friendId);
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json([
      {
        Error: 'Frined Does not exits',
      },
    ]);
  }
}

module.exports = {
  getFriend,
  getFriends,
  postFriend,
};
