import { View, Text, Button, Image, StyleSheet, Pressable } from "react-native";
import { useContext, useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons'; 

import { AuthContext } from "../../store/auth-context";
import ChangeImage from "../../components/accountCom/ChangeImage";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, getDocs} from 'firebase/firestore';
import ChangeName from "../../components/accountCom/ChangeName";
import { GlobalStyles } from "../../constants/styles";
import ChangeEmail from "../../components/accountCom/ChangeEmail";
import ChangePassword from "../../components/accountCom/ChangePassword";
import ChangeHallID from "../../components/accountCom/ChangeHallID";

function Account({navigation, route}){
    const userAccountCtx = useContext(AuthContext);
    //console.log(userAccountCtx);
    function onPress(){
        navigation.navigate("LoginOverview");
    }

    //change Image
    const [imageIsVisible, setImageIsVisible] = useState(false);
    function openImage(){
        setImageIsVisible(true);
    }
    function closeImage(){
        setImageIsVisible(false);
    }
    function changeImage(image){
        setImage(image);
        userAccountCtx.image = image;
    }
    //change Name
    const [nameIsVisible, setNameIsVisible] = useState(false);
    function openName(){
        setNameIsVisible(true);
    }
    function closeName(){
        setNameIsVisible(false);
    }
    function changeName(Name){
        userAccountCtx.name = Name;
    }

    //change Email
    const [emailIsVisible, setEmailIsVisible] = useState(false);
    function openEmail(){
        setEmailIsVisible(true);
    }
    function closeEmail(){
        setEmailIsVisible(false);
    }
    function changeEmail(idToken, email){
        userAccountCtx.token = idToken;
        userAccountCtx.email = email;
    }

    //change Pasword
    const [passwordIsVisible, setPaswordIsVisible] = useState(false);
    function openPasword(){
        setPaswordIsVisible(true);
    }
    function closePasword(){
        setPaswordIsVisible(false);
    }
    function changePasword(idToken){
        userAccountCtx.token = idToken;
    }

    //change Hall ID if he owner
    const [hallIDIsVisible, setHallIDIsVisible] = useState(false);
    function openHallID(){
        setHallIDIsVisible(true);
    }
    function closeHallID(){
        setHallIDIsVisible(false);
    }
    function changeHallID(record){
        userAccountCtx.record = record;
    }

    const [numberOfReservations, setNumberOfReservations] = useState([]);
    const [image, setImage] = useState('https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png');
    useEffect(()=>{
        if(userAccountCtx.isAuthenticated && userAccountCtx.userID !== undefined){
            const dates = query(collection(db, "Reservation"), where("UserID", "==", userAccountCtx.userID));
            onSnapshot(dates, (Reservation) =>{
                setNumberOfReservations(Reservation.docs.map((reservations) =>({
                        id: reservations.id,
                        data: reservations.data()
                    }))
                )
            });
            setImage(userAccountCtx.image);
        }
    },[userAccountCtx.isAuthenticated]);




    if(! userAccountCtx.isAuthenticated){
        return(
            <View style={styles.container}>
                <Text>Login First To See Your Account information</Text>
                <Button title="Login" onPress={onPress}/>
            </View>
        );
    }
    else{
        return(
            <View style={styles.container}>

                <ChangeImage userID={userAccountCtx.userID} image={image} changeImage={changeImage} visible={imageIsVisible} close={closeImage}/>

                <ChangeName oldName={userAccountCtx.name} userID={userAccountCtx.userID} changeName={changeName} visible={nameIsVisible} close={closeName}/>

                <ChangeEmail oldEmail={userAccountCtx.email} userID={userAccountCtx.userID} idToken={userAccountCtx.token} changeEmail={changeEmail} visible={emailIsVisible} close={closeEmail}/>

                <ChangePassword userID={userAccountCtx.userID} idToken={userAccountCtx.token} changePasword={changePasword} visible={passwordIsVisible} close={closePasword}/>

                <ChangeHallID oldHallID={userAccountCtx.record} userID={userAccountCtx.userID} changeHallID={changeHallID} visible={hallIDIsVisible} close={closeHallID}/>

                <View style={styles.subContainer1}>
                    <View style={styles.imageContainer}>
                            <Pressable
                                style={({pressed}) => (pressed ? styles.buttonPress : null)}
                                onPress={openImage}
                            >
                                <Image                                     
                                    source={{uri: image}}
                                    style={styles.image}
                                />
                            </Pressable>
                    </View>
                </View>
                <View style={styles.subContainer2}>
                    <View style={styles.informationContainer}>

                        <View style={styles.nameContainer}>
                            <View style={styles.name}>
                                <Text style={styles.nameLabel}>Name: </Text>
                                <Text style={styles.nameText}>{userAccountCtx.name}</Text>
                            </View>
                            <Pressable
                                style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                onPress={openName}
                            >
                                <Entypo name="edit" size={18} color="black" />
                            </Pressable>
                        </View>

                        <View style={styles.emailContainer}>
                            <View style={styles.email}>
                                <Text style={styles.emailLabel}>Email: </Text>
                                <Text style={styles.emailText}>{userAccountCtx.email}</Text>
                            </View>
                            <Pressable
                                style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                onPress={openEmail}
                            >
                                <Entypo name="edit" size={18} color="black" />
                            </Pressable>
                        </View>

                        <View style={styles.emailContainer}>
                            <View style={styles.email}>
                                <Text style={styles.emailLabel}>Password: </Text>
                                <Text style={styles.emailText}>*********</Text>
                            </View>
                            <Pressable
                                style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                onPress={openPasword}
                            >
                                <Entypo name="edit" size={18} color="black" />
                            </Pressable>
                        </View>

                        {
                            userAccountCtx.rule > 0 ?
                                <View style={styles.emailContainer}>
                                    <View style={styles.email}>
                                        <Text style={styles.emailLabel}>Hall ID: </Text>
                                        <Text style={styles.emailText}>{userAccountCtx.record}</Text>
                                    </View>
                                    <Pressable
                                        style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                        onPress={openHallID}
                                    >
                                        <Entypo name="edit" size={18} color="black" />
                                    </Pressable>
                                </View>
                            :

                                <View></View>
                        }

                        <View style={styles.bookContainer}>
                            <View style={styles.book}>
                                <Text style={styles.bookLabel}>Number of bookings: </Text>
                                <Text style={styles.bookText}>{numberOfReservations.length}</Text>
                            </View>
                        </View>
                        <Pressable
                            style={({pressed}) => (pressed ? [styles.logoutButtonPress, styles.logoutButton] : styles.logoutButton)}
                            onPress={userAccountCtx.logout}
                        >
                            <View style={styles.logoutContainer}>
                                <Text style={styles.logoutText}>Logout</Text>
                            </View>
                        </Pressable>
                    </View>

                </View>
            </View>
        );
    }
}

export default Account;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 22
    },
    subContainer1:{
        flex: 1,
        // alignItems: 'center',
        // marginTop: 6
    },
    imageContainer:{
        width: 140,
        height: 140,
        borderRadius: 70,
        overflow: 'hidden',
        borderWidth: 2,
    },
    button:{
        marginLeft: 60,
        marginTop: 5,
    },
    buttonPress:{
        opacity: 0.5,
    },
    image:{
        width: '100%',
        height: '100%',
    },
    subContainer2:{
        flex: 3,
        alignItems: 'center',
        marginTop: 25,
        borderTopWidth: 1,
        // marginTop: 6
    },
    informationContainer:{
        flex: 1,
        marginTop: 10,
    },
    nameContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name:{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    nameLabel:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    nameText:{
        fontSize: 16,
    },
    emailContainer:{
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center'
    },
    email:{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        borderTopWidth: 1,
        paddingTop: 12,
    },
    emailLabel:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    emailText:{
        fontSize: 16,
    },
    bookContainer:{
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center'
    },
    book:{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        borderTopWidth: 1,
        paddingTop: 12,
    },
    bookLabel:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    bookText:{
        marginLeft: 8,
        fontSize: 16,
    },
    logoutContainer:{
        backgroundColor: '#ba3c30',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        height: 40,
        marginHorizontal: 45,
        marginTop: 30
    },
    logoutText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    logoutButton:{
        flex: 1,
    },
    logoutButtonPress:{
        opacity: 0.7,
    },
});
