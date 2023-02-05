import { View, Text, Image, Modal, Pressable, StyleSheet } from "react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

//import Carousel from 'react-native-snap-carousel';

import MapView, { Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';

import { GlobalStyles } from "../../constants/styles";
import Star from "../common/Star";

function HallMap({Halls, oldHalls, locationOfUser, visible, close}){
    const navigation = useNavigation(); //لانه مب صفحة

    function selectHallHandler(id, name, description, price, guests, imageUrl, services, locationOfHall, report, rate, ownerID, ownerEmail){
        close();
        navigation.navigate('HallPage', {
            hallId: id,
            hallName: name,
            hallDescription: description,
            hallPrice: price,
            hallGuests: guests,
            hallImageUrl: imageUrl,      
            hallServices: services,
            locationOfHall: locationOfHall,
            locationOfUser: locationOfUser,
            hallReport: report,
            hallRate: rate,
            ownerID: ownerID,
            ownerEmail: ownerEmail,
        });
    }
    return(
        <Modal visible={visible} animationType="fade">

            <View style={styles.Backcontainer}>

                <View style={styles.backButtonContainer}>
                    <Pressable 
                        style={({pressed}) => (pressed ? [styles.backButton, styles.press] : styles.backButton)}
                        onPress={close}
                    >
                        <AntDesign name="arrowleft" size={30} color="#e4dfe6" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </Pressable>
                </View>

                <View style={styles.namePageContainer}>
                    <Text style={styles.namePageText}>Map</Text>
                </View>

            </View>

            <View style={styles.container}>
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    style={styles.map} 
                    showsUserLocation={true}
                    initialRegion={{
                        longitude: locationOfUser.longitude,
                        latitude: locationOfUser.latitude,
                        longitudeDelta: 0.09,
                        latitudeDelta: 0.035,
                    }}
                >
                    {
                        Halls.map((hall, index) =>{
                            return(
                                <Marker
                                    key={hall.id}
                                    coordinate={{latitude: hall.data.Location.latitude, longitude: hall.data.Location.longitude}}
                                >
                                    <Callout 
                                        style={styles.callout} 
                                        tooltip={true}
                                        onPress={selectHallHandler.bind(
                                            this, hall.id, hall.data.Name, hall.data.Description, hall.data.Price, hall.data.Guests, hall.data.imageUrl,
                                            hall.data.Services, hall.data.Location, hall.data.Report, hall.data.Rate, hall.data.OwnerID, hall.data.OwnerEmail
                                        )}
                                    >
                                        <Pressable
                                            style={({pressed}) => ( pressed ? [styles.buttonPressed, styles.button] : styles.button)}
                                        >
                                            <View style={styles.calloutContainer}>

                                                <View style={styles.imageContainer}>
                                                    <Image 
                                                        style={styles.image}
                                                        source={{uri: hall.data.imageUrl[0]}}
                                                    />
                                                </View>

                                                <View style={styles.infoContainer}>

                                                    <View style={styles.info}>
                                                        <View>
                                                            <Text style={styles.boldName}>{hall.data.Name}</Text>
                                                        </View>
                                                        <View style={styles.info}>
                                                            <Star size={15} rate={hall.data.Rate}/>
                                                        </View>
                                                    </View>

                                                    <View style={styles.info}>
                                                        <View>
                                                            <Text style={styles.normalName}>Riyadh, alnada</Text>
                                                        </View>
                                                        <View style={styles.info}>
                                                            <Text style={styles.boldName}>{hall.data.Price}</Text>
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
                                                                <Text style={styles.boldName}>{hall.data.Guests}, </Text>
                                                                <Text style={styles.normalName}>Guests</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>

                                            </View>
                                        </Pressable>
                                    </Callout>
                                </Marker>
                            )
                        })
                    }

                </MapView>
            </View>
        </Modal>
    );
}

export default HallMap;

const styles = StyleSheet.create({
    Backcontainer:{
        height: 65,
        backgroundColor: GlobalStyles.colors.primary10,
        flexDirection: 'row'
    },
    backButtonContainer:{
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary10,
        marginTop: 20,
    },
    backButton:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6
    },
    backButtonText:{
        fontSize: 16,
        color: '#e4dfe6'
    },
    press:{
        opacity: 0.8,
    },
    namePageContainer:{
        flex: 1,
        flexDirection: 'column-reverse',
        marginBottom: 12,
        marginRight: 38,
    },
    namePageText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    container:{
        flex: 1,
        borderTopRightRadius: 5,
    },
    callout:{
        backgroundColor: '#ffffff',
    },
    calloutContainer:{
        flex: 1,
        borderRadius: 5,
        width: 180,
    },
    imageContainer:{
        flex: 1,
    },
    image:{
        width: '100%',
        height: 100,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    map:{
        borderTopRightRadius: 5,
        width: '100%',
        height: '100%',
    },
    infoContainer:{
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
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