const jwt = require("jsonwebtoken");
const config = require('./config');
const bcrypt = require("bcryptjs")

const encryptPassword = (password: String) => new Promise((resolve, reject) => {
	bcrypt.genSalt(10, (err: any, salt: String) => {
		if (err) {
			reject(err)
			return false
		}
		bcrypt.hash(password, salt, (err: any, hash: String) => {
			if (err) {
				reject(err)
				return false
			}
			resolve(hash)
			return true
		})
	})
})

const comparePassword = (password: String, hash: String) => new Promise(async (resolve, reject) => {
	try {
		const isMatch = await bcrypt.compare(password, hash)
		resolve(isMatch)
		return true
	} catch (err) {
		reject(err)
		return false
	}
})

const getToken = (payload: any) => {
	const token = jwt.sign(payload, config.secret, {
		expiresIn: config.tokenExp, // 1 Week
	})
	return token
}

const getPayload = (token: String) => {
	try {
		const payload = jwt.verify(token, config.secret);
		return { loggedIn: true, payload };
	} catch (err) {
		// Add Err Message
		return { loggedIn: false }
	}
}

module.exports = {
	getToken,
	getPayload,
	encryptPassword,
	comparePassword
}
