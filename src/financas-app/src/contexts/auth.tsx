import React, {ReactNode, createContext, useState } from 'react';

export const AuthContext = createContext({});

type AuthContextProviderProps = {
      children?: ReactNode;
}

function AuthProvider(props: AuthContextProviderProps) {
      const [user, setUser] = useState({});

      function signin(username: String, password: String) {
            if(username !== '' && password !== '') {
                  setUser({
                        username,
                        password
                  });
            }
            console.log(username);
      }
      return(
            <AuthContext.Provider value={{ user, signin }}>
                  {props.children}
            </AuthContext.Provider>
      );
}

export default AuthProvider