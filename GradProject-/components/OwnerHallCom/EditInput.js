import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

function EditInput({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
  width,
  iconName,
  error,
  password,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
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
        placeholderTextColor='#a3a2a2'
      />
    </View>
  );
}


export default EditInput;

const styles = StyleSheet.create({
  inputContainer: {
  },
  label: {
    fontSize: 14,
    color: Colors.grey,
  },
  input: {
    height: 45,
    backgroundColor: Colors.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 0,
    justifyContent: "center"
  },
  inputInvalid: {
    backgroundColor: Colors.error100,

  },
});