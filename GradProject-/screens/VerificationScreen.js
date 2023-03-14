import { View, Text, Alert, Modal, SafeAreaView, ScrollView, Pressable, TextInput, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { Colors, GlobalStyles } from '../constants/styles';
import { AuthContext } from '../store/auth-context';
import LodingOverlay from "../components/UI/LodingOverlay";
import { db, auth } from '../config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

function VerificationScreen({updateRule}){
    const userAccountCtx = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);//for loding if book hall

    const [code, setCode] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    async function onPress(){
        setIsSubmitting(true);
        var verify = false;
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, userAccountCtx.email, userAccountCtx.pass)
          .then((userCredential) => {
            // Signed in 
            verify = userCredential.user.emailVerified;
            console.log(userCredential.user.emailVerified);
            // ...
          })
          .catch((error) => {
            console.log(error.message);
          });
    
        if(verify){
            const docRef = doc(db, "Users",  userAccountCtx.userID);
            if(userAccountCtx.record > 0){
                await updateDoc(docRef, {
                    Rule: 0.5
                });
                userAccountCtx.pass = ''
                updateRule(0.5);
            }else{
                await updateDoc(docRef, {
                    Rule: 0
                });
                userAccountCtx.pass = ''
                updateRule(0);
            }
            
            setIsSubmitting(false);
        }else{
            alert('make sure you click the link send to your email');
            setIsSubmitting(false);
        }    
    }
    if(isSubmitting){
        return <LodingOverlay text={"Wait a second"}/>;
    }
    //console.log(userAccountCtx);
    return(
        <SafeAreaView style={styles.safeAreaViewcontainer}>
            <View style={styles.container}>

                <View style={styles.authContentContainer}>
                    <ScrollView style={{flex: 1}}>

                        <Text style={styles.welcome}>Verification</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Link send to your email, please click on that link</Text>
                            <MaterialCommunityIcons name="email-alert-outline" size={104} color={GlobalStyles.colors.primary10} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                onPress={onPress}
                            >
                                <View style={styles.editContainer}>
                                    <Text style={styles.editText}>Done</Text>
                                </View>
                            </Pressable>

                            <Pressable
                                style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                onPress={userAccountCtx.logout}
                            >
                                <View style={styles.closeContainer}>
                                    <Text style={styles.closeText}>Cancel</Text>
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
    textContainer:{
        flex: 1,
        alignItems: 'center',
        marginTop: 146,
    },
    text:{
        fontSize: 17,
        color: GlobalStyles.colors.primary10,
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 146,
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