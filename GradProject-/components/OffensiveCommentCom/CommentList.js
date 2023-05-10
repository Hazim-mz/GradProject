import { useState,useCallback, useEffect } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';

import CommentView from "./CommentView";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function CommentList({Comments, Halls, Ignore, Delete}){
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);
    
    //كل اكله لها عنصر
    function renderCommentInfo(itemData){
        const item = itemData.item;
        const commentInfoProps ={
            id: item.id, //هذا عشان نعرف ايدي قاعة اللي بننتقل لها بعدين
            comment: item.data.Comment,
            hallsID: item.data.HallsID,
            rate: item.data.Rate,
            userID: item.data.UserID,
            userImage: item.data.UserImage,
            userName: item.data.UserName,
            Halls: Halls,
            Ignore: Ignore,
            Delete: Delete,
        };
        return (
            <CommentView {...commentInfoProps}/>
        );
    }

    return( 
        //عرض القاعات
        <View style={styles.view1}>
            <FlatList
                style={styles.flat1}
                data={Comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderCommentInfo}
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

export default CommentList;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
    },
    flat1:{
        flex: 1,
    },
  });