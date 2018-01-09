const moment = require('moment');

module.exports = (path, _local) => {
  const local = _local;
  local.moment = moment;
  // eslint-disable-next-line
  const template = require(`../templates/${path}`);
  return template(local);
};
