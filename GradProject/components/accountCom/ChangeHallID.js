import { View, Text, Alert, Modal, SafeAreaView, ScrollView, Pressable, TextInput, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import {  Feather  } from '@expo/vector-icons'; 

import { Colors, GlobalStyles } from '../../constants/styles';

import { db } from '../../config'; 
import { doc, updateDoc } from 'firebase/firestore';

function ChangeHallID({oldHallID, userID, changeHallID, visible, close}){
    const [hallID, setHallID] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    async function onPress(){
        if(hallID == oldHallID){
            setIsInvalid(true);
        }else{
            const docRef = doc(db, "Users",  userID);
            
            await updateDoc(docRef, {
                Record: hallID,
                Rule: 0.5
            });
            setIsInvalid(false);
            setHallID('');
            changeHallID(hallID);
            close();
        }
        
    }
    return(
        <Modal visible={visible} animationType="slide">
            <SafeAreaView style={styles.safeAreaViewcontainer}>
                <View style={styles.container}>
                    
                    <View style={styles.backButtonContainer}>
                        <Pressable 
                            style={({pressed}) => (pressed ? [styles.backButton,styles.press] : styles.backButton)}
                            onPress={close}
                        >
                            <Feather name="x" size={30} color="#e4dfe6" />
                        </Pressable>
                    </View>

                    <View style={styles.authContentContainer}>
                        <ScrollView style={{flex: 1}}>

                            <Text style={styles.welcome}>Edit Information</Text>

                            <View style={styles.authContent}>
                                <View style={styles.inputContainer}>
                                    <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                                        New Hall ID
                                    </Text>
                                    <TextInput
                                        style={[styles.input, isInvalid && styles.inputInvalid]}
                                        autoCapitalize={false}
                                        keyboardType={"default"}
                                        onChangeText={(newHallID) => {setHallID(newHallID);}}
                                        defaultValue={hallID}
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
                                    onPress={close}
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
        </Modal>
    );
}
export default ChangeHallID;

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
        marginLeft: 12,
    },
    backButton:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6
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