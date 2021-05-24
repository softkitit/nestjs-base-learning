
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Gender {
    UNKNOWN = "UNKNOWN",
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum RecordType {
    User = "User",
    File = "File"
}

export enum UserType {
    BASIC = "BASIC",
    PREMIUM = "PREMIUM"
}

export class CreateRoleInput {
    code: string;
    description?: string;
    nodeId: string;
    permissions: string[];
}

export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: Gender;
}

export class CreateUserRoleInput {
    userId: string;
    roleId: string;
}

export class FileInput {
    filename?: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class PermissionInput {
    code: string;
    description: string;
}

export class RecordInput {
    User?: UserInput;
    File?: FileInput;
}

export class SearchInput {
    select?: string[];
    where?: RecordInput;
    start?: number;
    end?: number;
    order?: JSONObject;
    skip?: number;
    take?: number;
}

export class UpdateUserInput {
    firstName: string;
    lastName: string;
    password: string;
    gender: Gender;
}

export class UserInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    gender?: Gender;
}

export class Crowd {
    _id?: string;
    givenName?: string;
    familyName?: string;
    displayName?: string;
    email?: string;
}

export class Facebook {
    _id?: string;
    token?: string;
    name?: string;
    email?: string;
}

export class Google {
    _id?: string;
    token?: string;
    name?: string;
    email?: string;
}

export class Local {
    email?: string;
    password?: string;
}

export class LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export abstract class IMutation {
    abstract createPermission(input: PermissionInput): boolean | Promise<boolean>;

    abstract updatePermission(id: string, input: PermissionInput): boolean | Promise<boolean>;

    abstract deletePermission(id: string): boolean | Promise<boolean>;

    abstract createRole(input: CreateRoleInput): Role | Promise<Role>;

    abstract createUser(input: CreateUserInput): User | Promise<User>;

    abstract updateUser(_id: string, input: UpdateUserInput): boolean | Promise<boolean>;

    abstract updateAvatar(_id: string, file: Upload): boolean | Promise<boolean>;

    abstract deleteUser(_id: string): boolean | Promise<boolean>;

    abstract deleteUsers(): boolean | Promise<boolean>;

    abstract verifyEmail(emailToken: string): boolean | Promise<boolean>;

    abstract login(input: LoginUserInput): LoginResponse | Promise<LoginResponse>;

    abstract refreshToken(refreshToken: string): RefreshTokenResponse | Promise<RefreshTokenResponse>;

    abstract lockAndUnlockUser(_id: string, reason: string): boolean | Promise<boolean>;

    abstract changePassword(_id: string, currentPassword: string, password: string): boolean | Promise<boolean>;

    abstract forgotPassword(email: string): boolean | Promise<boolean>;

    abstract resetPassword(resetPasswordToken: string, password: string): boolean | Promise<boolean>;

    abstract createSubscription(source: string, ccLast4: string): User | Promise<User>;

    abstract changeCreditCard(source: string, ccLast4: string): User | Promise<User>;

    abstract validateUser(text: string, input: CreateUserInput): boolean | Promise<boolean>;

    abstract createUserRole(input: CreateUserRoleInput): UserRole | Promise<UserRole>;
}

export class Permission {
    _id: string;
    code: string;
    description: string;
    isActive?: boolean;
    createdAt: number;
    updatedAt: number;
}

export abstract class IQuery {
    abstract permissions(): Permission[] | Promise<Permission[]>;

    abstract roles(): Role[] | Promise<Role[]>;

    abstract hello(): string | Promise<string>;

    abstract me(): User | Promise<User>;

    abstract users(offset?: number, limit?: number): User[] | Promise<User[]>;

    abstract user(_id: string): User | Promise<User>;

    abstract search(conditions: SearchInput): Result[] | Promise<Result[]>;

    abstract searchUser(userIds?: string[]): UserResult | Promise<UserResult>;

    abstract today(): Date | Promise<Date>;

    abstract userRoles(): UserRole[] | Promise<UserRole[]>;
}

export class RefreshTokenResponse {
    accessToken: string;
}

export class Role {
    _id: string;
    code?: string;
    description?: string;
    nodeId: string;
    permissions: string[];
    createdAt: number;
    updatedAt: number;
}

export abstract class ISubscription {
    abstract newUser(): User | Promise<User>;
}

export class User {
    _id: string;
    local?: Local;
    google?: Google;
    facebook?: Facebook;
    firstName: string;
    lastName: string;
    avatar?: string;
    gender: Gender;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    fullName?: string;
    isVerified: boolean;
    isActivated?: boolean;
    isOnline: boolean;
    isLocked: boolean;
    reason: string;
    isActive: boolean;
    stripeId?: string;
    type: UserType;
    ccLast4?: string;
    createdAt: number;
    updatedAt: number;
}

export class UserRole {
    _id: string;
    userId: string;
    roleId: string;
    createdAt: number;
    updatedAt: number;
}

export class Users {
    users?: User[];
}

export type JSON = any;
export type JSONObject = any;
export type Upload = any;
export type Result = User;
export type UserResult = User | Users;
