import { AxiosError } from 'axios';
import conn from './connection';

export const getUserGroups = ({ callback }) => {
  conn
    .get('/api/groups')
    .then((r) => callback(r.data.status, r.data.data))
    .catch((e: AxiosError) =>
      callback(e.response.data.status, e.response.data.message),
    );
};

export const getGroupById = ({ data, callback }) => {
  conn
    .get(`/api/groups/${data}`)
    .then((r) => callback(r.data.status, r.data.data))
    .catch((e: AxiosError) =>
      callback(e.response.data.status, e.response.data.message),
    );
};

export const createGroup = ({ data, callback }) => {
  conn
    .post('/api/groups/create', data)
    .then((r) => callback(r.data.status, r.data.data))
    .catch((e: AxiosError) =>
      callback(e.response.data.status, e.response.data.message),
    );
};

export const joinGroup = ({ data, callback }) => {
  conn
    .get(`/api/groups/join/${data}`)
    .then((r) => callback(r.data.status, r.data.data))
    .catch((e: AxiosError) =>
      callback(e.response.data.status, e.response.data.message),
    );
};

export const removeUser = ({ data, callback }) => {
  conn
    .delete(`/api/groups/${data.groupId}/${data.userId}`)
    .then((r) => callback(r.data.status, r.data.data))
    .catch((e: AxiosError) =>
      callback(e.response.data.status, e.response.data.message),
    );
};
