import express from 'express'
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')

const app = express()
// 将http与socket统一起来
const server = require('http').Server(app)
const io = require('socket.io')(server)

import React from 'react'
import ReactDOMServer, { renderToString } from 'react-dom/server'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
assethook({
	extensions: ['png']
})
import { StaticRouter } from 'react-router-dom'
import reducers from '../src/reducer'
import App from '../src/app'
import staticPath from '../build/asset-manifest.json'

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
app.use('/', express.static(path.resolve('build')))

app.use(function(req, res, next) {
	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	}

	// 新建store
	// const store = createStore(reducers, applyMiddleware(thunk))
	// const context = {}
	// const markup = ReactDOMServer.renderToString(
	// 	<Provider store={store}>
	// 		<StaticRouter location={req.url} context={context}>
	// 			<App />
	// 		</StaticRouter>
	// 	</Provider>
	// )

	// const pageHtml = `
	// 	<!DOCTYPE html>
	// 	<html lang="en">
	// 		<head>
	// 		<meta charset="utf-8" />
	// 		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
	// 		<meta name="theme-color" content="#000000" />
	// 		<title>React App</title>
	// 		<link href="/${staticPath['entrypoints'][1]}" rel="stylesheet" />
	// 		<link href="/${staticPath['entrypoints'][3]}" rel="stylesheet" />
	// 		</head>
	// 		<body>
	// 		<noscript> You need to enable JavaScript to run this app.</noscript>
	// 		<div id="root">${markup}</div>
	// 		<script src="/${staticPath['entrypoints'][2]}"></script>
	// 		<script src="/${staticPath['entrypoints'][4]}"></script>
	// 		</body>
	// 	</html>
	// `

	// res.send(pageHtml)
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
