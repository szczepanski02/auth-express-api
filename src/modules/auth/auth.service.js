import controller from "./auth.controller";
import User from "../../models/Users";
import jwt_service from "../auth-jwt/auth-jwt.service";

class AuthService {

    async register(req, res) {
        const { username, password, email } = req.body;
        const hashedPassword = await controller.hashPassword(password);
        if(hashedPassword === null) return res.status(400).send('Cannot create hashed password!');
        const user = new User({ username, password: hashedPassword, email });

        const isExists = await controller.isUserExist(username, email);
        if(isExists) {
            return res.status(400).send("This user already exists!"); // resource doesn't exists
        }
        try {
            await user.save();
        } catch(error) {
            return res.status(400).send("Erorr: " + error) // bad request;
        }

        // access token
        const token = await jwt_service.generateNewAccessToken(username);
        const refreshToken = await jwt_service.generateRefreshAccessToken(username);

        return res.status(201).json({ token, refreshToken });
    }

    async login(req, res) {
        let user;
        if(req.body.username) {
            user = await controller.isUserExist(req.body.username, undefined);
        } else if(req.body.email) {
            user = await controller.isUserExist(undefined, req.body.email);
        }
        if(!user) {
            return res.status(400).send("User doesn't exists!");
        }
        const validPass = await controller.validPass(user, req.body.password);
        if(!validPass) {
            return res.status(400).send("Invalid password!");
        }
        return res.status(200).send('Logged in!');
    }

    async checkRefreshToken(req, res) {
        const { token } = req.body;
        const authenticatedUser = await User.findOne({ refresh_token: token });
        if(!authenticatedUser) {
            return res.sendStatus(403);
        }

        const newAccessToken = await jwt_service.generateNewAccessToken(authenticatedUser.username);
        res.status(200).json({"access_token:": newAccessToken});
    }

    async verify(req, res) {
        return res.status(200).send('Verify user by token');
    }
}

const service = new AuthService();
export default service;