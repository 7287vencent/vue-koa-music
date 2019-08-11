const Koa = require('koa')
// const glob = require('glob')
const path = require('path')
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body');
const Music = require('./models/music')
const views = require('koa-views')
const KoaStatic = require('koa-static')
const Router = require('koa-router') 
const jsonp = require('koa-jsonp')

function getDefultName(file) {
  let index = file.path.lastIndexOf("u")
  let str = file.path.substr(index)
  // console.log(str)
  return str
}

const app = new Koa()
const staticPath = './www/'
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname,staticPath + 'uploads'),
    keepExtensions: true,
    onFileBegin:(name,file) => { // 文件上传前的设置
      const defultName = getDefultName(file)

      let fileName = file.name === '' ? defultName : file.name
      // console.log(fileName)
      file.path = path.join(__dirname,staticPath + 'uploads/' + fileName)
    },
  }
}))
// 使用 koa-static 加载静态目录
// 访问时，直接使用 /assets/01.html 不需要添加前缀

app.use(KoaStatic(path.join(__dirname, staticPath)))

// 使用 ejs 模板引擎的 配置
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// app.use(bodyParser())

// app.use(views(path.join(__dirname, '../views'), {
//   extension: 'ejs'
// }))
// console.log('music')

const router = new Router({
  prefix: '/music'
})
router.get('/list', async(ctx) => {
  let title = '音乐列表'
  let list = Music.find()
  // console.log(111)
  await ctx.render('music/list', {
    title,
    list
  })
})

router.get('/add', async(ctx) => {
  let title = '添加新音乐'
  await ctx.render('music/add')
})

router.post('/add', async(ctx) => {
  // let result = [ctx.request.files,ctx.request.body]
  // ctx.body = result
  const files = ctx.request.files
  const body = ctx.request.body
  let MusicAll = Music.find()
  let len = MusicAll.length
  let id = len === 0 ? 1: MusicAll[MusicAll.length - 1].id + 1
  const music = new Music(
    id,
    body.name,
    body.artist,
    body.duration | 0,
    path.basename(files.music.name),
    path.basename(files.poster.name),
    path.basename(files.lyric.name),
  )
  music.save()
  ctx.redirect('/music/list')
})

router.get('/edit/:id', async(ctx) => {
  let title = '添加新音乐'
  const id = +(ctx.params.id)
  let item = Music.findOne(id)
  // console.log('id',id)
  await ctx.render('music/edit',{
    item
  })
})

router.post('/edit/:id', async(ctx) => {
  const id = +ctx.params.id
  const name = ctx.request.body["name"]
  ctx.body = ctx.request.body
  const artist = ctx.request.body["artist"]
  let music = Music.findOne(id)
  // console.log(music)
  music.name = name
  music.artist =artist
  ctx.redirect('/music/list')
})

router.get('/delete/:id', async(ctx) => {
  let title = '音乐列表'
  const id = +(ctx.params.id)
  // console.log('id',id)
  let list = Music.find()
  let deleteIndex = list.findIndex((item) => item.id == id)
  // console.log(deleteIndex)
  list.splice(deleteIndex,1)
  // Music.splice(id - 1,1)
  await ctx.render('music/list',{
    title,
    list
  })
  ctx.redirect('/music/list')
})

const routerHome = new Router({
  prefix: '/'
})
// console.log('home')
routerHome.get('/', async(ctx) => {
  ctx.redirect('/music/list')
})

const routerApi = new Router({
  prefix: '/api'
})
// app.use(bodyParser())
app.use(jsonp())
/**
 * GET /api/music
 */
routerApi.get('/music', async(ctx) => {
  const musics = Music.find()
  // console.log(musics)
  // console.log('host', ctx.request.header.host)
  const host = ctx.request.header.host
  let lists = musics.map((item) => {
    const temp = {}
    Object.assign(temp, item)
    temp.music = `http://${host}/uploads/${temp.music}`
    temp.poster = `http://${host}/uploads/${temp.poster}`
    temp.lyric = `http://${host}/uploads/${temp.lyric}`
    return temp
  })
  ctx.body = lists
})
// console.log('api')
/**
 * GET /api/music/:id
 */

routerApi.get('/music/:id', async(ctx) => {
  const id = +(ctx.params.id || 0)
  // console.log(ctx)
  // console.log(ctx.params)
  if(!id) {
    return ctx.body = `<h1>404</h1><h2>没有该记录</h2>`
  }
  const item = Music.findOne(id)
  if(!item) {
    return ctx.body = `<h1>404</h1><h2>没有该记录</h2>`
  }
  const host = ctx.request.header.host
  const temp = {}
  Object.assign(temp, item)
  temp.music = `http://${host}/uploads/${temp.music}`
  temp.poster = `http://${host}/uploads/${temp.poster}`
  temp.lyric = `http://${host}/uploads/${temp.lyric}`
  ctx.body = temp
})

app
  .use(routerApi.routes())
  .use(routerApi.allowedMethods())

app 
  .use(routerHome.routes())
  .use(routerHome.allowedMethods())

app
  .use(router.routes())
  .use(router.allowedMethods())
// console.log('app',app)
module.exports = app


