const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports = (emailType, context) => {
  const filePath = path.join(__dirname, `./emails/${emailType}.html`);
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const html = template(context);

  return {
    text: '',
    html
  };
};
