import { useState,useCallback, useEffect } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';

import MessageView from "./MessageView";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function MessageList({Messages, Users, UserEmail, UserImage, UserRule }){
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);
    
    //كل اكله لها عنصر
    function renderChatInfo(itemData){
        const item = itemData.item;
        const MessageInfoProps ={
            id: item.id, //هذا عشان نعرف ايدي محادثة اللي بننتقل لها بعدين
            ownerID: item.data.OwnerID,
            start: item.data.Start,
            userID: item.data.UserID,
            newOwnerMes: item.data.NewOwnerMes,
            newUserMes: item.data.NewUserMes,
            timeOfLastMes: item.data.TimeOfLastMes,
            lastMes: item.data.LastMessage,
            userEmail: UserEmail,
            userImage: UserImage,
            userRule: UserRule,
            Users: Users,
        };
        return (
            <MessageView {...MessageInfoProps}/>
        );
    }

    return( 
        //عرض القاعات
        <View style={styles.view1}>
            <FlatList
                style={styles.flat1}
                data={Messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderChatInfo}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
}

export default MessageList;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
    },
    flat1:{
        flex: 1,
    },
  });