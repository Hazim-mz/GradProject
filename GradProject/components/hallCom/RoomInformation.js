import { View, Text, Pressable, ScrollView,StyleSheet } from "react-native";

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {GlobalStyles} from '../../constants/styles'


function RoomInformation({menCoun, womanCoun, menDin, womanDin, menBath, womanBath}){ 
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
                    <View style={styles.subContainer}>
                        <MaterialCommunityIcons name="sofa-outline" size={40} color={GlobalStyles.colors.primary10} />
                        <Text style={styles.boldName2}>{menCoun} men's council</Text>
                    </View>
                </View>
                <View style={styles.roomInformation}>
                    <View style={styles.subContainer}>
                        <MaterialCommunityIcons name="sofa-outline" size={40} color={GlobalStyles.colors.primary10} />
                        <Text style={styles.boldName2}>{womanCoun} woman's council</Text>
                    </View>
                </View>

                <View style={styles.roomInformation}>
                    <View style={styles.subContainer}>
                        <MaterialCommunityIcons name="table-chair" size={40} color={GlobalStyles.colors.primary10} />
                        <Text style={styles.boldName2}>{menDin} men's Dining</Text>
                    </View>
                </View>

                <View style={styles.roomInformation}>
                    <View style={styles.subContainer}>
                        <MaterialCommunityIcons name="table-chair" size={40} color={GlobalStyles.colors.primary10} />
                        <Text style={styles.boldName2}>{womanDin} woman's Dining</Text>
                    </View>
                </View>
                
                <View style={styles.roomInformation}>
                    <View style={styles.subContainer}>
                        <MaterialCommunityIcons name="toilet" size={40} color={GlobalStyles.colors.primary10} />
                        <Text style={styles.boldName2}>{menBath} men's bathroom</Text>
                    </View>
                </View>

                <View style={styles.roomInformation}>
                    <View style={styles.subContainer}>
                        <MaterialCommunityIcons name="toilet" size={40} color={GlobalStyles.colors.primary10} />
                        <Text style={styles.boldName2}>{womanBath} woman's bathroom</Text>
                    </View>
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
        height: 120,
        width: 120,
        marginTop:24,
        marginHorizontal:20,
        borderRightWidth: 1,
        borderColor: '#cccdb2',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.15,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible', 
    },
    subContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:30
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