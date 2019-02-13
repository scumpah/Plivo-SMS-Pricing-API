const mongoose = require('mongoose');

const { Schema } = mongoose;

const numberTypeSchema = new Schema({
  name: {
    required: true,
    type: Schema.Types.String,
  },
  code: {
    required: true,
    type: Schema.Types.String,
  },
});

const numberType = mongoose.model('numberType', numberTypeSchema);

module.exports = numberType;
