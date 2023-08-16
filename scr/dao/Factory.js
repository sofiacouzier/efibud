import mongoose from 'mongoose';
import config from '../config/config.js';

//A partir de esa variable, definirá qué DAO tomar.
export default class PersistenceFactory {
    static async getPersistence() {
        let usersDAO;
        //console.log(config);
        switch (config.app.PERSISTENCE) {
            case "FS":

                break;
            case "SQL":
                break;
            case "MONGO":
                mongoose.connect(config.mongo.URL)
                const { default: MongoDAO } = await import('./mongo/Managers/users.js')
                usersDAO = new MongoDAO();
                break;
        }
        return usersDAO;
    }

}