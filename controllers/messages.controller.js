function getMessages(req, res) {
  res.send('<ul><li>Hello Bala!!!</li></ul>');
}

function postMessage(req, res) {
  console.log('updating Messages...');
}

module.exports = {
  getMessages: getMessages,
  postMessage: postMessage,
};
