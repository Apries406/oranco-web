import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO } from './dto/user-register.dto';
import { md5 } from 'src/utils/md5';
import { LoginUserDto } from './dto/user-login.dto';
import { LoginUserVO } from './vo/user-login.vo';

@Injectable()
export class UsersService {
  private readonly logger = new Logger();

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @Inject()
  private readonly jwtService: JwtService;

  async findUserByEmail(email: string): Promise<User | undefined> {
    return  this.userRepository.findOne({
      where: {
        email
      }
    })
  }

  async findUserByID(id: number): Promise<User | undefined> {
    return  this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  async login({email, password}: LoginUserDto) {
    const user = await this.findUserByEmail(email)
    if (!user) {
      throw new HttpException('用户不存在', 401);
    }

    if (user.password!== md5(password)) {
      throw new HttpException('密码错误', 401);
    }
    
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    })

    const saveUserInfo = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      grade: user.grade,
    }

    const vo = new LoginUserVO(saveUserInfo, token)

    return {
      code: 200,
      success: true,
      message: '登录成功',
      data: vo
    }
  }

  async register(user: RegisterUserDTO) {
    const { username, password, username_pinyin, username_suffix, grade} = user;
    const email_prefix = username_pinyin + '.' + username_suffix
    if(await this.userRepository.findOne({
      where: {
        email_prefix,
      }
    })) {
      return {
        code: 400,
        success: false,
        message: '用户名拼音+后缀已经存在, 请更改后缀后重新注册'
      }
    }

    const newUser = new User();
    newUser.username = username;
    newUser.password = md5(password);
    newUser.email_prefix = email_prefix;
    newUser.username_pinyin = username_pinyin;
    newUser.username_suffix = username_suffix;
    newUser.email = email_prefix + '@lecorg.com';
    newUser.grade = grade;

    try {
      await this.userRepository.save(newUser);
      return {
        code: 200,
        success: true,
        message: '注册成功'
      }
    } catch(err) {
      this.logger.error(err);
      throw new HttpException('注册失败', 500);
    }
  }
}
