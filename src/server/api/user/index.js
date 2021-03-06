import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/list', controller.list);
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.put('/me', auth.isAuthenticated(), controller.update);

export default router;
