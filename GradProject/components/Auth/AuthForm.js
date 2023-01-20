import { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../UI/Button';
import Input from './Input';
import RadioForm from 'react-native-simple-radio-button';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [commercialRecord, setCommercialRecord] = useState('');
  const [rule, setRule] = useState(0);

  const items = [
    { label: 'User', value: 0 },
    { label: 'HallOwner', value: 1 }
  ]

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    record: recordIsInvalid
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
      case 'commercialRecord':
        setCommercialRecord(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      name: enteredName,
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      rule: rule,
      record: commercialRecord,
    });
  }
  return (
    <View>
      <View>
        {!isLogin && (
          <Input
            label="Your Name"
            onUpdateValue={updateInputValueHandler.bind(this, 'name')}
            value={enteredName}
          />
        )}
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <View>
            <Input
              label="Confirm Password"
              onUpdateValue={updateInputValueHandler.bind(
                this,
                'confirmPassword'
              )}

              secure
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
            />
          </View>
        )}
        {!isLogin && (
          <View>
            <Text>Select your rule</Text>
            <RadioForm
              radio_props={items}
              initial={rule}
              onPress={(rule) => setRule(rule)}
              buttonColor='#BABBC3'
              labelColor='#BABBC3'
              selectedLabelColor='#5D5FEE'
              selectedButtonColor='#5D5FEE'
              labelHorizontal={true}
            />
          </View>
        )}

        {rule == 1 &&
          <View>
            <Input
              label="Commercial record"
              onUpdateValue={updateInputValueHandler.bind(this, 'commercialRecord')}
              value={commercialRecord}
              isInvalid={recordIsInvalid}
            />

          </View>
        }
        <View style={styles.buttons}>
          <Button onPress={submitHandler} title='Log in'>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {

  },
});
