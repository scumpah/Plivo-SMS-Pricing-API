const mongoose = require('mongoose');

const { Schema } = mongoose;

const pricingSchema = new Schema({
  numberTypeCode: {
    required: true,
    type: Schema.Types.String,
  },
  countryCode: {
    required: true,
    type: Schema.Types.String,
  },
  inboundprice: {
    required: true,
    type: Schema.Types.Number,
  },
  outboundprice: {
    required: true,
    type: Schema.Types.Number,
  },
});

const pricing = mongoose.model('pricing', pricingSchema);

module.exports = pricing;
