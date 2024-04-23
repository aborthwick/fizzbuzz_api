"use strict";

class FizzBuzz {
	constructor (config) {
		this.#minValue = config.minValue || this.#minValue
		this.#maxRange = config.maxRange || this.#maxRange
		// try {

		// } catch (e) {
		// 	throw new Error("Incomplete FizzBuzz handler configuration")
		// }
	}

	//	returns fizzbuzz value for specific integer 'value'
	//	... if the input value is a positive integer
	fizzbuzz = (value) => {
		if (!Number.isInteger(value) || value < this.#minValue) { return null }
		let output = ``
		if (value%3 == 0) { output = `${output}fizz` }
		if (value%5 == 0) { output = `${output}buzz` }
		return (output) ? output : value
	}

	//	invokes fizzbuzz repeatedly
	//	returns chain from <#minValue> to <range>
	calcRange = (range) => {
		let output = []
		range = (range <= this.#maxRange) ? range : this.#maxRange
		for (let i=this.#minValue; i<=range; i++) {
			output[i] = this.fizzbuzz(i)
		}
		if (output[0] == null) { output.shift() }
		return output
	}

	//	prints a pre-calculated range
	//	... consider whether to move this to another library?
	debug_PrintRange = (input) => {
		for (let i in input) {
			console.log(input[i])
		}
	}

	#minValue = 1
	#maxRange = 100
}

module.exports = FizzBuzz