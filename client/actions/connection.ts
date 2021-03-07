import Axios from 'axios';

const conn = (() => {
  const conn = Axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
  });
  return conn;
})();

export const sConn = (token) => {
  const conn = Axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
  });

  conn.defaults.headers.common['cookie'] = `token=${token}`;
  return conn;
};

export default conn;
