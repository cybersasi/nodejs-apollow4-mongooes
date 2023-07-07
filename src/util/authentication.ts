import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string) => {
	bcrypt.genSalt(10)
	.then((salt: string) => {
		return bcrypt.hash(password, salt)
	})
	.catch((err: any) => {
		console.log("util encryptPassword : ", err)
		return null
	})
}