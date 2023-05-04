import jwt from 'jsonwebtoken';
import passport from "passport";
import GoogleStrategy from "passport-google-oauth-token";
import { TypeAuth, User } from "../../database/entities/User";
import userHandler from "../handlers/user.handler";

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  async function(accessToken:string, refreshToken:string, profile:any, done:any) {
    try {

      const userExist = await userHandler.getAccountGoogle(TypeAuth.GOOGLE, profile.id);

      if(userExist){
        const newToken = jwt.sign({id: userExist.id}, process.env.JWT_SECRET);
        return done(null, {...userExist, token: newToken})
      }

      const newUser = await userHandler.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        typeAuth: TypeAuth.GOOGLE
      } as User);
      const newToken = jwt.sign({id: newUser.id}, process.env.JWT_SECRET);

      return done(null, {...newUser,token: newToken});

    } catch (error) {
      done(null, false, {message: "Sign in by google faild"})
    }
  }
));