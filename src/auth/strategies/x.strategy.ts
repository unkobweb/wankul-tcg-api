import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-twitter";

const API_URL = process.env.API_URL || 'http://localhost:8080';

@Injectable()
export class XStrategy extends PassportStrategy(Strategy, 'x') {
  constructor() {
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: `${API_URL}/auth/x/callback`,
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    console.log({profile});
    const { id, username, discriminator, avatar, email } = profile;
    const user = {
      id,
      username,
      discriminator,
      avatar,
      email,
      accessToken
    }
    done(null, user);
  }
}