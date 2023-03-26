import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

function ErrorOverlay({message, onConfirm}){
    return(
        <View style={styles.view1}>
            <Text style={[styles.text, styles.text1]}>An error occurred!</Text>
            <Text style={[styles.text, styles.text2]}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text:{
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    text1:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    text2:{
        fontSize: 14,
    },
});