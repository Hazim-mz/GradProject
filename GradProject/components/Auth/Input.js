import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
  iconName,
  error,
  password,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color:  '#131313',
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    height: 45,
    backgroundColor: Colors.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginRight:5,
    borderRadius: 20,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin:0,
    justifyContent:"center"
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});