import * as crypto from 'node:crypto';

export class HashService {
  static async hashPassword(password: string) {
    return await new Promise<string>((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('base64');
      crypto.scrypt(password, salt, 64, (err, result) => {
        if (err) reject(err);
        resolve(salt + ':' + result.toString('base64'));
      });
    });
  }

  static async verifyPassword(password: string, hashedPassword: string) {
    const [salt, _password] = hashedPassword.split(':');
    return await new Promise<boolean>((resolve, reject) => {
      crypto.scrypt(password, salt, 64, (err, result) => {
        if (err) reject(err);
        resolve(_password === result.toString('base64'));
      });
    });
  }
}
