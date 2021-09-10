import express from 'express';
import service from './user.service';

const router = express.Router();

router.get('/getUserId/:username', service.getUserId);
router.get('/getUserById/:_id', service.getUserById);

export default router;