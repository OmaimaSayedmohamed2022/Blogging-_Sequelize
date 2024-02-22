
const validator = require('validator');

function validateEmail(email) {
  return validator.isEmail(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return passwordRegex.test(password);
}

function validateString(data) {
  return typeof data === 'string';
}

module.exports = {
    validateEmail,
    validatePassword,
    validateString,
 
  };