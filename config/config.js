"use strict";

const fbConfig = require('./fbConfig.js')

class appConfig {
	constructor (environment = "staging") {
		environment = environment.toLowerCase()
		console.log(`Setting environment to ${environment}`)

		this.listenPort = process.env.APIPORT || 3000
		this.#fb = new fbConfig(environment)
	}

	get fb() {
		return this.#fb.config
	}

	#fb = null
	listenPort = null
}

module.exports = appConfig