import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function Input({label, invalid, style, textInputConfig}){

    const textIput2 = [styles.textIput1];

    if(textInputConfig && textInputConfig.multiline){
        textIput2.push(styles.textIput2);
    }
    if(invalid){
        textIput2.push(styles.invalidtextIput);
    }

    return(
        <View style={[styles.view1, style]}>
            <Text style={[styles.text1, invalid && styles.invalidtext]}>{label}</Text>
            <TextInput style={textIput2} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    view1:{
        marginHorizontal: 4,
        marginVertical: 8,
    },
    text1:{
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    textIput1:{
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    textIput2:{
        minHeight: 100,
        maxHeight: 150,
        textAlignVertical: 'top',
    },
    invalidtext:{
        color: GlobalStyles.colors.error500
    },
    invalidtextIput:{
        backgroundColor: GlobalStyles.colors.error50
    },
});