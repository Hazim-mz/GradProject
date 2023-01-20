import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Checkbox from 'expo-checkbox';

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';

const initialServices = {
    teaBoy: true,
    Incense: true,
    Cooking: true
};
function Filter({Halls, oldHalls, FilterHalls, visible, close}){
    const [services, setServices] = useState(initialServices);

    function onPressFilter(){
        var newHalls;
        if(Halls >= oldHalls){
            newHalls= Halls.filter(item =>{
                return (
                    item.data.Services[0].isAvailable === services.teaBoy&& 
                    item.data.Services[1].isAvailable === services.Incense&& 
                    item.data.Services[2].isAvailable === services.Cooking
                ); 
            });
        }
        else{
            newHalls= oldHalls.filter(item =>{
                return (
                    item.data.Services[0].isAvailable === services.teaBoy&& 
                    item.data.Services[1].isAvailable === services.Incense&& 
                    item.data.Services[2].isAvailable === services.Cooking
                ); 
            });
        }
        FilterHalls(newHalls);
        close();
    }
    
    return(
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Hall Filter</Text>
                </View>
                <View style={styles.checkContainer}>
                    <Text style={styles.checkTitle}>Tea Boy:</Text>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={services.teaBoy}
                            onValueChange={value =>
                                setServices({
                                    ...services,
                                    teaBoy: value,
                                })
                            }
                        />
                        <Text style={styles.checkboxName}>Yes</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={! services.teaBoy}
                            onValueChange={value =>
                                setServices({
                                    ...services,
                                    teaBoy: ! value,
                                })
                            }
                        />
                        <Text style={styles.checkboxName}>No</Text>
                    </View>


                    <Text style={styles.checkTitle}>Incense:</Text>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={services.Incense}
                            onValueChange={value =>
                                setServices({
                                    ...services,
                                    Incense: value,
                                })
                            }
                        />
                        <Text style={styles.checkboxName}>Yes</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={! services.Incense}
                            onValueChange={value =>
                                setServices({
                                    ...services,
                                    Incense:! value,
                                })
                            }
                        />
                        <Text style={styles.checkboxName}>No</Text>
                    </View>


                    <Text style={styles.checkTitle}>Cooking:</Text>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={services.Cooking}
                            onValueChange={value =>
                                setServices({
                                    ...services,
                                    Cooking: value,
                                })
                            }
                        />
                        <Text style={styles.checkboxName}>Yes</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={! services.Cooking}
                            onValueChange={value =>
                                setServices({
                                    ...services,
                                    Cooking: ! value,
                                })
                            }
                        />
                        <Text style={styles.checkboxName}>No</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={onPressFilter}
                        title="Save"
                    />
                    <Button
                        onPress={close}
                        title="Cancel"
                    />
                </View>
            </View>
        </Modal>
    );
}

export default Filter;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 80,
    },
    titleContainer:{
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
    },
    title:{
        fontSize:30,
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomWidth: 2,
    },
    checkContainer:{
        marginTop: 32,
        marginLeft: 4,
    },
    checkTitle:{
        fontSize:18,
        fontWeight: 'bold',
    },
    checkboxContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox:{
        marginHorizontal: 6,
        marginVertical: 6,
    },
    checkboxName:{
        fontSize:16,
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60
    },
});