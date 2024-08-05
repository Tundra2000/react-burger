export type TLogin = {
    email: string
    password: string
  }

  
export type TProfile = {
    name: string
    email: string
    password: string
}


export type TUserDataResult= {
  success: boolean
  accessToken: string
  refreshToken: string
  user: TProfile
  message: string 
}