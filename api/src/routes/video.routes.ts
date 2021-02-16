import { Router } from 'express';
import { authenticate } from 'passport';
import * as videoCtrl from './videos.controler';
const router = Router();

router.post('/videos/:id', authenticate('jwt', {session: false}), videoCtrl.createVideo);

router.get('/video/:id', authenticate('jwt', {session: false}), videoCtrl.getVideo);

router.get('/videos/:id', authenticate('jwt', {session: false}), videoCtrl.getVideos);

router.put('/videos/:id', authenticate('jwt', {session: false}), videoCtrl.updateVideo);

router.delete('/videos/:id', authenticate('jwt', {session: false}), videoCtrl.deleteVideo);

router.put('/user/:id', authenticate('jwt', {session: false}), videoCtrl.updateUser);

export default router;