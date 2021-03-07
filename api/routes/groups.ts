import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import {
  createGroup,
  getGroupById,
  joinGroup,
  listUserGroups,
  removeUserFromGroup,
} from '../controllers/groups';

const routes = Router();

routes.get('/', authenticate, listUserGroups);
routes.get('/join/:id', authenticate, joinGroup);
routes.post('/create', authenticate, createGroup);
routes.get('/:id', authenticate, getGroupById);
routes.delete('/:groupId/:userId', authenticate, removeUserFromGroup);

export default routes;
