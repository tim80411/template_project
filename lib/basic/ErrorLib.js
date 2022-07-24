/**
 * 介面縮減message為msg，但在此處與原本的error通用message
 */
class BasicError extends Error {
  constructor({
    code = 400,
    data = {},
    message = 'error happened',
    requestId = '',
    type = '',
  }) {
    super(message);
    this.ok = false;
    this.code = code;
    this.data = data;
    this.message = message;
    this.requestId = requestId;
    this.type = type;
  }
}

/**
 * 當參數不合規範時
 */
class InvalidValueError extends BasicError {
  constructor({
    msg = 'Invalid value',
    data = {},
    requestId = '',
  }) {
    super({
      code: 409,
      data,
      requestId,
      message: msg,
      type: 'InvalidValue',
    });
  }
}

module.exports = {
  InvalidValueError,
};
