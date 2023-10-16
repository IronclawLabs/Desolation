
export enum AccountType {
  user,
  moderator,
  admin
}

export const CultTypeText = {
  0:"Basic"
  
}

export const AccountTypeText = {
  0:"User",
  1:"Moderator",
  2:"Admin"

  
}

export enum AllowedChains {
  solana = "solana",
  polygon = "polygon",
  ethereum = "ethereum"
}
export enum UNITS {
  solana = "SOL",
  polygon = "MATIC",
  ethereum = "ETH"

}
export enum ApiNames  {
  solana="solana",
  ethereum="ethereum",
  polygon="matic-network"
}

export enum ResponseMessage {
  wentWrong = "Something went wrong",
  successful = "Successfully completed",
  alreadyCompleted = "Already completed",

  //su buy/sell
  creatureSold = "Creature sold successfully. You will recive you funds in short time. Transaction id of your funds: ",
  suPackageBought = "SU package bought successfully",
  notEnoguhSu = "User has not enough SU to do this action",

  //creature operations
  creatureBought = "Creature is successfully bought ",
  cooldownNotOver = "Cooldown for this type is not over",
  mergeSuccessful = "Merge successfully compeleted",
  invalidOwner = "Creature ownership error",
  levelNotBuyable = "Level is not buyable",
  levelNotAllowed = "Level is not allowed",
  levelNotSellable = "Level is not sellable",
  tooManyCreatures = "User has reached the creature buying limit",
  notMergable = "Creatures are not mergable",
  creatureNotExist = "Creature not exist",
  notForSale = "Creature not for sale",

  //user operations
  updateSuccessful = "Update successfully compeleted",
  notActive = "User is not active",
  notAuthorized = "User is not authorized",
  noCookieUser = "There is no cookie user",
  userNotExist = "User doesn't exist",
  tooManyChars = "Too many characters",
  notCorrectFormat = "Information you provided is not in correct format",
  walletIsMissing = "Wallet is missing",
  notAdmin = "User is not admin",
  invalidGiftCode = "Gift code has been already used or never existed",
  claimedSuccessfully = "Gift code claimed successfully",
  giftTypeClaimed = "This gift code type has been already claimed once",
  alreadyReffered = "You have already used your referral code",
  levelNotReached = "You haven't reached this level yet",
  notMfaEnabled = "Your account is not verified (MFA) you need to verify for this action",
  alreadyInCult = "You are already a cult member",
  noRole = "You don't have needed discord role to join the cult!",

  //crypto payments
  invalidVault = "Invalid mergevania vault address",
  invalidPayer = "Invalid payer address",
  invalidAmountPaid = "Invalid amout paid",
  paymentExist = "This payment has been already made",
  failedToFetch = "Faild to fetch tx data",
  failedBlockConfirmation = "Confirmations for this payment is not enoguh",
  invalidNetwork = "Invalid blockchain network",
  Eip155NetworkError = "Network conditions are not suitable try later...",

  //admin
  giftCodeCreated = "Gift codes has been succsessfully created",
  invalidGiftCodeDiscrimator = "Discriminator cannot contain '_' underscores ",
  botNotAddedToServer = "Mergevania bot not added to target discord server",
  
}

export enum Socials {
  twitter = "twitter",
  mail = "mail",
  website = "website",
  discord = "discord",
}
