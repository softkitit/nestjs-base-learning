import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  REFRESH_TOKEN_SECRET
} from '@environments';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: REFRESH_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
