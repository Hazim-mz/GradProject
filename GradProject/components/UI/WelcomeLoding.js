import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

function LodingOverlay({text}){
    return(
        <View style={styles.view1}>
            <Text style={styles.text1}>{text}</Text>
            <ActivityIndicator size="large" color="white"/>
        </View>
    );
}

export default LodingOverlay;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#E8E8E8',
    },
    text1:{
        marginBottom:  4,
        fontSize: 16,
        fontWeight: "bold",
    },
});
