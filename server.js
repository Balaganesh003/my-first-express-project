const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/wardenDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const WardenSchema = new mongoose.Schema({
  universityId: String,
  password: String,
  // other fields...
});

const SessionSchema = new mongoose.Schema({
  wardenId: mongoose.Schema.Types.ObjectId,
  startTime: Date,
  endTime: Date,
  booked: { type: Boolean, default: false },
  // other fields...
});

const Warden = mongoose.model('Warden', WardenSchema);
const Session = mongoose.model('Session', SessionSchema);

app.post('/login', async (req, res) => {
  const { universityId, password } = req.body;

  const warden = await Warden.findOne({ universityId });
  if (!warden) {
    return res.status(401).send('Invalid credentials');
  }

  const validPassword = await bcrypt.compare(password, warden.password);
  if (!validPassword) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ _id: warden._id }, 'secretKey');
  res.send({ token });
});

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const verified = jwt.verify(token, 'secretKey');
    req.warden = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

app.get('/sessions/available', authMiddleware, async (req, res) => {
  const sessions = await Session.find({ booked: false });
  res.send(sessions);
});

app.post('/sessions/book', authMiddleware, async (req, res) => {
  const { sessionId } = req.body;
  let session = await Session.findById(sessionId);

  if (!session || session.booked) {
    return res.status(400).send('Session not available.');
  }

  session.booked = true;
  session = await session.save();
  res.send(session);
});

app.get('/sessions/pending', authMiddleware, async (req, res) => {
  const sessions = await Session.find({
    wardenId: req.warden._id,
    booked: true,
  });
  res.send(sessions);
});

app.put('/sessions/update', authMiddleware, async (req, res) => {
  const { sessionId } = req.body;
  let session = await Session.findById(sessionId);

  if (!session) {
    return res.status(404).send('Session not found.');
  }

  // Update logic here, e.g., session.booked = false;
  session = await session.save();
  res.send(session);
});
