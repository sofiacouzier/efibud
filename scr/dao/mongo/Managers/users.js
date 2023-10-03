import userModel from "../models/users.js";

export default class UsersManager {
    getUsers = (params) => {
        return userModel.find(params, " first_name last_name email role").lean();
    };

    getUserBy = (params) => {
        return userModel.findOne(params).lean();
    };

    createUser = (user) => {
        return userModel.create(user);
    };

    updateUser = (id, user) => {
        return userModel.findByIdAndUpdate(id, { $set: user });
    };
    getExpiredUsers = (params) => {
        return userModel.find(params).lean();
    };

    deleteUser = (id) => {
        return userModel.findByIdAndDelete(id);
    };

}