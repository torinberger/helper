
const applications = require('./targets.json');
console.log(applications);
const koa = require('koa');
const router = require('koa-joi-router');
const cors = require('@koa/cors');
const fs = require('fs');
const Joi = router.Joi;

const public = router();

public.get('/status', async (ctx) => {
  ctx.body = applications;
});

public.get('/', async (ctx) => {
  ctx.status = 200
  let page = fs.readFileSync('./dashboard/dash.html')
  ctx.body = String(page);
})

public.route({
  method: 'post',
  path: '/ping',
  validate: {
    body: {
      name: Joi.string().max(100)
    },
    type: 'json'
  },
  handler: async (ctx) => {
    let post = ctx.request.body;
    console.log(post);
    let target = post.name;
    for (var n = 0; n < applications.length; n++) {
      if (applications[n].name == target) {
        applications[n].online = true;
        applications[n].timer = 20
        ctx.status = 200;
        return;
      }
    }
    ctx.status = 404;
  }
});

setInterval(function () {
  for (var i = 0; i < applications.length; i++) {
    if (applications[i].timer > 0) {
      applications[i].timer -= 1;
    }
    if (applications[i].timer == 0) {
      applications[i].online = false
    }
  }
}, 1*1000);

const app = new koa();
app.use(cors())
app.use(public.middleware());
app.listen(3000);
