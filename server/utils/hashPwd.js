const bcrypt = require("bcryptjs");

module.exports = {
  hashPw: (pw) => {
    const salt = bcrypt.genSaltSync(10);
    const pwHash = bcrypt.hashSync(pw, salt);
    return pwHash;
  },

  comparePw: (pw, raw) => {
    const isMatch = bcrypt.compareSync(pw, raw);
    return isMatch;
  },
};
