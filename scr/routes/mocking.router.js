import { Router } from "express";
import { generateProduct } from "../mocks/products.mock.js";

const router = Router();

router.get('/mockigproducts', (req, res) => {
    const users = [];
    //Endpoint que devolverá 100 usuarios de prueba.
    for (let i = 0; i < 100; i++) {
        users.push(generateProduct());
    }
    res.send({ status: "success", payload: users })
})

export default router;