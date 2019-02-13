const mongoose = require('mongoose');

const { Schema } = mongoose;

const countrySchema = new Schema({
countryName: {
    required: true,
    type: Schema.Types.String,
  },
  countryCode: {
    required: true,
    type: Schema.Types.String,
  },
  currencyType: {
    required: true,
    type: Schema.Types.String,
  },
});

const country = mongoose.model('country', countrySchema);

module.exports = country;
