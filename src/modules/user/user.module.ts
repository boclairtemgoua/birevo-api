import { CreateOrUpdateProfileService } from './../profile/services/mutations/create-or-update-profile.service';
import { FindOneUserByService } from './services/query/find-one-user-by.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/User';
import { FindUserService } from './services/query/find-user.service';
import { CreateOrUpdateUserService } from './services/mutations/create-or-update-user.service';
import { AuthUserController } from './controllers/auth/auth-user.controller';
import { CreateRegisterUserService } from './services/mutations/create-register-user.service';
import { Profile } from '../../models/Profile';
import { Organization } from '../../models/Organization';
import { CreateOrUpdateOrganizationService } from '../organization/services/mutations/create-or-update-organization.service';
import { CreateLoginUserService } from './services/mutations/create-login-user.service';
import { CreateOrUpdateResetPasswordService } from '../reset-password/services/mutations/create-or-update-reset-password.service';
import { ResetPassword } from '../../models/ResetPassword';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Profile]),
    TypeOrmModule.forFeature([Organization]),
    TypeOrmModule.forFeature([ResetPassword]),
  ],
  controllers: [AuthUserController],
  providers: [
    CreateOrUpdateUserService,
    FindOneUserByService,
    FindUserService,
    CreateRegisterUserService,
    CreateLoginUserService,
    CreateOrUpdateProfileService,
    CreateOrUpdateOrganizationService,
    CreateOrUpdateResetPasswordService,
  ],
})
export class UserModule {}
