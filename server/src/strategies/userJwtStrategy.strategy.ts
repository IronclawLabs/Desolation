import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import usersModel from '@models/users.model';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    expiresIn: '24h', // You can adjust the expiration time as needed

  };
  
  //databasede var mı yok mu diye kontrol et dbclicker ile
  passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
     // Check if the token has expired 
      
     if (Date.now() > jwtPayload.exp * 1000) {
      return done(null, false, { message: "Token has expired" });
    }
    
    // Check if the user exists based on the payload's ID
    try {
    const user = await usersModel.findById(jwtPayload.sub);
    
    if (user) {      
      return done(null, user);
    } else {

      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
  }));