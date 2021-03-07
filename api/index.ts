require('dotenv').config();
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import db from './models';
import users from './routes/users';
import groups from './routes/groups';

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/user', users);
app.use('/api/groups', groups);

const { PORT } = process.env;

db.sequelize
  .sync()
  .then(() => {
    // this creates a http server and listens for incoming requests
    app.listen(PORT, () => console.log(`Started on ${PORT}`));
  })
  .catch((err) => console.log(err));
