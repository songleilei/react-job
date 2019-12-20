const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')

const app = express()
// 将http与socket统一起来
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket) {
	console.log('user connect')
	socket.on('sendmsg', function(data) {
		const { from, to, msg } = data
		const chatid = [from, to].sort().join('_')
		Chat.create(
			{ chatid, from, to, content: msg, creat_time: new Date().getTime() },
			function(err, doc) {
				if (!err) {
					io.emit('recvmsg', Object.assign({}, doc._doc))
				}
			}
		)
	})
})

const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

// 编译打包后
// 购买域名
// DNS解析到服务器的ip
// 安装nginx
// 使用pm2 管理node进程

app.use('/', express.static(path.resolve('build')))

app.use(function(req, res, next) {
	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	}

	return res.sendFile(path.resolve('build/index.html'))
})

//设置跨域访问
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
	res.header('X-Powered-By', ' 3.2.1')
	res.header('Content-Type', 'application/json;charset=utf-8')
	next()
})

server.listen(9093, function() {
	console.log('Node app start at port 9093')
})
