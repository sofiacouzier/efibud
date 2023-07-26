export const productErrorIncompleteValues = (product) => {
    return `uno o mas parametros obligatorios no fueron proporcionados: title(se recibio ${product.title}), description(se recibio ${product.description}), price(se recibio ${product.price}), thumbnail(se recibio ${product.thumbnail}), stock (se recibio ${product.stock})`
}

export const noStock = (product) => {
    return ` el producto ${product.title} no tiene mas stock`
}