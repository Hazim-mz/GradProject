import { useState,useCallback, useEffect } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';

import AdminHallView from "./AdminHallView";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function AdminHallList({Halls ,LocationOfUser, booking, deleateReservations, navigation}){
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
            name: item.data.Name,
            description: item.data.Description,
            price: item.data.Price,
            guests: item.data.Guests,
            imageUrl: item.data.imageUrl,
            services: item.data.Services,
            menCoun: item.data.MenCouncil,
            womanCoun: item.data.WomanCouncil,
            menDin: item.data.MenDining,
            womanDin: item.data.WomanDining,
            menBath: item.data.MenBathroom,
            womanBath: item.data.WomanBathroom,
            locationOfHall: item.data.Location,
            locationOfUser: LocationOfUser,
            report: item.data.Report,
            rate: item.data.Rate,
            isBlocked: item.data.isBlocked,
            //Owner infromation ->
            ownerID: item.data.OwnerID,
            ownerEmail: item.data.OwnerEmail,
            ownerNotifAddr: item.data.OwnerNotifAddr,
            //for booking page ->
            cancelAvailable: item.cancelAvailable,
            date: item.Date,
            booking: booking,
            deleateReservations: deleateReservations
        };
        return (
            <AdminHallView {...hallInfoProps}/>
        );
    }

    return( 
        //عرض القاعات
        <View style={styles.view1}>
            <FlatList
                style={styles.flat1}
                data={Halls}
                keyExtractor={(item, index) => index.toString()}
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

export default AdminHallList;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
    },
    flat1:{
        flex: 1,
    },
  });