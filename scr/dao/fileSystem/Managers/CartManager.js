import fs from 'fs'
import ProductManager from './ProductManager.js';

const pm = new ProductManager

class CartManager {
    constructor() {
        this.path = "./files/cart.json";
    }
    //metodos


    getCart = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const carts = JSON.parse(data);
            return carts
        }
        return []
    }


    createCart = async () => {

        const Carts = await this.getCart()

        const carts = {
            products: [],
        }

        if (Carts.length === 0) {
            carts.id = 1
        } else {
            carts.id = Carts[Carts.length - 1].id + 1
        }

        Carts.push(carts);
        await fs.promises.writeFile(this.path, JSON.stringify(Carts, null, "\t"));
        return carts;

    }



    getCartByID = async (id) => {
        const Cart = await this.getCart()
        if (!id) {
            console.log("debe ingresar un id")
        } else {
            let selectedcart = Cart.find(cart => cart.id == id);
            if (selectedcart) {
                console.log("existe el carrito");
                return selectedcart
            } else {
                return null
                console.error("not found")
            }
        }

    }

    // updateQuantity = async (cid, pid, nuevaCantidad) => {
    //     try {
    //         const carts = await this.getCart()
    //         let cart = carts.find(cart => cart.id === cid)
    //         const productos = cart.products

    //         const index = productos.findIndex((prod) => prod.productid === pid);//encuentra el producto y su index (getElementByID no sirve)


    //         const productUpdate = {
    //             ...productos[index],//de todos los products toma el que encontro arriba
    //             ...nuevaCantidad
    //         };//de todos los keys toma el que yo le doy y lo cambia (por estar mas abajo ->destructioning)

    //         productos[index] = productUpdate;// toma el objeto y lo cambia por el de arriba
    //         // console.log(cart)
    //         // carts.push(cart)
    //         // console.log(carts)

    //         await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));//reescribe el archivo
    //         return productUpdate;

    //     } catch (error) {
    //         console.error(error);
    //     }

    // }



    // addProductsToCart = async (cid, pid, quantity) => {
    //     const carts = await this.getCart()
    //     let cart = carts.find(cart => cart.id === cid)
    //     if (cart) {
    //         const prodToAdd = await pm.getProductByID(pid)
    //         //let prodToAdd = products.find(prodToAdd => prodToAdd.id === pid)
    //         if (prodToAdd) {

    //             const index = cart.products.find(product => product.productid === pid) //miro si existe el producto en el carrito
    //             //console.log(index)

    //             if (!index) {

    //                 const addedProd = {
    //                     "productid": prodToAdd.id,
    //                     "quantity": quantity
    //                 }
    //                 cart.products.push(addedProd);

    //                 await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

    //                 return cart
    //             } else {
    //                 const cantidad = index.quantity// si ya existe veo cual es la cantidad
    //                 const nuevaCant = cantidad + quantity// le sumo la cantidad que quizo agregar
    //                 const nuevaCantidad = { "quantity": nuevaCant }
    //                 const nuevp = await this.updateQuantity(cid, pid, nuevaCantidad)
    //                 return nuevp
    //             }

    //             //console.log(nuevaCantidad)



    //         } else {
    //             console.log("no existe el producto")
    //             return null

    //         }

    //     } else {
    //         console.log("carrito inexistente")
    //         return null
    //     }
    // }

    // updateProduct = async (id, updatedFields) => {

    //     try {
    //         const Cart = await this.getCart();
    //         const index = Cart.findIndex((prod) => prod.id === id);//encuentra el producto y su index (getElementByID no sirve)
    //         if (index === -1) {
    //             throw new Error('Not found');
    //         } else {

    //             const productToUpdate = {
    //                 ...Cart[index],//de todos los Cart toma el que encontro arriba
    //                 ...updatedFields
    //             };//de todos los keys toma el que yo le doy y lo cambia (por estar mas abajo ->destructioning)

    //             Cart[index] = productToUpdate;// toma el objeto y lo cambia por el de arriba
    //             await fs.promises.writeFile(this.path, JSON.stringify(Cart, null, 2));//reescribe el archivo
    //             return productToUpdate;
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    // deleteProduct = async (id) => {
    //     const Cart = await this.getCart();
    //     const index = Cart.findIndex((prod) => prod.id === id);//encuentra el producto y su index (el splice funciona con index, o con id)
    //     Cart.splice(index, 1)
    //     await fs.promises.writeFile(this.path, JSON.stringify(Cart, null, 2));//reescribe el archivo

    //     return { message: `el producto id n: ${id} ha sido eliminado` }
    // }



}

export default CartManager