/**
 * 介面縮減message為msg，但在此處與原本的error通用message
 */
class BasicError extends Error {
  constructor({
    code = 400,
    data = {},
    message = 'error happened',
    type = '',
  }) {
    super(message);
    this.code = code;
    this.data = data;
    this.message = message;
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
  }) {
    super({
      code: 409,
      data,
      message: msg,
      type: 'InvalidValue',
    });
  }
}

module.exports = {
  InvalidValueError,
};
