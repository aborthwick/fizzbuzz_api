"use strict";

const Config = require('./config/config.js')
const express = require('express')
const STATUS = require('./routes/status.js')
const FB_ROUTES = require('./routes/fb_routes.js')
const FizzBuzz = require('./lib/fizzbuzz.js')

let configuration
if (process.env.ENVIRONMENT) {
	configuration = new Config(process.env.ENVIRONMENT)
} else {
	configuration = new Config()
}

let fb = new FizzBuzz({...configuration.fb})

let gracefulShutdown = (signal) => {
	console.log(`${signal} received.`)
	if (server) {
		console.log(`Closing server...`)
		server.close(() => {
			console.log("Server closed.")
		})
	} else {
		console.log("No running server to close.")
	}
	process.exit()
}

process.on("SIGINT", gracefulShutdown)
process.on("SIGTSTP", gracefulShutdown)

let router = express()
router.use(express.json())
router.use(express.raw())


router.get('/', (req, res) => {
	console.log(`Handler /, GET="${req.url}"`)
	res.send('OK')
})

let status = new STATUS(configuration, fb)
router.use('/status', status.routes)

let fb_routes = new FB_ROUTES(configuration, fb)
router.use('/fb', fb_routes.routes)

router.get('*', (req, res) => {
	console.log(`Handler *, GET="${req.url}"`)
	res.send(`Unexpected request received for ${req.url}`)
})

let server = router.listen(configuration.listenPort, () => {
	console.log(`Listening on port ${configuration.listenPort}`)
})
