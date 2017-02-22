import crypto from 'crypto';

class Hash {

	constructor(plaintext) {
		this.md5 = crypto.createHash('md5').update(plaintext).digest('hex');
	}

}

export default Hash;