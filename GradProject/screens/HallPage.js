import { useLayoutEffect } from "react";
import { View, Text, Pressable, ScrollView,StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

import { HALLS } from '../data/dummy-data';
import HallImage from "../components/common/HallImage";
import { GlobalStyles } from "../constants/styles";
import MainInformation from "../components/hallCom/MainInformation";
import RoomInformation from "../components/hallCom/RoomInformation";


function HallPage({route, navigation}){
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return(
                    <Pressable
                    >
                        <View>
                        </View>
                    </Pressable>
                );
            }
        });
    }, [navigation]);

    //معلومات القاعة
    const HallId = route.params.hallId;
    const displayedHall = HALLS.filter((hallItem) => {
        return hallItem.id == HallId;
    });

    function pressLoctionHandler(){
        return;
    }

    return(
        <View style={styles.container}>
            <ScrollView>

                <View style={{flex: 1}}>
                    <HallImage 
                        data={displayedHall[0].imageUrl}
                        style={styles.imageContainer}
                    />
                </View>

                <View style={styles.InfoContainer}>

                    <MainInformation data={displayedHall} onPress={pressLoctionHandler}/>

                    <View style={styles.line}></View>

                    <RoomInformation />

                    <View style={styles.line}></View>
                </View>
            </ScrollView>
        </View>
    );
}

export default HallPage;

const styles = StyleSheet.create({
    container:{
        flex: 1
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
    line:{
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
        margintop: 4,
        marginBottom: 6,
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
    button:{
        opacity: 0.8,
    },
});