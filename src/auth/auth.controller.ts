import { Controller, Post, Body, Response } from '@nestjs/common';
import { LoginDto, UserDto } from './dto/User';
import { UserService } from './services/user/user.service';
import { map} from 'rxjs'
import { compareAsync } from './helpers/hash';
@Controller('auth')
export class AuthController {
    constructor(private userService:UserService){}
    @Post('signup')
    async signup(@Body() user: UserDto){
        try{
            return await this.userService.createUser(user);

        }catch(e){
            if(e.code == '23505'){
                return {error: true, status: "User Already taken"}
            }
        }
    }

    @Post('signin')
    async signin(@Body() request: LoginDto, @Response() res){
        const [user] = await this.userService.findByUsername(request.username);
        if(!user) return res.json({error: true, message: "Usuario desconocido"});
        const correctPassword = await compareAsync(user.password, request.password);
        if(!correctPassword) return  res.json({error: true, message: "Contraseña equivocada"})
        return this.userService.login(user)
            .pipe(
                map(token => {
                    return res
                        .header('Authorization', 'Bearer ' + token.access_token)
                        .json(token)
                        .send()
        })
      );
    }
}
