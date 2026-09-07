require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const mentorRoutes = require('./routes/mentors');
const profileRoutes = require('./routes/profile');
const { errorHandler } = require('./middlewares/errorHandler');


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/profile', profileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(()=> {
    app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('DB connect error', err);
  });
