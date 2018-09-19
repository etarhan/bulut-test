const path = require('path');
const { spawn } = require('child-process-promise');
const spawnOptions = { stdio: 'inherit' };
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
(async () => {
  // Our database URL
  const url = `${config.dialect}://${config.username}:${config.password}@${config.host}:5432/${config.database}`
try {
    try {
        await spawn('./node_modules/.bin/sequelize', ['db:drop', `--url=${url}`], spawnOptions);
    } catch (error) {
        await spawn('./node_modules/.bin/sequelize', ['db:create', `--url=${url}`], spawnOptions);
    }
    await spawn('./node_modules/.bin/sequelize', ['db:migrate', `--url=${url}`], spawnOptions);
    await spawn('./node_modules/.bin/sequelize', ['db:seed:all', `--url=${url}`], spawnOptions);
    console.log('*************************');
    console.log('Migration successful');
  } catch (err) {
    // Oh no!
    console.log('*************************');
    console.log('Migration failed. Error:', err.message);
    process.exit(1);
  }
process.exit(0);
})();