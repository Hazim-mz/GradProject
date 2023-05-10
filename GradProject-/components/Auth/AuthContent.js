import { useState } from 'react';
import { Alert, StyleSheet, View, Text, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import FlatButton from '../UI/FlatButton';
import AuthForm from './AuthForm';
import { Colors, GlobalStyles } from '../../constants/styles';


function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
    record: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { name, email, confirmEmail, password, confirmPassword, rule, record } = credentials;
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;
    var commercialRecordAreEqual;
    if (rule == 0) {
      commercialRecordAreEqual = true;
      record = 0;
    } else {
      commercialRecordAreEqual = record.length == 10;
    }


    if (!emailIsValid || !passwordIsValid || (!isLogin && (!emailsAreEqual || !passwordsAreEqual)) || !commercialRecordAreEqual) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        record: !commercialRecordAreEqual
      });
      return;
    }
    onAuthenticate({ email, password, name, record, rule });
  }

  function onPress() {
    if (isLogin) {
      navigation.navigate('HomeOverview');
    }
    else {
      navigation.replace('Login');
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding"> */}
      <View style={styles.container}>

        <View style={styles.backButtonContainer}>
          <Pressable
            style={({ pressed }) => (pressed ? [styles.backButton, styles.press] : styles.backButton)}
            onPress={onPress}
          >
            <AntDesign name="arrowleft" size={30} color={GlobalStyles.colors.primary10} />
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        </View>

        <View style={styles.authContentContainer}>
          <View style={styles.container1}>

            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.text}>{isLogin ? 'Log in' : 'Register'} to Qaati</Text>

            <View style={styles.authContent}>

              <AuthForm
                isLogin={isLogin}
                onSubmit={submitHandler}
                credentialsInvalid={credentialsInvalid}
              />
              <View style={styles.buttons}>
                <FlatButton onPress={switchAuthModeHandler}>
                  {isLogin ? 'Create a new user' : 'Log in instead'}
                </FlatButton>
              </View>
            </View>
          </View>
        </View>

      </View>
      {/* </KeyboardAvoidingView> */}
    </ScrollView>

  );
}

export default AuthContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    marginTop: 10,
    marginLeft: 36,
    color: 'black',
    fontSize: 15,
    //fontFamily: 'serif',
    overflow: 'hidden'
  },
  container1: {
    flex: 1,
    marginTop: 70,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
    backgroundColor: 'white',
    
  },
  backButtonContainer: {
    backgroundColor: 'white',
    height: 50,
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  backButtonText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary10
  },
  press: {
    opacity: 0.8,
  },
  authContentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 95,
    shadowOffset: { width: 0, height: -5 },
    shadowColor: "#171717",
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  welcome: {
    marginTop: 12,
    marginLeft: 36,
    color: '#7d3e94',
    fontSize: 30,
    fontWeight: 'bold',
    overflow: 'hidden',
    //fontFamily: 'serif',
  },
  authContent: {
    marginTop: 46,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
  },
  buttons: {
    marginTop: 8,
    flexDirection: 'row'
  },
});
