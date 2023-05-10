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
  pass: '',
  notificationsAddress: '',
  idToken: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},

  //for booking
  hall: {},
  services: {},
  addHall: () => {},
  addServices: () => {},
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

  function addHall(token) {
    setAuthToken(token);
  }

  // function addHall(hall) {
  //   setAuthToken((token) => { return{...token, hall: hall} });
  // }

  function addServices(services) {
    setAuthToken((token) => { return{...token, services: services} });
  }

  const value = {
    name: authToken.name,
    email: authToken.email,
    userID: authToken.userID,
    uID: authToken.uID,
    rule: authToken.rule,
    record: authToken.record,
    image: authToken.image,
    pass: authToken.pass,
    notificationsAddress: authToken.notificationsAddress,
    idToken: authToken.idToken,
    isAuthenticated: !!authToken.idToken,
    authenticate: authenticate,
    logout: logout,

    //for booking
    hall: authToken.hall,
    services: authToken.services,
    addHall: addHall,
    addServices: addServices,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
