import { Strategy } from "passport-github2";
import dotenv from "dotenv";
import { createUser , findUserByGithubId } from "../models/userModel.js";

dotenv.config()

export function initialize(passport) {

    // Register the Github Strategy

    // This tells Passport to use the above authentication function
    // when we call passport.authenticate('github') in our routes.
    passport.use(new Strategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await findUserByGithubId(profile.id);

                if(!user) {
                    user = await createUser(
                        profile.id,
                        profile.username || profile.login || `github_user_${profile.id}`
                    );
                }

                return done(null, user);
            }
            catch(err) {
                return done(err);
            }
        }
    ))

    // Serialize User
    
    // After successful login, Passport saves user info to the session.
    // We only store the user.id to keep the session lightweight.
    passport.serializeUser((user, done) => done(null, user.github_id));

    // Deserialize User
    
    // For every request after login, Passport retrieves user.id from the session,then fetches the full user details from the database.
    // The result is attached to req.user in all routes.
    passport.deserializeUser(async (githubId, done) => {
        try {
            const user = await findUserByGithubId(githubId);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}