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

    constructor(private jwtService:JwtService){}
    
    public async createUser(body: UserDto): Promise<Users> {
        const user: Users = new Users();
        let answer:Promise<Users>;
        const password = await hashAsync(body.password);
        user.fullname = body.fullname;
        user.email = body.email;
        user.username = body.username;
        user.password = password;
        return  this.repository.save(user);
      }

    getAll(){
        return this.repository.find();
    }

    findByUsername(username){
        return this.repository.findBy({username})
    }


    login(user: User): Observable<AccessToken> {
        const payload: JwtPayload = {
          upn: user.username, //upn is defined in Microprofile JWT spec, a human readable principal name.
          sub: user.id,
          email: user.email,
        };
        return from(this.jwtService.signAsync(payload)).pipe(
          map((access_token) => {
            return { access_token };
          }),
        );
      }
}
