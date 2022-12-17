import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Input from "./Input.js";
import { GlobalStyles } from "../../constants/styles.js";

function HallForm({onCancel, onSubmit}){
    return(
        <View style={styles.view1}>
            <Text style={styles.text1}>Enter Your Coment :</Text>
            <View style={styles.view2}>
                <Input 
                    style={styles.input1}
                />
                
            </View>
        </View>
    );
}

export default HallForm;

const styles = StyleSheet.create({
    view1:{
        marginTop: 30,
    },
    text1:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    view2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input1:{
        flex: 1,
    },
    errorText:{
        color: GlobalStyles.colors.error500,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 8,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});
