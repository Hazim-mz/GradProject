import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/styles";


import HallImage from "./HallImage";
import DescriptionInformation from "../hallCom/DescriptionInformation";
import Star from "./Star";


Geocoder.init('AIzaSyCy0E0Y4Mf28oZ6YMC-na8s_NtGe5fGCRU');
function HallView({ id, name, description, price, weekendPrice, guests, imageUrl, services, menCoun, womanCoun, menDin, womanDin, menBath, womanBath, report, rate, locationOfHall, locationOfUser, isBlocked, ownerID, ownerEmail, cancelAvailable, date, booking, deleateReservations }) {
    const navigation = useNavigation(); //لانه مب صفحة

    function selectHallHandler() {
        navigation.navigate('HallPage', {
            hallId: id,
            hallName: name,
            hallDescription: description,
            hallPrice: price,
            hallWeekendPrice: weekendPrice,
            hallGuests: guests,
            hallImageUrl: imageUrl,
            hallServices: services,
            hallMenCoun: menCoun,
            hallWomanCoun: womanCoun,
            hallMenDin: menDin,
            hallWomanDin: womanDin,
            hallMenBath: menBath,
            hallWomanBath: womanBath,
            locationOfHall: locationOfHall,
            locationOfUser: locationOfUser,
            hallReport: report,
            hallRate: rate,
            HallIsBlocked: isBlocked,
            ownerID: ownerID,
            ownerEmail: ownerEmail,
        });
    }

    const [locationName, setLocationName] = useState('Riyadh, alnada');
    function GetLocationName(latitude, longitude) {

        Geocoder.from(latitude, longitude)
            .then(json => {
                var addressComponent
                if(json.results[0].address_components[4].long_name == json.results[0].address_components[3].long_name){
                    addressComponent = json.results[0].address_components[5].long_name + ', ' + json.results[0].address_components[3].long_name;
                }else{
                    addressComponent = json.results[0].address_components[4].long_name + ', ' + json.results[0].address_components[3].long_name;
                }

                setLocationName(addressComponent);
            })
            .catch(error => console.warn(error));
    }
    GetLocationName(locationOfHall.latitude, locationOfHall.longitude);
    return (
        <View>
            {
                isBlocked ?
                    <View></View>
                    :
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
                                        <Text style={styles.normalName}>{locationName}</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={styles.boldName}>{price}</Text>
                                        <Text style={styles.normalName}>SR</Text>
                                    </View>
                                </View>

                                <View style={styles.info2}>
                                    {
                                        date ?
                                            <View style={{marginTop: 4}}>
                                                <Text style={styles.boldName}>{date}</Text>
                                            </View>
                                        :
                                        <View style={styles.subinfo2}>
                                            <MaterialCommunityIcons
                                                name="account-group"
                                                size={24} color=
                                                {GlobalStyles.colors.primary10}
                                            />
                                            <View style={styles.guestsContainer}>
                                                <Text style={styles.boldName}>{guests}, </Text>
                                                <Text style={styles.normalName}>Guests</Text>
                                            </View>
                                        </View>
                                    }
                                    {
                                        booking ?
                                            cancelAvailable ?
                                                <Pressable
                                                    style={({ pressed }) => (pressed ? [styles.buttonPressed, styles.button] : styles.button)}
                                                    onPress={deleateReservations.bind(this, id, date)}
                                                >
                                                    <Text style={styles.cancel}>Cancel</Text>
                                                </Pressable>
                                                :
                                                <View></View>
                                            :
                                            <View></View>
                                    }
                                </View>

                            </View>
                        </Pressable>
                    </View>
            }

        </View>
    );
}

export default HallView;

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