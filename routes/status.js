const ROUTER = require('express').Router()
const EventEmitter = require('events')

class statusROUTER extends EventEmitter{
	constructor(config, fb) {
		super()
		this.#config = config
		this.#fb = fb

		this.#setRoutes()
	}

	#setRoutes = () => {
		this.#router = ROUTER
		this.#router.get('/', this.#route_default)
		this.#router.get('/fb', this.#route_fb)
	}

	get routes() {
		return this.#router
	}

	#route_default = (req, res) => {
		console.log(`/status, GET="${req.url}"`)
		res.statusCode = 200
		res.write(JSON.stringify('OK'))
		res.end()
	}

	//	Display available fizzbuzz functions
	#route_fb = (req, res) => {
		console.log(`/status/fb, GET="${req.url}"`)
		res.statusCode = 200
		let output = []
		Object.keys(this.#fb).forEach(key => {
			output.push(key)
		})
		res.write(JSON.stringify(output))
		res.end()
	}

	//	Defaults
	#config = null
	#fb = null
	#router = null
}

module.exports = statusROUTER