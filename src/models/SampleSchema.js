const BasicSchema = require('src/models/BasicSchema');

const fields = {

};

const schema = new BasicSchema(fields);

module.exports = schema;

/**
 * @api {Schema} /samples Sample Schema
 * @apiSampleRequest off
 * @apiName SchemaSample
 * @apiGroup 0_Schema
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Schema Fields
 *
 *
 * _id: ObjectId,
 * disabled: {type: Boolean, default: false},
 * createdAt: {type: Date, default: Date.now},
 * updatedAt: Date,
 */
