export default class TokenDTO {
    constructor(user) {
        this.name = `${user.first_name}  ${user.last_name}`,
            this.email = user.email,
            this.role = user.role,
            this.id = user._id,
            this.cid = user.cart

    }
}


