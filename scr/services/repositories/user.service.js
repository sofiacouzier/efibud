export default class UserService {
    constructor(dao) {
        this.dao = dao;
    }
    deleteExpired = (id) => {
        return this.dao.deleteExpired(id)
    }
    getUsers = () => {
        return this.dao.getUsers();
    }
    getUserBy = (params) => {
        return this.dao.getUserBy(params)
    }
    createUser = (user) => {
        return this.dao.createUser(user);
    }
    updateUser = (id, user) => {
        return this.dao.updateUser(id, user);
    }
    getExpiredUsers = () => {
        return this.dao.getExpiredUsers();
    }
    deleteUser = (id) => {
        return this.dao.deleteUser(id);
    }
}