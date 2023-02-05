import { View, Text, Alert, Modal, SafeAreaView, ScrollView, Pressable, TextInput, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import {  Feather  } from '@expo/vector-icons'; 

import { Colors, GlobalStyles } from '../constants/styles';
import { AuthContext } from '../store/auth-context';

import { confirmEmailVerification } from '../util/auth';

function VerificationScreen(){
    const userAccountCtx = useContext(AuthContext);

    const [code, setCode] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    async function onPress(){
        var confirm = confirmEmailVerification(code, userAccountCtx);
        if(confirm){
            userAccountCtx.rule = 1;
            setIsInvalid(true);
        }else{
            setIsInvalid(true);
        }
        
    }
    return(
        <SafeAreaView style={styles.safeAreaViewcontainer}>
            <View style={styles.container}>

                <View style={styles.authContentContainer}>
                    <ScrollView style={{flex: 1}}>

                        <Text style={styles.welcome}>Verification code</Text>

                        <View style={styles.authContent}>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                                    Enter Verification code
                                </Text>
                                <TextInput
                                    style={[styles.input, isInvalid && styles.inputInvalid]}
                                    autoCapitalize={false}
                                    keyboardType={"default"}
                                    onChangeText={(newCode) => {setCode(newCode);}}
                                    defaultValue={code}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                onPress={onPress}
                            >
                                <View style={styles.editContainer}>
                                    <Text style={styles.editText}>Apply</Text>
                                </View>
                            </Pressable>

                            <Pressable
                                style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                onPress={userAccountCtx.logout}
                            >
                                <View style={styles.closeContainer}>
                                    <Text style={styles.closeText}>Close</Text>
                                </View>
                            </Pressable>

                        </View>
                    </ScrollView>
                    
                </View>

            </View>
        </SafeAreaView>
    );
}
export default VerificationScreen;

const styles = StyleSheet.create({
    safeAreaViewcontainer:{
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary10,
    },
    container:{
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary10,
        marginTop: 60,
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
    authContent:{
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
    inputContainer:{
        marginVertical: 5,
    },
    label:{
        marginVertical: 5,
        fontSize: 14,
        color: Colors.grey,
    },
    labelInvalid:{
        color: Colors.error500,
    },
    input:{
        height: 55,
        backgroundColor: Colors.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
    },
    inputInvalid:{
        backgroundColor: Colors.error100,
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 46,
    },
    editContainer:{
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary10,
        marginTop: 70,
        marginHorizontal: 6,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        height: 50,
    },
    editText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    closeContainer:{
        flex: 1,
        backgroundColor: 'white',
        marginTop: 70,
        marginHorizontal: 6,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    closeText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    button:{
        flex: 1
    },
    buttonPress:{
        opacity: 0.7,
    },
});