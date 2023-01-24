import { View, Text, Pressable, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/styles';


function GoToLoginPage({isVisible, close}) {
    const navigation = useNavigation(); //لانه مب صفحة

    function LoginPage(){
        close();
        navigation.navigate('LoginOverview');
    }

    return (
      <View>
        <Modal isVisible={isVisible}>
          <View style={styles.container}>
            <Text style={styles.text} >Login First</Text>
            <View style={styles.buttonContainer}>

                <Pressable
                    style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                    onPress={LoginPage}
                >
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Login</Text>
                    </View>
                </Pressable>

                <Pressable
                    style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                    onPress={close}
                >
                <View style={styles.closeContainer}>
                    <Text style={styles.closeText}>close</Text>
                </View>
                </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
}

export default GoToLoginPage;

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height: 130,
        marginHorizontal: 45,
        borderRadius: 4,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer:{
        flexDirection: 'row'
    },
    loginContainer:{
        marginTop: 30,
        marginRight: 8,
        height: 30,
        width: 80,
        borderRadius: 4,
        backgroundColor: GlobalStyles.colors.primary10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    loginText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    closeContainer:{
        marginTop: 30,
        marginLeft: 8,
        height: 30,
        width: 80,
        borderRadius: 4,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    closeText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    button:{
        height: 70
    },
    buttonPress:{
        opacity: 0.7,
    },
});