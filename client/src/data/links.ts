const domain = () => {
    if (process.env.NODE_ENV == "production") return "https://clickapp-production.up.railway.app";
    return "http://localhost:5002";
  };
  
  const wssdomain = () => {
    if (process.env.NODE_ENV == "production") return "wss://clickapp-production.up.railway.app";
    return "ws://localhost:5002";
  };
  
  const links = {
    discord_login: `${domain()}/auth`,
    logout: `${domain()}/auth/logout`,
  
  
    //payment
    post_validate_payment:`${domain()}/payment/validate`,
  
    //user
    put_create_user:`${domain()}/user`,
    get_db_user:`${domain()}/user`,
    //in-site
    gameboard:"/profile/gameboard",
    marketplace:"/coming-soon",
    profile:"/profile",
    buy_su:"/profile/buy-su",
    about: "/about",
    contact: "/contact",  
    login:"/login",
    cults:"/cults",
    admin:"/moderation/admin",
    leaderboard:"/cults/leaderboard",
  
    //social
    twitter:"https://twitter.com/mergevania",
    discord:"https://discord.gg/RrRKsHgccC"
  };
  
  export default links;
  