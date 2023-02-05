import { TouchableOpacity, Text, View } from "react-native";
import { useContext, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

//import { GiftedChat } from 'react-native-gifted-chat';
import { AntDesign } from '@expo/vector-icons';

import { collection, addDoc, orderBy, query, onSnapshot, where, updateDoc, doc, increment } from 'firebase/firestore';
import { db, auth } from '../../config';
import { GiftedChat } from "react-native-gifted-chat";


function Chat({Navigation, route}){
    //معلومات 
    const displayedChat ={
        id: route.params.chatId,
        receiverInfo: route.params.chatReceiverInfo,
        start: route.params.chatStart,
        userID: route.params.chatUserID,
        userEmail: route.params.chatUserEmail,
        userImage: route.params.chatUserImage,
        userRule: route.params.chatUserRule,
    };

    const [messages, setMessages] = useState([]);
    useLayoutEffect(()=>{
        if(displayedChat.userRule < 1){
            const docRef = doc(db, "MessagesRequest",  displayedChat.id);

            updateDoc(docRef, {
                NewOwnerMes: 0
            });
            
            const collectionRef = collection(db, 'Chats');
            const qq = query(collectionRef, where('OwnerID', '==', displayedChat.receiverInfo[0].id), where('UserID', '==', displayedChat.userID));
    
            const unsubscribe = onSnapshot(qq, snapshot =>{
                setMessages(
                    snapshot.docs.map(doc => ({
                        _id: doc.id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        toOwnerID: doc.data().ToOwnerID,
                        fromUserID: doc.data().FromUserID,
                        user: doc.data().user,
                    }))
                )
            });
            return unsubscribe;

        }else{
            const docRef = doc(db, "MessagesRequest",  displayedChat.id);

            updateDoc(docRef, {
                NewUserMes: 0
            });
            
            const collectionRef = collection(db, 'Chats');
            const qq = query(collectionRef, where('OwnerID', '==', displayedChat.userID), where('UserID', '==', displayedChat.receiverInfo[0].id));
    
            const unsubscribe = onSnapshot(qq, snapshot =>{
                setMessages(
                    snapshot.docs.map(doc => ({
                        _id: doc.id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        toOwnerID: doc.data().ToOwnerID,
                        fromUserID: doc.data().FromUserID,
                        user: doc.data().user,
                    }))
                )
            });
            return unsubscribe;
        }

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

        if(displayedChat.userRule < 1){
            addDoc(collection(db, 'Chats'), {
                _id,
                createdAt,
                text,
                OwnerID: displayedChat.receiverInfo[0].id,
                UserID: displayedChat.userID,
                user,
            });
        }else{
            addDoc(collection(db, 'Chats'), {
                _id,
                createdAt,
                text,
                OwnerID: displayedChat.userID,
                UserID: displayedChat.receiverInfo[0].id,
                user,
            });
        }

        const docRef = doc(db, "MessagesRequest",  displayedChat.id);

        if(displayedChat.userRule < 1){
            updateDoc(docRef, {
                NewUserMes: increment(1),
                TimeOfLastMes: createdAt,
                LastMessage: text
            });
        }else{
            updateDoc(docRef, {
                NewOwnerMes: increment(1),
                TimeOfLastMes: createdAt,
                LastMessage: text
            });
        }


        if(! displayedChat.start){
            const docRef = doc(db, "MessagesRequest",  displayedChat.id);

            updateDoc(docRef, {
                Start: true
            });
        }
    }, []);

    return(
        <View style= {{flex: 1, backgroundColor: 'white'}}>
            <GiftedChat 
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: displayedChat.userEmail,
                    avatar: displayedChat.userImage
                }}
                messagesContainerStyle={{
                    backgroundColor: 'white',
                }}
                showAvatarForEveryMessage={false}
            />
        </View>
    );
}

export default Chat;