import { useContext, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LodingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const navigation = useNavigation();

    const authCtx = useContext(AuthContext);

    async function signupHandler({ email, password, name, record, rule }) {
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password, name, record, rule);
            authCtx.authenticate(token);
            navigation.navigate('HomeOverview');
        } catch (error) {
            Alert.alert(
                'Authentication failed',
                'Could not create user, please check your input and try again later.'
            );
            setIsAuthenticating(false);
        }
        setIsAuthenticating(false);
        
    }

    if (isAuthenticating) {
        return <LoadingOverlay text="Creating user..." />;
    }
    
    return (
        <AuthContent onAuthenticate={signupHandler} />
    );
}

export default SignupScreen;
