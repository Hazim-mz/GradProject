import { View, Text, Pressable, ScrollView,StyleSheet } from "react-native";
import { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

import { GlobalStyles } from "../../constants/styles";
import Star from "../Common/Star";

function OwnerMainInformation({data, onPressLocation, openEditSpecialPrice}){ 

    return(
        <View style={styles.mainInfoContainer}>

            <View style={styles.maininfo}>
                <View>
                    <Text style={styles.boldName}>{data.name}</Text>
                </View>
                <View style={styles.maininfo2}>
                    <Text style={styles.boldName}>{data.price}</Text>
                    <Text style={styles.normalName}> SR</Text>
                </View>
            </View>

            <View style={styles.maininfo}>
                <View style={styles.maininfo2}>
                    <View>
                        <MaterialCommunityIcons 
                            name="account-group" 
                            size={30} 
                            color={GlobalStyles.colors.primary10} 
                        />
                    </View>
                    <View style={styles.guestsInfoContainer}>
                        <Text style={{fontSize:17}}>{data.guests}, </Text>
                        <Text style={{fontSize:17}}>Guests</Text>
                    </View>
                </View>
                    <Star rate={data.rate} size={18} />
            </View>

            <View style={styles.maininfo3}>
                <Pressable 
                    style={({pressed}) => (
                        pressed ? [styles.button, styles.maininfo2] : styles.maininfo2
                    )}
                    onPress={onPressLocation}
                >
                    <View>
                        <FontAwesome5 
                            name="map-marked-alt" 
                            size={25} 
                            color= {GlobalStyles.colors.primary10} 
                        />
                    </View>
                    <View style={styles.loctionInfoContainer}>
                        <Text style={{fontSize:14, fontWeight:'bold'}}>Location</Text>
                    </View>
                </Pressable>
                <View style={styles.BookContainer}>
                    <View>

                        <Pressable
                            style={({pressed}) => (pressed ? styles.button : null)}
                            onPress={openEditSpecialPrice}
                        >
                            <View style={styles.buttonDesign}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Price On Day</Text>
                            </View>
                        </Pressable>
                
                    </View>
                </View>

            </View>
        </View>
    );
}

export default OwnerMainInformation;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imageContainer:{
        flex: 1,
        width: 375,
        height: 282,
        overflow: 'hidden',
    },
    InfoContainer:{
        flex: 1,
    },
    mainInfoContainer:{
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        borderRadius: 3,
        backgroundColor: 'white'
    },
    maininfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        
    },
    maininfo2:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    maininfo3:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
    },
    guestsInfoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginLeft: 2,
    },
    loctionInfoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginLeft: 3,
    },
    BookContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    choosingDayContainer:{
        marginRight: 4,
    },
    choosingDayText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    calendar:{
        marginRight: 8
    },
    line:{
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
        marginVertical: 4,
    },
    boldName:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    normalName:{
        fontSize: 20,
    },
    buttonDesignNoClick:{
        height: 30,
        width: 70,
        borderRadius: 5,
        borderWidth:1,
        borderColor: '#a19c8f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDesign:{
        height: 35,
        width: "105%",
        borderRadius: 5,
        backgroundColor: GlobalStyles.colors.primary10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        opacity: 0.8,
    },
});