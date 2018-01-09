const compilePug = require('./util/compile_pug');

// eslint-disable-next-line import/prefer-default-export
export const generateBizForm = (event, context, callback) => {
  const params = JSON.parse(event.body);
  const { templateName, templateParams, responseType } = params;
  const path = `${templateName}/template.pug`;
  const html = compilePug(path, templateParams);

  let body = '';
  let headers = {};
  // default responseType
  if (responseType === undefined || responseType === 'json') {
    body = JSON.stringify({
      html,
    });
    headers = {
      'Content-type': 'application/json;charset=UTF-8',
    };
  } else if (responseType === 'plain') {
    body = html;
    headers = {
      'Content-type': 'application/text;charset=UTF-8',
    };
  } else {
    body = 'Unknow responseType is passed. See what responseType is acceptable on the API doc';
    headers = {
      'Content-type': 'application/text;charset=UTF-8',
    };
  }
  const response = {
    statusCode: 200,
    headers,
    body,
  };
  callback(null, response);
};
