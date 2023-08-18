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

export interface IUserModel {
      id: number | undefined;
      userName: String | undefined;
      email: String | undefined;
      password: String | undefined;
      dataCriacao: Date | undefined;
      dataAtualizacao: Date | undefined;
      accountNonExpired: Boolean | undefined;
      accountNonLocked: Boolean | undefined;
      credentialsNonExpired: Boolean | undefined;
      enabled: Boolean | undefined;
}