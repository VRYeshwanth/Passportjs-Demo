import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByUsername , findUserById } from "../models/UserModel.js";

export function initialize(passport)
{
    // Authentication Function

    // This function runs whenever a user tries to log in
    // It checks if the user exists ans verifies their password
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await findUserByUsername(username);
            if(!user)
                return done(null, false, {message: "No user found !!"});

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch)
                return done(null, false, {message: "Incorrect Password !!"});

            return done(null, user);
        }
        catch(error) {
            return done(error);
        }
    };

    // Register the Local Strategy

    // This tells Passport to use the above authentication function
    // when we call passport.authenticate('local') in our routes.
    passport.use(new Strategy(authenticateUser));

    // Serialize User
    
    // After successful login, Passport saves user info to the session.
    // We only store the user.id to keep the session lightweight.
    passport.serializeUser((user, done) => done(null, user.id));

    // Deserialize User
    
    // For every request after login, Passport retrieves user.id from the session,then fetches the full user details from the database.
    // The result is attached to req.user in all routes.
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById(id);
            done(null, user);
        }
        catch(error) {
            done(error);
        }
    })
}