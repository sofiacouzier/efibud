export const userErrorIncompleteValues = (user) => {
    return `uno o mas parametros obligatorios no fueron proporcionados:
    * firstName: se esperaba una cadena definida, y se recibió ${user.firstName};
        * email: se esperaba una cadena definida, y se recibió ${user.email};
        * password: se esperaba una cadena definida, y se recibió ${user.password};`
}