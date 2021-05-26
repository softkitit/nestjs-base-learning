import { IsEmail, IsNotEmpty, Length } from 'class-validator';

/* tslint:disable */
/* eslint-disable */

export enum Role {
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_CLIENT = "ROLE_CLIENT"
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class UserInput {

    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @Length(8)
    password: string;
    
    @IsNotEmpty()
    @Length(4, 255)
    username: string;
    
    @IsNotEmpty()
    roles: [Role];
}

export class Local {
    email?: string;
    password?: string;
}

export class LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export class User {
    _id: string;
    email: string;
    username: string;
    roles: [Role];
    createdAt: number;
    updatedAt: number;
}

