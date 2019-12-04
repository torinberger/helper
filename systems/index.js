
const applications = require('./targets.json');
console.log(applications);
const koa = require('koa');
const router = require('koa-joi-router');
const cors = require('@koa/cors');
const fs = require('fs');
var   os = require("os");
const Joi = router.Joi;

function cpuAverage() {
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

  for(var i = 0, len = cpus.length; i < len; i++) {
    var cpu = cpus[i];
    for(type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  }
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

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
      name: Joi.string().max(100),
      err: Joi.string(),
      deploy: Joi.string()
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
        if (post.err) {
          applications[n].errors.push(post.err)
        }
        if (post.deploy) {
          applications[n].deploys.push(post.deploy)
        }
        ctx.status = 200;
        return;
      }
    }
    ctx.status = 404;
  }
});

public.route({
  method: 'get',
  path: '/cpu',
  handler: (ctx) => new Promise(function(resolve, reject) {
    var startMeasure = cpuAverage();
    setTimeout(function() {
      ctx.status = 200
      var endMeasure = cpuAverage();
      var idleDifference = endMeasure.idle - startMeasure.idle;
      var totalDifference = endMeasure.total - startMeasure.total;

      var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
      ctx.body = String(percentageCPU + "%");
      resolve();
    }, 100);
  })
})

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
