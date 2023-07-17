export default class TokenDTO {
    constructor(user) {
        this.name = `${user.firstName}  ${user.lastName}`,
            email = user.email,
            role = user.role,
            id = user._id
    }
}


