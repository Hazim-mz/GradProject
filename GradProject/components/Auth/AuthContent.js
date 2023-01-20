import { useState } from 'react';
import { Alert, StyleSheet, View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
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
    if(rule == 0){
      commercialRecordAreEqual = true;
      record = 0;
    }else{
      commercialRecordAreEqual = record.length == 10;
    }
    

    if ( !emailIsValid || !passwordIsValid ||(!isLogin && (!emailsAreEqual || !passwordsAreEqual)) || !commercialRecordAreEqual ) {
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
    onAuthenticate({ email, password, name, record, rule});
  }

  function onPress(){
    if(isLogin){
      navigation.navigate('HomeOverview');
    }
    else{
      navigation.replace('Login');
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaViewcontainer}>
      <View style={styles.container}>
        
        <View style={styles.backButtonContainer}>
          <Pressable 
            style={({pressed}) => (pressed ? [styles.backButton,styles.press] : styles.backButton)}
            onPress={onPress}
          >
            <AntDesign name="arrowleft" size={30} color="#e4dfe6" />
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        </View>

        <View style={styles.authContentContainer}>
          <ScrollView style={{flex: 1}}>

            <Text style={styles.welcome}>Welcome</Text>

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
            
          </ScrollView>

        </View>

      </View>
    </SafeAreaView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  safeAreaViewcontainer:{
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary10,
  },
  container:{
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary10,
  },
  backButtonContainer:{
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary10,
  },
  backButton:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  backButtonText:{
    fontSize: 16,
    color: '#e4dfe6'
  },
  press:{
    opacity: 0.8,
  },
  authContentContainer:{
    flex: 6, 
    borderWidth: 1,
    borderTopLeftRadius: 64, 
    backgroundColor: 'white',
  },
  welcome:{
    marginTop: 12,
    marginLeft: 36,
    color: '#7d3e94',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden'
  },
  authContent: {
    marginTop: 46,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.light,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
