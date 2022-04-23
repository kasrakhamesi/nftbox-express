module.exports = (req, res) => {
    res.status(401).send({ message: 'Unauthurized' })
}
