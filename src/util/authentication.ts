import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../lib/config';
import _ from 'lodash';

export const encryptPassword = async (password: string) => {
	bcrypt.genSalt(10)
	.then((salt: string) => {
		return bcrypt.hash(password, salt)
	})
	.catch((err: any) => {
		console.log("authentication encryptPassword : ", err)
		return null
	})
}

export const comparePassword = async (password: string, hash: string) => {
	const isMatch = await bcrypt.compare(password, hash)
	return isMatch;
}

export const getBearerToken = (payload: any) => {
  return jwt.sign(payload, config.secret, { expiresIn: config.tokenExp})
}

export const 	decryptBearerToken = (token: string) => {
	try {
		if (_.isNil(token) || _.isEmpty(token)) {
			return { loggedIn: false, info: null };
		}
		
		const info = jwt.verify(token, config.secret) ?? null;
	
		if (info) {
			return { loggedIn: true, info };
		} else {
			return { loggedIn: false, info };
		}
	} catch (err) {
		console.log('authentication decryptBearerToken', err);
		return { loggedIn: false, info: null };
	}
}