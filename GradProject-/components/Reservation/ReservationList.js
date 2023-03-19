import { useState,useCallback, useEffect } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';

import ReservationView from "./ReservationView";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function ReservationList({ Reservation, Users, ownerID, ContactWithUser}){
    //console.log(Reservation, Users);
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);
    
    //كل اكله لها عنصر
    function renderReservationInfo(itemData){
        const item = itemData.item;
        const ReservationInfoProps ={
            id: item.id, //هذا عشان نعرف ايدي قاعة اللي بننتقل لها بعدين
            date: item.data.Date,
            hallsID: item.data.HallsID,
            userID: item.data.UserID,
            price: item.data.Price,
            users: Users,
            ownerID: ownerID,
            ContactWithUser: ContactWithUser,
        };
        return (
            <ReservationView {...ReservationInfoProps}/>
        );
    }

    return( 
        //عرض القاعات
        <View style={styles.view1}>
            <FlatList
                style={styles.flat1}
                data={Reservation}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderReservationInfo}
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

export default ReservationList;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
    },
    flat1:{
        flex: 1,
    },
  });