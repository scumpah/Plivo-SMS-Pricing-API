/**
 * POST endpoint for creation of pricings
 * DELETE
 * PUT for updation
 * GET
 */

// const Joi = require('joi');
const router = require('express').Router();
const logger = require('../lib/logger');
const Joi = require('joi');
const Pricing = require('../model/pricing');


const pricingSchema = Joi.object({
  numberTypeCode: Joi.string().required(),
  countryCode: Joi.string().required(),
  price: Joi.number().required(),
})
  .unknown(false)
  .required();

  const pricingSchemaRequest = Joi.object({
    numberTypeCode: Joi.string().required(),
    countryCode: Joi.string().required(),
    smsType: Joi.string().required(),
    number: Joi.number().required(),
  })
    .unknown(false)
    .required();

    /*
    Joi validator for pricing response schema
    const pricingResponseSchema = Joi.object({
        numberTypeCode: Joi.string().required(),
        countryCode: Joi.string().required(),
        inboundSmsPrice: Joi.number().required().default(0),
        outboundSmsPrice: Joi.number().required().default(0),
      })
        .unknown(false)
        .required(); 
      */

async function createPricing(price) {
  const Price = new Pricing(price);
  return Price.save();
}

async function getCalculatedPricings(pricings, body) {
    const calculatedpricings = [];
        pricings.forEach(pricing => {
            // let pricingresponse = new pricingResponseSchema();
            let pricingresponse = {};
            pricingresponse.numberTypeCode = body.numberTypeCode;
            pricingresponse.countryCode = body.countryCode;
            if(body.smsType === 'inbound') {
                pricingresponse.inboundSmsPrice = body.number * pricing.price;
                pricingresponse.outboundSmsPrice = 0;
            } else if(body.smsType === 'outbound') {
                pricingresponse.inboundSmsPrice = 0;
                pricingresponse.outboundSmsPrice = body.number * pricing.price;
            } else {
                pricingresponse.inboundSmsPrice = body.number * pricing.price * 0.3;
                pricingresponse.outboundSmsPrice = body.number * pricing.price * 0.7;
            }
            calculatedpricings.push(pricingresponse);
        });
    return calculatedpricings;
}

async function getPriceByParams(body) {
    return Pricing.find({ countryCode: body.countryCode }).lean();
  }

async function createPricingController(req, res) {
  try {
    const { error, value: body } = Joi.validate(req.body, pricingSchema);
    if (error) {
      res.sendStatus(400);
      return;
    }
    const savedPricing = await createPricing(body);
    res.status(201).json(savedPricing);
  } catch (e) {
    logger.error(`createPricingController: ${e.stack}`);
    res.sendStatus(500);
  }
}

async function getPricingsController(req, res) {
  try {
    let page = 0;
    let limit = 10;
    if (req.query.page) {
      ({ page } = req.query);
    }
    if (req.query.limit) {
      ({ limit } = req.query);
    }
    const pricingList = await Pricing.find().skip(page * limit).limit(limit).exec();
    res.json(pricingList);
  } catch (e) {
    logger.error(`getPricingsController: ${e.stack}`);
    res.sendStatus(500);
  }
}


async function getCalculatedPricingController(req, res) {
    try {
        const { error, value: body } = Joi.validate(req.body, pricingSchemaRequest);
        if (error) {
          res.sendStatus(400);
          return;
        }
        if(req.body.smsType !=='' && req.body.number !== 0) {
            const pricings = await getPriceByParams(body);
            const calculatedpricings = getCalculatedPricings(pricings, body);
            let result = [];
            console.log(calculatedpricings);
            calculatedpricings.then(ob=> {result= ob;
              res.status(200).json(result);
            })
        } else {
            res.status(200).json({"message": "Not a valid input"});
        }
      } catch (e) {
        logger.error(`getCalculatedPricingController: ${e.stack}`);
        res.sendStatus(500);
      }
}

router.route('/').get(getPricingsController);

router.route('/').post(createPricingController);

router.route('/calculatepricing').post(getCalculatedPricingController);

module.exports = router;
