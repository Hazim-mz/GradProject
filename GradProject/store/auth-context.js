import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  name: '',
  email: '',
  userID: '',
  uID: '',
  rule: '',
  record: '',
  image: '',
  notificationsAddress: '',
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState({});

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token.idToken);
  }

  function logout() {
    setAuthToken({});
    AsyncStorage.removeItem('token');
  }

  const value = {
    name: authToken.name,
    email: authToken.email,
    userID: authToken.userID,
    uID: authToken.uID,
    rule: authToken.rule,
    record: authToken.record,
    image: authToken.image,
    notificationsAddress: authToken.notificationsAddress,
    token: authToken.idToken,
    isAuthenticated: !!authToken.idToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
