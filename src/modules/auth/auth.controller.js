import User from "../../models/Users";
import bcrypt from "bcrypt";

class AuthController {

    async isUserExist(username, email) {
        let userExist;
        if(username && email) {
            userExist = await User.findOne({ email } || User.findOne({ username }));
        } else if(username) {
            userExist = await User.findOne({ username });
        } else if(email) {
            userExist = await User.findOne({ email });
        }
        if(userExist) return userExist;
        return false;
    }

    async hashPassword(password) {
        if(!password) {
            return null;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async validPass(user, password) {
        if(!password) {
            return null;
        }
        return await bcrypt.compare(password, user.password);
    }

}
const controller = new AuthController();
export default controller;