import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //Join the hashed results and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create new user and save it
    const user = await this.userService.create(email, result);

    // Return the user
    return user;
  }

  signin(email: string, password: string) {}
}
