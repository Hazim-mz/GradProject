import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image,StyleSheet, Pressable } from "react-native";
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';

import ServiecesIcon from '../../components/hallCom/ServiecesIcon';
import LodingOverlay from '../../components/UI/LodingOverlay';
import { AuthContext } from "../../store/auth-context";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, getDocs} from 'firebase/firestore';
import { GlobalStyles } from '../../constants/styles';
import MessageList from '../../components/InboxCom/MessageList';

function Inbox({navigation, route}){
    const userAccountCtx = useContext(AuthContext);
    //console.log(userAccountCtx);
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);

    function onPress(){
        navigation.navigate("LoginOverview");
    }

    useEffect(()=>{
        if(userAccountCtx.isAuthenticated && userAccountCtx.userID !== undefined){
            const q = query(collection(db, "MessagesRequest"), where("UserID", "==", userAccountCtx.userID));
            onSnapshot(q, (Messages) =>{
                setChats(Messages.docs.map((Message) =>({
                        id: Message.id,
                        data: Message.data()
                    }))
                )
            });
        }
        
        const qq = query(collection(db, "Users"));
        onSnapshot(qq, (Users) =>
            setUsers(Users.docs.map((User) =>({
                    id: User.id,
                    data: User.data()
                }))
            )
        );

    },[userAccountCtx.isAuthenticated]);
    //console.log(chats);
    
    if(! userAccountCtx.isAuthenticated){
        return(
            <View style={styles.LoginContainer}>
                <Text>Login First To See Your Account information</Text>
                <Button title="Login" onPress={onPress}/>
            </View>
        );
    }
    else{
        return(
            <View style={styles.Container}>
                <MessageList Messages={chats} Users={users} UserEmail={userAccountCtx.email} UserImage={userAccountCtx.image} UserRule={userAccountCtx.rule}/>
            </View>
        );
    }
}

export default Inbox;

const styles = StyleSheet.create({
    LoginContainer:{
        flex: 1,
        alignItems: 'center',
        marginTop: 22,
    },
    Container:{
        flex: 1,
    },
    Pressable:{
    },
    PressablePress:{
        opacity: 0.5,
    },
    MessageContainer:{
        height: 120,
        marginTop: 8 ,
        marginHorizontal: 6,
        flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 0.2,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    ImageContainer:{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    ImageShape:{
        height: 70,
        width: 70,
        borderRadius: 35,
        overflow: 'hidden',
        borderWidth: 1,
    },
    Image:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    ContentContainer:{
        flex: 3,
        marginLeft: 2,
        marginTop: 24
    },
    NameContainer:{
        flex: 1,
    },
    Name:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    MessageContentContainer:{
        flex: 3,
        marginLeft: 8,
    },
    Message:{
        fontSize: 12,
    },
    InformationContainer:{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    TimeContainer:{
        flex: 1,
    },
    Time:{
        color:'#D4D4D4',
    },
    NumberOfMessageContainer:{
        flex: 2,
    },
    CircleShape:{
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: GlobalStyles.colors.primary10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 0.1,
    },
    NumberOfMessage:{
        color: 'white',
        fontWeight: 'bold'
    },
});
