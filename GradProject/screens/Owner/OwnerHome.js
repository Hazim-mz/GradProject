import { View, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import OwnerHallView from "../../components/OwnerHallCom/OwnerHallView";
import MyHall from "./MyHall";
import LodingOverlay from "../../components/UI/LodingOverlay";
import { AuthContext } from "../../store/auth-context";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';



function OwnerHome({ route, navigation }){
    const userAccountCtx = useContext(AuthContext);

    const [puchNotificationsAddress, setPuchNotificationsAddress] = useState('');
    useLayoutEffect(() => {
        async function configurePuchNotifications(){
            const { status } = await Notifications.getPresentedNotificationsAsync();
            let finalStatus = status;

            if(finalStatus !== 'granted'){
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if(finalStatus !== 'granted'){
                Alert.alert(
                    'Permission required',
                    'You no longer can get notifications about new reservation or review'
                );
                return;
            }
            const puchTokenData = await Notifications.getExpoPushTokenAsync();
            //console.log(puchTokenData);
            setPuchNotificationsAddress(puchTokenData.data);
        }
        if(userAccountCtx.isAuthenticated){
            configurePuchNotifications();
        }
        
    }, [userAccountCtx.isAuthenticated]);
    useLayoutEffect(() => {
        if(puchNotificationsAddress != '' && userAccountCtx.notificationsAddress == ""){

            const docRef1 = doc(db, "Users",  userAccountCtx.userID);
            updateDoc(docRef1, {
                NotificationsAddress: puchNotificationsAddress
            });

            if(userAccountCtx.rule > 0.5){
                const docRef2 = doc(db, "Halls",  userAccountCtx.userID);
                updateDoc(docRef2, {
                    OwnerNotifAddr: puchNotificationsAddress
                });
            }

            userAccountCtx.notificationsAddress = puchNotificationsAddress;
        }
        
    }, [puchNotificationsAddress]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    //console.log(userAccountCtx);
    const [hall, setHall] = useState([]);

    const [addHallIsVisible, setAddHallIsVisible] = useState(false);
    function openAddHall(){
        setAddHallIsVisible(true);
    }
    function closeAddHall(){
        setAddHallIsVisible(false);
    }

    useEffect(()=>{
        const q = query(collection(db, "Halls"), where("OwnerID", "==", userAccountCtx.userID));
        onSnapshot(q, (Halls) =>{
            setHall(Halls.docs.map((Hall) =>({
                    id: Hall.id,
                    data: Hall.data()
                }))
            )
        });
    }, []);
    //hall.length != 0

    if (isSubmitting) {
        return <LodingOverlay text={"Adding the hall"} />;
    }
    if(hall.length){
        return(
            <View style={styles.container}>
                <OwnerHallView id={hall[0].id} data={hall[0].data} locationOfUser={route.params.locationOfUser}/>             
            </View>
        );
    }else{
        return(
            <View style={styles.noHallcontainer}>
                <MyHall LocationOfUser={route.params.locationOfUser} setIsSubmitting={setIsSubmitting}visible={addHallIsVisible} colse={closeAddHall}/>
                <Pressable
                    style={({pressed}) => (pressed ? styles.buttonPress : null)}
                    onPress={openAddHall}
                >
                    <View style={styles.noHall}>
                        <FontAwesome name="plus" size={140} color="black" />
                    </View>
                </Pressable>
            </View>
        );
    }

}

export default OwnerHome;

const styles = StyleSheet.create({
    noHallcontainer:{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noHall:{
        margin: 8,
        borderRadius: 5,
        borderWidth: 4,
        borderStyle: 'dashed',
        width: 329,
        height: 350,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.05,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPress:{
        opacity: 0.8,
    },
    container:{
        flex: 1,
        justifyContent: 'center',
    },
});
