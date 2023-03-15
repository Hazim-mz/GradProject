import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, GlobalStyles } from '../../constants/styles';

function Button({ children, onPress }) {
  return (
    <View style={{alignItems:'center'}}>
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: '100%',
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.primary10,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: { width: -3, height: -3 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonContainer: {
    alignItems: 'center'
  }
});