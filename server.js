const app = require('./lib/app');
require('dotenv').config();
const port = 3000;

app.listen(port, () => {
  console.log('listening on 3000');
});
