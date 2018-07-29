const bcrypt = require('bcrypt');

async function run() {
  const solt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('1234', solt);
  console.log(hashed);
}
run();
