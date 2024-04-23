const ROUTER = require('express').Router()
const EventEmitter = require('events')

class fbROUTER extends EventEmitter{
	constructor(config, fb) {
		super()
		this.#config = config
		this.#fb = fb

		this.#setRoutes()
	}

	#setRoutes = () => {
		this.#router = ROUTER
		this.#router.get('/', this.#route_displayRange)
		this.#router.get('/position/:value', this.#route_displayValue)
		this.#router.get('/displayrange/:max?', this.#route_displayRange)
	}

	get routes() {
		return this.#router
	}

	// single value request
	#route_displayValue = (req, res) => {
		console.log(`/fb/position/, GET="${req.url}"`)
		if (isNaN(req.params.value)) {					// sanity check on input
			res.end()
			return
		}
		let value = (parseInt(req.params.value,10))
		let output = this.#fb.fizzbuzz(value)
		if (output) {									// sanity check on output
			res.write(JSON.stringify(output))
		}
		res.end()
	}

	#route_displayRange = (req, res) => {
		console.log(`/fb/displayrange/, GET="${req.url}"`)
		let range = req.query.max || req.params.max || null
		let output = this.#fb.calcRange(range)
		res.statusCode = 200
		res.write(JSON.stringify(output))
		res.end()
	}

	//	Defaults
	#config = null
	#fb = null
	#router = null
}

module.exports=fbROUTER