

export default (error, req, res, next) => {
    //toma todo los errors y se asegura de que no caiga el servidor

    res.status(200).send({ status: "error", error: error.message })

}