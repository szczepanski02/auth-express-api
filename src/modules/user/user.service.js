import User from "../../models/Users";

class UserService {
    async getUserId(req, res) {
        const userObj = await User.findOne({ username: req.params.username });
        if(!userObj) {
            return res.status(404);
        } else {
            const searchingId = userObj._id;
            return res.send(searchingId);
        }
    }

    async getUserById(req, res) {
        const searchingUser = await User.findById(req.params._id);
        if(!searchingUser) {
            return res.status(404);
        } else {
            return res.json(searchingUser);
        }
    }
}

const service = new UserService();
export default service;