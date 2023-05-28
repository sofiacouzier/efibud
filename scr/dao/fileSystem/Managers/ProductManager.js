import fs from 'fs'


class ProductManager {
    constructor() {
        this.path = "../files/products.json";
    }
    //metodos


    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(data);

            return products
        }
        return []
    }



    addProducts = async ({ title, description, price, status = true, thumbnail, code, stock }) => {

        const products = await this.getProducts()

        const product = {
            title,
            description,
            price,
            status,
            thumbnail,
            code,
            stock
        }

        if (products.length === 0) {
            product.id = 1
        } else {
            product.id = products[products.length - 1].id + 1
        }

        const validateCode = products.find(e => e.code == code)

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("debe incluir todos los parametros")
        } else if (validateCode) {
            console.log("no puede repetir el codigo")
        } else {
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return product;
        }
    }



    getProductByID = async (id) => {
        const products = await this.getProducts()
        if (!id) {
            console.log("debe ingresar un id")
        } else {
            let product = products.find(product => product.id == id);
            if (product) {
                console.log("existe el producto");
                return product
            } else {
                return null
                console.error("not found")
            }
        }

    }

    updateProduct = async (id, updatedFields) => {

        try {
            const products = await this.getProducts();
            const index = products.findIndex((prod) => prod.id === id);//encuentra el producto y su index (getElementByID no sirve)
            if (index === -1) {
                throw new Error('Not found');
            } else {

                const productToUpdate = {
                    ...products[index],//de todos los products toma el que encontro arriba
                    ...updatedFields
                };//de todos los keys toma el que yo le doy y lo cambia (por estar mas abajo ->destructioning)

                products[index] = productToUpdate;// toma el objeto y lo cambia por el de arriba
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));//reescribe el archivo
                return productToUpdate;
            }
        } catch (error) {
            console.error(error);
        }
    }


    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex((prod) => prod.id === id);//encuentra el producto y su index (el splice funciona con index, o con id)
        products.splice(index, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));//reescribe el archivo

        return { message: `el producto id n: ${id} ha sido eliminado` }
    }



}

export default ProductManager
// const productManager = new ProductManager();
// const context = async () => {
//     const prueba = await productManager.getProducts();
//     await productManager.addProducts("uno", "el primero", 100, "www.algo.com", 123, 7);
//     await productManager.addProducts("DOS", "el primero", 100, "www.algo.com", 2345, 7);
//     const nuevatest = await productManager.getProducts();
//     console.log(nuevatest)
//     const updateProd = await productManager.updateProduct(1, { thumbnail: "prueba" })
//     console.log("se realizo el update con exito", updateProd)
//     //const eliminar = await productManager.deleteProduct(1);
// }

// context()
