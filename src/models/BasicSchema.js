const mongoose = require('mongoose');
const _ = require('lodash');

class BasicSchema extends mongoose.Schema {
  constructor(fields) {
    const finalFields = {};
    const defaultFields = {
      disabled: { type: Boolean, default: false },
    };
    _.assign(finalFields, defaultFields, fields);

    // different between toJSON and toObject: https://github.com/Automattic/mongoose/issues/2072
    const defaultOption = {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    };

    super(finalFields, defaultOption);
    const schema = this;
    schema.index({ createdAt: -1 });
  }
}

module.exports = BasicSchema;
