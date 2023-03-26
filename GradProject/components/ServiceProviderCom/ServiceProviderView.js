import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/styles";


import HallImage from "../common/HallImage";
import Star from "../common/Star";


function ServiceProviderView({ id, name, photogEmail, photogID, price, rate, imageUrl}) {
    const navigation = useNavigation(); //لانه مب صفحة

    function selectHallHandler() {
        navigation.navigate('HallPage', {
        });
    }

    return (
        <View style={styles.container}>

            <View style={{ flex: 3 }}>
                <HallImage
                    data={imageUrl}
                    onPress={selectHallHandler}
                    style={styles.imageContainer}
                    press={true}
                />
            </View>
            <Pressable
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={selectHallHandler}
            >
                <View style={styles.infoContainer}>

                    <View style={styles.info}>
                        <View>
                            <Text style={styles.boldName}>{name}</Text>
                        </View>
                        <View style={styles.info}>
                            <Star size={15} rate={rate} />
                        </View>
                    </View>

                    <View style={styles.info}>
                        <View>
                            <Text style={styles.normalName}>الرياض</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.boldName}>{price}</Text>
                            <Text style={styles.normalName}>SR</Text>
                        </View>
                    </View>

                    <View style={styles.info2}>

                        <View style={styles.subinfo2}>
                            <MaterialCommunityIcons
                                name="account-group"
                                size={24} color=
                                {GlobalStyles.colors.primary10}
                            />
                            <View style={styles.guestsContainer}>
                                <Text style={styles.boldName}>24, </Text>
                                <Text style={styles.normalName}>Guests</Text>
                            </View>
                        </View>
                        
                    </View>

                </View>
            </Pressable>
        </View>
    );
}

export default ServiceProviderView;

const styles = StyleSheet.create({
    container:{
        margin: 8,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowOffset: { width: 2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        
    },
    imageContainer:{
        flex: 1,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: 359,
        height: 282,
        overflow: 'hidden',
        
    },
    image1:{
        width: '100%',
        height: '100%',
    },
    infoContainer:{
        flex: 1,
        justifyContent: 'space-between',
        margin: 2,
        padding:6
    },
    info:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info2:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subinfo2:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    guestsContainer:{
        flexDirection: 'row',
        marginTop: 4,
    },
    button:{
        marginTop: 4,
        padding:1
    },
    buttonPressed:{
        opacity: 0.8,
    },
    boldName:{
        fontSize: 12,
        fontWeight: 'bold',
    },
    normalName:{
        fontSize: 12,
    },
    cancel:{
        fontSize: 12,
        fontWeight: 'bold',
        color: 'red'
    },
});