const response = ({ status: status, content: content }, res) => {
    try {
        return res.status(status).send(content)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
}

module.exports = response
