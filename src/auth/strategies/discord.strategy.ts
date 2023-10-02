import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-discord";

const API_URL = process.env.API_URL || 'http://localhost:8080';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    console.log(`${API_URL}/auth/discord/callback`);
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: `${API_URL}/auth/discord/callback`,
      scope: ['identify', 'email'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const { id, username, discriminator, avatar, email } = profile;
    const user = {
      discordId: id,
      username,
      discriminator,
      avatar,
      email,
      accessToken
    }
    done(null, user);
  }
}