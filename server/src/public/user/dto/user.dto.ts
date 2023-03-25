import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { UserType } from 'src/common/types/user';
export class UserDto {

  @IsString()
  @IsOptional()
  firstName: string | null;

  @IsString()
  @IsOptional()
  lastName: string | null;

  @IsString()
  userType:  UserType;  // 'seeker' | 'investor'

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobile: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  pinCode: string;

}