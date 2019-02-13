/**
 * POST endpoint for creation of countries
 * DELETE
 * PUT for updation
 * GET
 */

// const Joi = require('joi');
const router = require('express').Router();
const logger = require('../lib/logger');
const Joi = require('joi');
const Country = require('../model/countries');


const countrySchema = Joi.object({
  countryName: Joi.string().required(),
  countryCode: Joi.string().required(),
  currencyType: Joi.string().required(),
})
  .unknown(false)
  .required();

async function createCountry(country) {
  const newcountry = new Country(country);
  return newcountry.save();
}

async function createCountryController(req, res) {
  try {
    const { error, value: body } = Joi.validate(req.body, countrySchema);
    if (error) {
      res.sendStatus(400);
      return;
    }
    const savedCountry = await createCountry(body);
    res.status(201).json(savedCountry);
  } catch (e) {
    logger.error(`createCountryController: ${e.stack}`);
    res.sendStatus(500);
  }
}

async function getCountriesController(req, res) {
  try {
    let page = 0;
    let limit = 10;
    if (req.query.page) {
      ({ page } = req.query);
    }
    if (req.query.limit) {
      ({ limit } = req.query);
    }
    const countryList = await Country.find().skip(page * limit).limit(limit).exec();
    res.json(countryList);
  } catch (e) {
    logger.error(`getCountriesController: ${e.stack}`);
    res.sendStatus(500);
  }
}

async function getCountryByCodeController(req, res) {
  try {
    const countryCode = req.params.code;
    const doc = await Country.findOne({countryCode}).exec();
    if (doc) {
      res.json(doc);
      return;
    }
    res.sendStatus(204);
  } catch (e) {
    logger.error(`getCountryByCodeController: ${e.stack}`);
    res.sendStatus(500);
  }
}

router.route('/').get(getCountriesController);

router.route('/').post(createCountryController);

router.route('/:code').get(getCountryByCodeController);

module.exports = router;
