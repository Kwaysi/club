import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ModifiedRequest } from '../types';

const authenticate = (req: ModifiedRequest, res: Response, next) => {
  const { token = '' } = req.cookies;

  if (!token) {
    res.status(400).json({ status: false, msg: 'Invalid Token' });
  } else {
    jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: false, msg: 'Invalid Token' });
      }

      req.email = decoded.email;
      req.userId = decoded.userId;
      return next();
    });
  }
};

export default authenticate;
