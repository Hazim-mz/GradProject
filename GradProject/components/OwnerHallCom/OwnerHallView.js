import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { GlobalStyles } from "../../constants/styles";


import HallImage from "../common/HallImage";
import Star from "../common/Star";

Geocoder.init('AIzaSyCy0E0Y4Mf28oZ6YMC-na8s_NtGe5fGCRU');
function OwnerHallView({id, data, locationOfUser}){
    const navigation = useNavigation(); //لانه مب صفحة

    function selectHallHandler(){
        console.log(data.ManDining);
        navigation.navigate('HallPage', {
            hallId: id,
            hallName: data.Name,
            hallDescription: data.Description,
            hallPrice: data.Price,
            hallGuests: data.Guests,
            hallImageUrl: data.imageUrl,      
            hallServices: data.Services,
            hallMenCoun: data.MenCouncil,
            hallManDin: data.MenDining,
            hallWomanDin: data.WomanDining,
            hallMenBath: data.MenBathroom,
            hallWomanCoun: data.WomanCouncil,
            hallWomanBath: data.WomanBathroom,
            locationOfHall: data.Location,
            locationOfUser: locationOfUser,
            hallReport: data.Report,
            hallRate: data.Rate,
        });
    }

    const [locationName, setLocationName] = useState('Riyadh, alnada');
    function GetLocationName(latitude, longitude){
        
        Geocoder.from(latitude, longitude)
		.then(json => {
        		var addressComponent = json.results[0].address_components[3].long_name;
			    setLocationName(addressComponent);
		})
		.catch(error => console.warn(error));
    }
    GetLocationName(data.Location.latitude, data.Location.longitude);

    return(
        <View style={styles.container}>
            
            <View style={styles.imageContainer}>
                <HallImage 
                    data={data.imageUrl} 
                    onPress={selectHallHandler}
                    style={styles.image}
                    press={true}
                />
            </View>
            <Pressable 
                style={({pressed}) => (pressed ? [styles.buttonToHall, styles.infoContainerButton] : styles.infoContainerButton)}
                onPress={selectHallHandler}
            >
                <View style={styles.infoContainer}>

                    <View style={styles.info}>
                        <View>
                            <Text style={styles.boldName}>{data.Name}</Text>
                        </View>
                        <View style={styles.info}>
                            <Star size={17} rate={data.Rate}/>
                        </View>
                    </View>

                    <View style={styles.info}>
                        <View>
                            <Text style={styles.normalName}>{locationName}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.boldName}>{data.Price}</Text>
                            <Text style={styles.normalName}>SR</Text>
                        </View>
                    </View>

                    <View style={styles.info2}>
                        <View>
                            <MaterialCommunityIcons 
                                name="account-group" 
                                size={30} color= 
                                {GlobalStyles.colors.primary10} 
                            />
                        </View>
                        <View style={styles.info3}>
                            <View style={styles.guestsContainer}>
                                <Text style={styles.boldName}>{data.Guests}, </Text>
                                <Text style={styles.normalName}>Guests</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </Pressable>
        </View>
    );
}

export default OwnerHallView;

const styles = StyleSheet.create({
    container:{
        margin: 8,
        borderRadius: 8,
        backgroundColor: 'white',
        width: 359,
        height: 390,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.05,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    imageContainer:{
        height: 270,
    },
    image:{
        flex: 1,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: 359,
        height: 292,
        overflow: 'hidden',
    },
    buttonToHall:{
        opacity: 0.8,
    },
    infoContainerButton:{
        flex: 1,
    },
    infoContainer:{
        height: 115,
        justifyContent: 'space-between',
        margin: 2,
    },
    info:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info2:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    info3:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 4,
        alignContent: 'space-between',
        justifyContent: 'space-between'
    },
    guestsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    button:{
        marginLeft: 206
    },
    buttonPressed:{
        opacity: 0.8,
    },
    boldName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    normalName:{
        fontSize: 16,
    },
    cancel:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    },
});