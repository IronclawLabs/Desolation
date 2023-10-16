import passport from "passport";
import { Strategy as DiscordStrategyUser } from "passport-discord";
import Users from "@models/users.model";
import { DbUser, DiscordUser } from "@sharedtypes/myTypes";
import refreshAccessToken from "@services/refreshAccessToken.service";

passport.serializeUser((user:any, cb:any) => {
    process.nextTick(function() {
      return cb(null,user);
      
    });
  });
  
  passport.deserializeUser((user:any, cb:any) => {
    
    process.nextTick(function() {
      return cb(null, user);

    });
  })

passport.use("discord-strategy",
  new DiscordStrategyUser(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT_USER,
      scope: ["identify","guilds.members.read"],
    },
    async (accessToken:any, refreshToken:any, profile:any, cb:any) => {

      try {
        
        const newTokens = await refreshAccessToken(refreshToken,accessToken)
        profile.access_token = newTokens.access_token
        profile.discord_id = profile.id
        delete profile.id;
         
        
         cb(null,profile)
        
      } catch (error) {
        console.log(error);
        
      
      }
    }
  )
);