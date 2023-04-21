import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dto/User';
import { Users } from 'src/auth/entities/User.entity';
import { Repository } from 'typeorm';
import { hashAsync } from 'src/auth/helpers/hash';
import { AccessToken } from 'src/auth/interfaces/access-token.interface';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { User } from 'src/auth/interfaces/User';
import { Observable, from, map } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class UserService {
  @InjectRepository(Users)
  private readonly repository: Repository<Users>;

  constructor(private jwtService: JwtService) { }


  /**
   * Register user in database
   * @param user {UserDto}
   * @returns {Promise<User>}
   */
  public async createUser({ email, username, password, fullname }: UserDto): Promise<Users> {
    const user: Users = new Users();
    let answer: Promise<Users>;
    const hashedPass = await hashAsync(password);
    user.email = email;
    user.username = username;
    user.fullname = fullname;
    user.password = hashedPass;
    return this.repository.save(user);
  }

  /**
   * Find user object by their username
   * @param username 
   * @returns {Promise<User>}
   */
  findByUsername(username):Promise<Users>{
    return this.repository.findOneBy({ username })
  }


  /**
   * Login user and returns their access token
   * @param user user to Login
   * @returns 
   */
  login(user: User): Observable<AccessToken> {
    const payload: JwtPayload = {
      upn: user.username,
      sub: user.id,
      email: user.email,
    };
    return from(this.jwtService.signAsync(payload)).pipe(
      map((access_token) => {
        return { access_token };
      }),
    );
  }


  /**
   * Get all users from db
   */
  getAll():Promise<Users[]>{
    return this.repository.find({
      relations:['messages', 'messages.reactions']
    })
  }
}
