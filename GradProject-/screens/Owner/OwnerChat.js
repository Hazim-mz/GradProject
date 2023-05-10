import { TouchableOpacity, Text, View } from "react-native";
import { useContext, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

//import { GiftedChat } from 'react-native-gifted-chat';
import { AntDesign } from '@expo/vector-icons';

import { collection, addDoc, orderBy, query, onSnapshot, where, updateDoc, doc, increment } from 'firebase/firestore';
import { db, auth } from '../../config';
import { GiftedChat } from "react-native-gifted-chat";


function OwnerChat({Navigation, route}){
    //معلومات 
    const displayedChat ={
        id: route.params.chatId,
        ownerInfo: route.params.chatOwnerInfo,
        start: route.params.chatStart,
        userID: route.params.chatUserID,
        userEmail: route.params.chatUserEmail,
        userImage: route.params.chatUserImage,
    };

    const [messages, setMessages] = useState([]);
    useLayoutEffect(()=>{
        const docRef = doc(db, "MessagesRequest",  displayedChat.id);

        updateDoc(docRef, {
            NewOwnerMes: 0
        });

        const collectionRef = collection(db, 'Chats');
        const qq = query(collectionRef, where('toUserID', '==', displayedChat.ownerInfo[0].id), where('user._id', '==', displayedChat.userEmail));
 
        const unsubscribe = onSnapshot(qq, snapshot =>{
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    toUserID: doc.data().toUserID,
                    user: doc.data().user,
                }))
            )
        });
        return unsubscribe;
    }, []);
    

    //Sort Messages
    useLayoutEffect(()=>{
        if(messages.length>0){
            let list= messages.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
        }

    }, [messages]);

    
    const onSend = useCallback((messages = [])=>{
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const {_id, createdAt, text, user} = messages[0];

        addDoc(collection(db, 'Chats'), {
            _id,
            createdAt,
            text,
            toUserID: displayedChat.ownerInfo[0].id,
            user,
        });

        const docRef = doc(db, "MessagesRequest",  displayedChat.id);

        updateDoc(docRef, {
            NewUserMes: increment(1),
            TimeOfLastMes: createdAt,
            LastMessage: text
        });


        if(! displayedChat.start){
            const docRef = doc(db, "MessagesRequest",  displayedChat.id);

            updateDoc(docRef, {
                Start: true
            });
        }
    }, []);

    return(
        <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: displayedChat.userEmail,
                avatar: displayedChat.userImage
            }}
            messagesContainerStyle={{
                
            }}
            showAvatarForEveryMessage={false}
        />
    );
}

export default OwnerChat;