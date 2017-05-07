const db = require('../config/db.js'),
			userModel = '../schema/pets.js', // 引入user的表结构
      user = '../schema/user.js',
      list = '../schema/list.js';
const Pets = db.Pets.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。
const User = db.Pets.import(user);
const List = db.Pets.import(list);

const jwt = require('koa-jwt');
var now = Date.now();

/**
 * 查
 */
const getTodolistById = async (ctx, next) => {
    console.log(`get product ${ctx.params.id}...`);
    let id = ctx.params.id;
    ctx.rest({
      data: await List.findAll({
        where: {
          user_id:id
        },
        attributes: ['id','content','status'] // 只需返回这三个字段的结果即可
      })
    });
};

/**
 * 增
 */
const createTodolist = async (ctx, next) => { // 给某个用户创建一条todolist
  const data = ctx.request.body;
  await List.create({
    user_id: data.id, // 用户的id，用来确定给哪个用户创建
    content: data.content,
    status: data.status
  });
  ctx.rest({
    ret_code:'000000'
  })
}

/**
 * 删除
 */
const removeTodolist = async (ctx, next) => {
  const id = ctx.params.id;
  const user_id = ctx.params.userId;
  const result =  await List.destroy({
      where: {
        id,
        user_id
      }
    });
  if(result > 0) {
    ctx.rest({
      ret_code:"000000"
    })
  }else{
    ctx.rest({
      ret_code:"90001",
      ret_mst:"删除失败"
    })
  }
}

/**
 * 更改
 */
const updateTodolist = async (ctx, next) => {
  const user_id = ctx.params.userId;
  const status = ctx.params.status;
  const id = ctx.params.id;
  const result = await List.update({
    status
  },{
    where: {
      id,
      user_id
    }
  })
  console.log(`-------${result}`);
  if(result > 0) {
    ctx.rest({
      ret_code:"000000"
    })
  }else{
    ctx.rest({
      ret_code:"90001",
      ret_mst:"更新失败"
    })
  }
}

var findUser = async (ctx, next) => {
    console.log(`get product ${ctx.params.id}...`);
    let id = ctx.params.id;
    ctx.rest({
      products: await User.findOne({
        where: {
          id:id
        }
      })
    });
    // var pets = await Pets.findAll();
    // console.log(`find ${pets.length} pets:`);
    // for (let p of pets) {
    //     console.log(JSON.stringify(p));
    // //     console.log('update pet...');
    //     p.name = 'f';
    // //     p.gender = true;
    // //     p.updatedAt = Date.now();
    // //     p.version ++;
    //     await p.save();
    // }
    // console.log(JSON.stringify(pets));

    // return pets;
};

const getUserByName = async (n) => {
  console.log(`***Name****${n}`)
  console.log(`***Name****${n}`)
  console.log(`***Name****${n}`)
  console.log(`***Name****${n}`)
  const name = n;
  const userInfo = await User.findOne({
    where: {
      user_name:name
    }
  });
  return userInfo
}


const postUserAuth = async (ctx,next) => {
  const data = ctx.request.body;
  console.log(`***-name-***${data.name}`)
  console.log(`***--***${JSON.stringify(data)}`)
  const userInfo = await getUserByName(data.name);
  console.log(`***-userInfo-*** ${JSON.stringify(userInfo)}`);
  if(userInfo != null){ // 如果查无此用户会返回null
    if(userInfo.password != data.password){
      ctx.rest({
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      });
    }else{ // 如果密码正确
      console.log("密码正确")
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断token合法性的标志
      const token = jwt.sign(userToken,secret); // 签发token
      ctx.rest({
        success: true,
        token: token, // 返回token
      });
    }
  }else{
    ctx.rest({
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    });
  }
}

var findList = async (ctx,next) => {
  ctx.rest({
    products: await List.findAll()
  });
}



// const getUserById = async () => {
//     var pets = await Pets.findAll();
//     console.log(`find ${pets.length} pets:`);
//     return pets;
//     // for (let p of pets) {
//     //     console.log(JSON.stringify(p));
//     //     console.log('update pet...');
//     // }
// };

module.exports = {
  // creatData,  // 导出getUserById的方法，将会在controller里调用
  // getData,
  findUser,
  findList,
  postUserAuth,
  Pets,
  createTodolist,
  removeTodolist,
  updateTodolist,
  getTodolistById
}
