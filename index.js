const app = require('./serve/app')
// console.log(app)
const ip = "127.0.0.1"
const port = 2080
app.listen(port, ip, () => {
  console.log(`server is ready @ http://${ip}:${port}`)
})