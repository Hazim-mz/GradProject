import { View, Text, Pressable, ScrollView,StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

import { GlobalStyles } from "../../constants/styles";

function MainInformation({data, onPress}){ 
    return(
        <View style={styles.mainInfoContainer}>

            <View style={styles.maininfo}>
                <View>
                    <Text style={styles.boldName}>{data[0].name}</Text>
                </View>
                <View style={styles.maininfo2}>
                    <Text style={styles.boldName}>{data[0].price}</Text>
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
                        <Text style={{fontSize:17}}>{data[0].guests}, </Text>
                        <Text style={{fontSize:17}}>Guests</Text>
                    </View>
                </View>
                <View style={styles.guestsInfoContainer}>
                    <Ionicons style={styles.map} name="star" size='18' color='#bfba22' />
                    <Ionicons style={styles.map} name="star" size='18' color='#bfba22' />
                    <Ionicons style={styles.map} name="star" size='18' color='#bfba22' />
                    <Ionicons style={styles.map} name="star" size='18' color='#bfba22' />
                </View>
            </View>

            <View style={styles.maininfo3}>
                <Pressable 
                    style={({pressed}) => (
                        pressed ? [styles.button, styles.maininfo2] : styles.maininfo2
                    )}
                    onPress={onPress}
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
            </View>
        </View>
    );
}

export default MainInformation;

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
    button:{
        opacity: 0.8,
    },
});