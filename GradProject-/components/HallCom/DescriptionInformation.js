import { View, Text, Pressable, ScrollView,StyleSheet } from "react-native";

function DescriptionInformation({description}){
    return(
        <View style={styles.descriptionContainer}>
            <Text style={styles.boldName}>Description: </Text>
            <Text>{description}</Text>
        </View>
    );
}

export default DescriptionInformation;

const styles = StyleSheet.create({
    boldName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    descriptionContainer:{
        minHeight:100,
    },
});