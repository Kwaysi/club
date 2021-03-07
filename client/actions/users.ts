import { AxiosError } from 'axios';
import { setCookie } from 'nookies';
import conn from './connection';

export const login = ({ data, callback }) => {
  conn
    .post('/api/user/login', data)
    .then((r) => {
      setCookie(null, 'id', r.data.data.id);
      setCookie(null, 'name', r.data.data.name);
      setCookie(null, 'email', r.data.data.email);
      setCookie(null, 'token', r.data.data.token);
      callback(r.data.status, r.data.data);
    })
    .catch((e: AxiosError) => {
      if (e.response) {
        callback(e.response.data.status, e.response.data.message);
      } else {
        callback(false, 'An error occured');
      }
    });
};

export const createUser = ({ data, callback }) => {
  conn
    .post('/api/user/register', data)
    .then((r) => {
      setCookie(null, 'id', r.data.data.id);
      setCookie(null, 'name', r.data.data.name);
      setCookie(null, 'email', r.data.data.email);
      setCookie(null, 'token', r.data.data.token);
      callback(r.data.status, r.data.data);
    })
    .catch((e: AxiosError) =>
      callback(e.response.data.status, e.response.data.message),
    );
};
