import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findById(_id: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ _id });
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      const existingUser = await this.findByEmail(createUserDto.email);
      if (existingUser) {
        throw new Error(
          `User with email ${createUserDto.email} already exists`,
        );
      }
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel(createUserDto);
      const savedUser = await createdUser.save();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = savedUser.toObject();
      return userWithoutPassword;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      throw new Error(`Error creating user: ${message}`);
    }
  }
}
