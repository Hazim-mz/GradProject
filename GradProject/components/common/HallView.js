import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { GlobalStyles } from "../../constants/styles";


import HallImage from "./HallImage";
import DescriptionInformation from "../hallCom/DescriptionInformation";


function HallView({id, name, description, price, guests, imageUrl, services, bookedDays}){
    const navigation = useNavigation(); //لانه مب صفحة

    function selectHallHandler(){
        navigation.navigate('HallPage', {
            hallId: id,
            hallName: name,
            hallDescription: description,
            hallPrice: price,
            hallGuests: guests,
            hallImageUrl: imageUrl,      
            hallServices: services,
            hallBookedDays: bookedDays,
        });
    }
    
    return(
        <View style={styles.container}>
            
            <View style={{flex: 3}}>
                <HallImage 
                    data={imageUrl} 
                    onPress={selectHallHandler}
                    style={styles.imageContainer}
                />
            </View>
            <Pressable 
                style={({pressed}) => (pressed ? styles.button : null)}
                onPress={selectHallHandler}
            >
                <View style={styles.infoContainer}>

                    <View style={styles.info}>
                        <View>
                            <Text style={styles.boldName}>{name}</Text>
                        </View>
                        <View style={styles.info}>
                            <Ionicons style={styles.map} name="star" size='15' color='#bfba22' />
                            <Ionicons style={styles.map} name="star" size='15' color='#bfba22' />
                            <Ionicons style={styles.map} name="star" size='15' color='#bfba22' />
                            <Ionicons style={styles.map} name="star" size='15' color='#bfba22' />
                        </View>
                    </View>

                    <View style={styles.info}>
                        <View>
                            <Text style={styles.normalName}>Riyadh, alnada</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.boldName}>{price}</Text>
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
                            <Text style={styles.boldName}>{guests}, </Text>
                            <Text style={styles.normalName}>Guests</Text>
                        </View>
                    </View>

                </View>
            </Pressable>
        </View>
    );
}

export default HallView;

const styles = StyleSheet.create({
    container:{
        margin: 8,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.05,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    button:{
        opacity: 0.8,
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
    },
    info:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info2:{
        flexDirection: 'row',
    },
    info3:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 4,
    },
    boldName:{
        fontSize: 12,
        fontWeight: 'bold',
    },
    normalName:{
        fontSize: 12,
    },
});
