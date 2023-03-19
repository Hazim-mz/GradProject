import { useState,useCallback, useEffect } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';

import ServiceProviderView from "./ServiceProviderView";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function ServiceProviderList({Services}){
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);

    //كل اكله لها عنصر
    function renderServicenfo(itemData){

        const item = itemData.item;
        const serviceInfoProps ={
            id: item.id, //هذا عشان نعرف ايدي قاعة اللي بننتقل لها بعدين
            name: item.data.Name,
            photogEmail: item.data.PhotogEmail,
            photogID: item.data.PhotogID,
            price: item.data.Price,
            rate: item.data.Rate,
            imageUrl: item.data.imageUrl,
        };
        return (
            <ServiceProviderView {...serviceInfoProps}/>
        );
    }

    return( 
        //عرض القاعات
        <View style={styles.view1}>
            <FlatList
                style={styles.flat1}
                data={Services}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderServicenfo}
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

export default ServiceProviderList;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
    },
    flat1:{
        flex: 1,
    },
  });