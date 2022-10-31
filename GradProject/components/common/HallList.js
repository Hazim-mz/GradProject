import { useState,useCallback } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';

import HallView from "./HallView";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function HallList({Halls, navigation}){
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);
    
    //كل اكله لها عنصر
    function renderHallInfo(itemData){
        const item = itemData.item;
        const hallInfoProps ={
            id: item.id, //هذا عشان نعرف ايدي قاعة اللي بننتقل لها بعدين
            name: item.name,
            price: item.price,
            guests: item.guests,
            imageUrl: item.imageUrl
        };
        return (
            <HallView {...hallInfoProps}/>
        );
    }

    return( 
        //عرض القاعات
        <View style={styles.view1}>
            <FlatList
                style={styles.flat1}
                data={Halls}
                keyExtractor={(item) => item.id}
                renderItem={renderHallInfo}
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

export default HallList;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
    },
    flat1:{
        flex: 1,
    },
  });
