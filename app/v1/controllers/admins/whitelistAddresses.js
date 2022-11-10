const { sequelize } = require('../../models')
const { restful, response } = require('../../libs')
const api = new restful(sequelize.models.whitelist_addresses, [
  'whitelist_addresses'
])
const _ = require('lodash')

module.exports = {
  create: async (req, res) => {
    let body = req.body
    delete body['id']
    return response(await api.Post({ body: body, req: req, res: res }), res)
  },
  update: async (req, res) => {
    const { id } = req.params
    let body = req.body
    delete body['id']

    const condition = {
      id: id
    }
    return response(
      await api.Put({ body: body, req: req, res: res, where: condition }),
      res
    )
  },
  findAll: async (req, res) => {
    return response(await api.Get({ res: res, req: req }), res)
  },
  findOne: async (req, res) => {
    const { id, address } = req.params
    const condition = address
      ? {
          address: address
        }
      : { id: id }
    return id
      ? response(await api.Get({ where: condition, res: res, req: req }), res)
      : api
          .Get({
            where: condition,
            res: res,
            req: req,
            checkJwt: false,
            checkRole: false
          })
          .then((result) => {
            return _.isEmpty(result.content.rows[0])
              ? res.status(404).send({ message: "Can't find this data." })
              : res.status(200).send(result.content.rows[0])
          })
          .catch((e) => {
            return res
              .status(400)
              .send({ message: e?.errors[0]?.message || e.message })
          })
  },
  delete: async (req, res) => {
    const { id } = req.params
    return response(
      await api.Delete({ where: { id: id }, req: req, res: res }),
      res
    )
  }
}
