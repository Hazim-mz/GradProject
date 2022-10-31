import { View, Text, Pressable, ScrollView,StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';


function RoomInformation(){
    return(
        <View style={styles.container}>
            <View style={styles.roomInformationTitle}>
                <Text style={styles.boldName}>Hall Rooms Information :</Text>
            </View>
            <ScrollView 
                style={styles.roomInformationContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.roomInformation}>
                    <Ionicons name="man" size={40} color="black" />
                    <Text style={styles.boldName2}>1 men's council</Text>
                    <Text style={styles.normalName}>16x12</Text>
                </View>
                <View style={styles.roomInformation}>
                    <Ionicons name="woman" size={35} color="black" />
                    <Text style={styles.boldName2}>1 woman's council</Text>
                    <Text style={styles.normalName}>16x12</Text>
                </View>
                <View style={styles.roomInformation}>
                    <Ionicons name="man" size={40} color="black" />
                    <Text style={styles.boldName2}>8 men's bathroom</Text>
                    <Text style={styles.normalName}>2x3</Text>
                </View>
                <View style={styles.roomInformation}>
                    <Ionicons name="woman" size={35} color="black" />
                    <Text style={styles.boldName2}>10 woman's council</Text>
                    <Text style={styles.normalName}>2x3</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default RoomInformation;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal:4,
        borderRadius:3,
    },
    roomInformationTitle:{
        flex: 1,
        backgroundColor: 'white',
        borderRadius:3,
        borderBottomRightRadius:0,
        paddingTop:8,
        paddingLeft:6,
    },
    roomInformationContainer:{
        flex: 1,
        height:170,
        backgroundColor: 'white',
        borderRadius:3,
        borderTopRightRadius:0,
    },
    roomInformation:{
        flex: 1,
        height:120,
        width: 120,
        marginTop:24,
        marginHorizontal:20,
        backgroundColor: '#dfa4f5',
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.15,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible', 
    },
    boldName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldName2:{
        fontSize: 12,
        fontWeight: 'bold',
        textAlign:'center',
    },
    normalName:{
        fontSize: 12,
        textAlign:'center',
    },
});