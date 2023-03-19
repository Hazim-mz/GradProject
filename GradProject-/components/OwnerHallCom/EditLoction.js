import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import { Ionicons, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';


function EditLoction({locationOfHall, setLocationOfHall}) {
    var tempLatitude;
    var tempLongitude;

    return (
        <View style={styles.mainInfoContainer}>


            <View style={styles.maininfo}>

                <Text style={styles.boldName}>Hall Loction: </Text>
                    <View style={styles.mapContainer}>
                        <MapView 
                            provider={PROVIDER_GOOGLE}
                            style={styles.map} 
                            initialRegion={{
                                longitude: locationOfHall.longitude,
                                latitude: locationOfHall.latitude,
                                longitudeDelta: 0.2,
                                latitudeDelta: 0.2,
                            }}
                            onPress={(e)=>{
                                tempLongitude= e.nativeEvent.coordinate.longitude;
                                tempLatitude = e.nativeEvent.coordinate.latitude;
                                setLocationOfHall({longitude: tempLongitude, latitude: tempLatitude});
                            }}
                        >
                            <Marker
                                coordinate={{latitude: locationOfHall.latitude, longitude: locationOfHall.longitude}}
                                //draggable={true}
                            >
                            </Marker>
                        </MapView>
                    </View>
            </View>

        </View>


    );
}

export default EditLoction;


const styles = StyleSheet.create({
    mainInfoContainer: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 4,
        marginHorizontal: 3,
        borderRadius: 3,
        backgroundColor: 'white'
    },
    maininfo: {
        flexDirection: 'coulmn',
        marginVertical: 3
    },
    boldName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    mapContainer:{
        flex: 1,
        height: 280,
        width: 350,
        marginVertical: 4,
        alignSelf: 'center'
    },
    map:{
        width: '100%',
        height: '100%',
    },
});
