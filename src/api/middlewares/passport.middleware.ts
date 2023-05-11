import jwt from 'jsonwebtoken';
import passport from "passport";
import GoogleStrategy, { Profile } from "passport-google-oauth-token";
import FacebookTokenStrategy from "passport-facebook-token";
import { TypeAuth, User } from "../../database/entities/User";
import userHandler from "../handlers/user.handler";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GitHubTokenStrategy = require("passport-github-token");

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  async function (accessToken: string, refreshToken: string, profile: Profile, done: any) {
    try {

      const userExist = await userHandler.getAccountGoogle(TypeAuth.GOOGLE, profile.id);

      if (userExist) {
        const newToken = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET);
        return done(null, { ...userExist, token: newToken })
      }

      const newUser = await userHandler.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        typeAuth: TypeAuth.GOOGLE,
        avatar: profile.photos[0].value
      } as User);
      const newToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

      return done(null, { ...newUser, token: newToken });

    } catch (error) {
      done({ message: "Sign in by google faild" }, null)
    }
  }
));

passport.use(new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  fbGraphVersion: 'v16.0'
}, async function (accessToken, refreshToken, profile, done) {
  try {
    const userExist = await userHandler.getAccountFacebook(TypeAuth.FACEBOOK, profile.id);

    if (userExist) {
      const newToken = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET);
      return done(null, { ...userExist, token: newToken })
    }

    const newUser = await userHandler.create({
      name: profile.displayName,
      facebookId: profile.id,
      typeAuth: TypeAuth.FACEBOOK,
      avatar: profile.photos[0].value
    } as User);
    const newToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

    return done(null, { ...newUser, token: newToken });
  } catch (error) {
    return done({ message: "Sign in by google faild" }, null)
  }
}
));

passport.use(new GitHubTokenStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
}, async function (accessToken: string, refreshToken: string, profile: any, done: any) {
  try {
    const userExist = await userHandler.getAccountGithub(TypeAuth.GITHUB, profile.id);

    if (userExist) {
      const newToken = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET);
      return done(null, { ...userExist, token: newToken })
    }

    const newUser = await userHandler.create({
      name: profile.displayName,
      githubId: profile.id,
      typeAuth: TypeAuth.GITHUB,
      avatar: profile._json.avatar_url
    } as User);
    const newToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

    return done(null, { ...newUser, token: newToken });
  } catch (error) {
    return done({ message: "Sign in by github faild" }, null)
  }
}));