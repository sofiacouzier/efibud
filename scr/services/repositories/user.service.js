export default class UserService {
    constructor(dao) {
        this.dao = dao;
    }

    getAllUsers = () => {
        return this.dao.getUsers();
    }
    getUserBy = (params) => {
        return this.dao.getUserBy(params)
    }
    createUser = (user) => {
        return this.dao.createUser(user);
    }
}