const path = require('path');

function getMessages(req, res) {
  res.render('messages', {
    title: 'xxxxxxxx',
    friend: 'Balaganesh',
  });

  // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'Dev.png'));
}

function postMessage(req, res) {
  console.log('updating Messages...');
}

module.exports = {
  getMessages: getMessages,
  postMessage: postMessage,
};
