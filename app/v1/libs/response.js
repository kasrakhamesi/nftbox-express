const response = ({status : status , content : content} , res) => {
    return res.status(status).send(content)
}

module.exports = response