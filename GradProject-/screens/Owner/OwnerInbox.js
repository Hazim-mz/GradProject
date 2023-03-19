import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image,StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import { AuthContext } from "../../store/auth-context";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, getDocs} from 'firebase/firestore';
import { GlobalStyles } from '../../constants/styles';
import MessageList from '../../components/InboxCom/MessageList';

function OwnerInbox({navigation, route}){
    const userAccountCtx = useContext(AuthContext);
    //console.log(userAccountCtx);
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);

    function onPress(){
        navigation.navigate("LoginOverview");
    }

    useEffect(()=>{
        if(userAccountCtx.isAuthenticated && userAccountCtx.userID !== undefined){
            const q = query(collection(db, "MessagesRequest"), where("OwnerID", "==", userAccountCtx.userID));
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
    
    if(chats.length == 0){
        return(
            <View style={styles.noChatContainer}>

                <Text style={styles.noChatText1}>Start Chating with Hall Owner</Text>
                <Ionicons name="chatbubbles-outline" size={100} color={GlobalStyles.colors.primary10} />
                <Text style={styles.noChatText2}>And Get answer to your questions</Text>

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

export default OwnerInbox;

const styles = StyleSheet.create({
    LoginContainer:{
        flex: 1,
        alignItems: 'center',
        marginTop: 22,
    },
    noChatContainer:{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noChatText1:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    noChatText2:{
        fontSize: 14,
        fontWeight: 'bold',
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