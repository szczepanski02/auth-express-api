import jwt from 'jsonwebtoken';
import User from '../../models/Users';

class AuthJwtService {

    async generateNewAccessToken(username) {
        const user = await User.findOne({ username });
        const payload = { _id: user._id, username: user.username, email: user.email };

        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '15m' });
    }

    async generateRefreshAccessToken(username) {
        const user = await User.findOne({ username });
        const payload = { _id: user._id };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        const userWithTokenUpdate = await User.findOneAndUpdate({ username }, { refresh_token: token });
        try {
            userWithTokenUpdate.save();
        } catch (error) {
            return res.status(400).send(error);
        }
        return token;
    }
}

const jwt_service = new AuthJwtService();
export default jwt_service;