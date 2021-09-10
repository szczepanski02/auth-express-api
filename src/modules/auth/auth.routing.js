import express from 'express';
import service from './auth.service';

const router = express.Router();

router.post('/register', service.register);
router.post('/login', service.login);
router.post('/verify', service.verify);
router.post('/refresh_token', service.checkRefreshToken);

export default router;