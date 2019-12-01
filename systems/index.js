
const applications = require('./targets.json');
console.log(applications);
const koa = require('koa');
const router = require('koa-joi-router');
const Joi = router.Joi;

const public = router();

public.get('/status', async (ctx) => {
  ctx.body = applications;
});

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
        ctx.status = 200;
        return;
      }
    }
    ctx.status = 404;
  }
});

setInterval(function () {
  for (var i = 0; i < applications.length; i++) {
    applications[i].online = false;
  }
}, 20*1000);

const app = new koa();
app.use(public.middleware());
app.listen(3000);
