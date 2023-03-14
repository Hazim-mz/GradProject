import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LodingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
      navigation.navigate('HomeOverview');
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay text="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
