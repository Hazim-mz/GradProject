import { useState,useCallback, useEffect } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';

import AcceptView from "./AcceptView";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function AcceptList({Owners, Accept, Reject}){
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);
    
    //كل اكله لها عنصر
    function renderOwnersInfo(itemData){
        const item = itemData.item;
        const ownerInfoProps ={
            id: item.id, //هذا عشان نعرف ايدي قاعة اللي بننتقل لها بعدين
            name: item.data.Name,
            record: item.data.Record,
            email: item.data.Email,
            accept: Accept,
            reject: Reject,
        };
        return (
            <AcceptView {...ownerInfoProps}/>
        );
    }

    return( 
        //عرض القاعات
        <View style={styles.view1}>
            <FlatList
                style={styles.flat1}
                data={Owners}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderOwnersInfo}
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

export default AcceptList;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
    },
    flat1:{
        flex: 1,
    },
  });