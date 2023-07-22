import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/userModel";
// passport.serializeUser((user: any, done) => {
//   done(null, user?.id);
// });

// passport.deserializeUser((id, done) => {
//   userModel.findById(id).then((user) => {
//     done(null, user);
//   });
// });
passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_OAUTH2_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_OAUTH2_CLIENT_SECRET}`,
      callbackURL: `${process.env.BACKEND_HOST}/api/auth/google/callback`,
    },
    async function (accessToken, refeshToken, profile, cb) {
      const { id, _json } = profile;
      const user = await userModel.findOneAndUpdate(
        { googleId: id },
        {
          firstName: _json.given_name,
          lastName: _json.family_name,
          avatar: _json.picture,
          email: _json.email,
          userName: _json?.email?.replace("@", ""),
        },
        { new: true, upsert: true }
      );
      cb(null, user);
    }
  )
);
