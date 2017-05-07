const fs = require('fs');
const db = require('../config/db');

// let files = fs.readdirSync(__dirname + '/models');
let files = fs.readdirSync(__dirname);

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + "/" + f);
    console.log(module.exports);
}



// const Sequelize = require('sequelize');

// const config = require('./config/config');

// console.log('init sequelize...');

// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

// var Pet = sequelize.define('pets', {
//     id: {
//         type: Sequelize.STRING(50),
//         primaryKey: true
//     },
//     name: Sequelize.STRING(100),
//     gender: Sequelize.BOOLEAN,
//     birth: Sequelize.STRING(10),
//     createdAt: Sequelize.BIGINT,
//     updatedAt: Sequelize.BIGINT,
//     version: Sequelize.BIGINT
// }, {
//         timestamps: false
//     });

// var now = Date.now();
// (async () => {
//     var pets = await Pet.findAll();
//     console.log(`find ${pets.length} pets:`);
//     for (let p of pets) {
//         console.log(JSON.stringify(p));
//         console.log('update pet...');
//         p.name = 'meiminjun';
//         p.gender = true;
//         p.updatedAt = Date.now();
//         p.version ++;
//         await p.save();
//         if (p.version === 3) {
//             await p.destroy();
//             console.log(`${p.name} was destroyed.`);
//         }
//     }
// })();

