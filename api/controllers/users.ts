import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// @ts-ignore
import db from '../models';

const { user: users } = db;

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await users.findOne({
    where: {
      email,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { userId: user.id, email },
        process.env.AUTH_SECRET_KEY,
        {
          expiresIn: '1w',
        },
      );

      if (token) {
        const now = new Date();
        return res
          .status(200)
          .cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          })
          .json({
            status: 'successful',
            message: 'Logged in successfully',
            data: {
              id: user.id,
              name: user.name,
              email,
              token,
            },
          });
      }
    } else {
      return res.status(403).json({
        status: 'failed',
        message: 'Incorrect username or password',
        data: null,
      });
    }
  } else {
    return res.status(403).json({
      status: 'failed',
      message: 'Incorrect username or password',
      data: null,
    });
  }
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  console.log(users);

  const exists = await users.findOne({
    where: {
      email,
    },
    raw: true,
  });

  console.log(exists);

  if (exists) {
    return res.status(403).json({
      status: 'failed',
      message: 'Failed to create account',
      data: null,
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const created = await users
      .create({
        name,
        email,
        password: hashedPassword,
      })
      .then((u) => u)
      .catch(() => ({ err: true }));

    if (created.err) {
      return res.status(400).json({
        status: 'failed',
        message: 'An error occured trying to create your account',
        data: null,
      });
    } else {
      const token = jwt.sign(
        { userId: created.id, email },
        process.env.AUTH_SECRET_KEY,
        {
          expiresIn: '1w',
        },
      );

      if (token) {
        const now = new Date();
        return res
          .status(200)
          .cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          })
          .json({
            status: 'successful',
            message: 'Account created successfully',
            data: {
              id: created.id,
              name,
              email,
              token,
            },
          });
      }
    }
  }
}
