// controllers/user.js

const model = require('../models/model');


const APIError = require('../middleware/rest').APIError;
let Pet = model.pets;
console.log("----")
console.log(Pet);

module.exports = {
    'GET /api/': async (ctx, next) => {
  			ctx.rest({
          products: await Pet.Pets.findAll()
      	});
    },
    'GET /api/user/:id': Pet.findUser,
    // 'GET /api/user/:name': Pet.getUserByName,
    'GET /api/list': Pet.findList,
    'POST /api/user':Pet.postUserAuth,
    'GET /api/todolist/:id': Pet.getTodolistById,
    'POST /api/addTodolist':Pet.createTodolist,
    'DELETE /api/removeTodolist/:userId/:id':Pet.removeTodolist,
    'PUT /api/updateTodolist/:userId/:id/:status':Pet.updateTodolist,
};
