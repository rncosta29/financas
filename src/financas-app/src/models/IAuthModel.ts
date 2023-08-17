export interface ILoginModel {
      username: String | undefined;
      password: String | undefined;
}

export interface ITokenResponseModel {
      username: String | undefined;
      authenticated: Boolean | undefined;
      created: Date | undefined;
      expiration: Date | undefined;
      accessToken: String | undefined;
      refreshToken: String | undefined
}