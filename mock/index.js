const login = require("./login.js");
const plc = require("./plc.js");
module.exports = {
  // ...login,
  ...plc
};
