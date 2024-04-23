class fbConfig {
	constructor(environment = "staging") {
		try {
			if (environment == "production") { }
			if (process.env.MAX_RANGE) {
				this.#maxRange = process.env.MAX_RANGE
			}
		} catch (e) {
			throw new Error("Incomplete FizzBuzz configuration", e.message)
		}
	}

	get config() {
		return ({
			minValue: this.#minValue,
			maxRange: this.#maxRange
		})
	}

	#minValue = 1
	#maxRange = 100		// default to this range value
}

module.exports = fbConfig