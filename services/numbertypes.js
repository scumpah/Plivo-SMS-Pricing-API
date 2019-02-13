/**
 * POST endpoint for creation of numbertypes
 * DELETE
 * PUT for updation
 * GET
 */

// const Joi = require('joi');
const router = require('express').Router();
const logger = require('../lib/logger');
const Joi = require('joi');
const NumberTypes = require('../model/numbertypes');


const numberTypeSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
})
  .unknown(false)
  .required();

async function createNumberType(numbertype) {
  const numberType = new NumberTypes(numbertype);
  return numberType.save();
}

async function createNumberTypeController(req, res) {
  try {
    const { error, value: body } = Joi.validate(req.body, numberTypeSchema);
    if (error) {
      res.sendStatus(400);
      return;
    }
    const savedNumberType = await createNumberType(body);
    res.status(201).json(savedNumberType);
  } catch (e) {
    logger.error(`createNumberTypeController: ${e.stack}`);
    res.sendStatus(500);
  }
}

async function getNumberTypesController(req, res) {
  try {
    let page = 0;
    let limit = 10;
    if (req.query.page) {
      ({ page } = req.query);
    }
    if (req.query.limit) {
      ({ limit } = req.query);
    }
    const numberTypesList = await NumberTypes.find().skip(page * limit).limit(limit).exec();
    res.json(numberTypesList);
  } catch (e) {
    logger.error(`getNumberTypesController: ${e.stack}`);
    res.sendStatus(500);
  }
}

async function getNumberTypeByCodeController(req, res) {
  try {
    const code = req.params.code;
    const doc = await NumberTypes.findOne({code}).exec();
    if (doc) {
      res.json(doc);
      return;
    }
    res.sendStatus(204);
  } catch (e) {
    logger.error(`getNumberTypeByCodeController: ${e.stack}`);
    res.sendStatus(500);
  }
}

router.route('/').get(getNumberTypesController);

router.route('/').post(createNumberTypeController);

router.route('/:code').get(getNumberTypeByCodeController);

module.exports = router;
