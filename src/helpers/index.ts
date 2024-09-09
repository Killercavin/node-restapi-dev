import crypto from 'crypto';

const secretKey = 'node-rest-api';

export const random = () => {
    return crypto.randomBytes(128).toString('base64');
}

export const authentication = (password: string, salt: string) => {
    return crypto.createHash('sha256').update(password + salt).update('secretKey').digest('hex');
}