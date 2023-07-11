export default class UserService {
    constructor(dao) {
        this.dao = dao;
    }

    getAllUsers = () => {
        return this.dao.getUsers();
    }

    createUser = (user) => {
        return this.dao.saveUser(user);
    }
}