import { View, Text, Pressable, StyleSheet, Image, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect} from 'react';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { GlobalStyles } from "../../constants/styles";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, getDocs} from 'firebase/firestore';

function MessageView({id, ownerID, start, userID, newOwnerMes, newUserMes, timeOfLastMes, lastMes, userEmail, userImage, userRule, Users}){
    const navigation = useNavigation(); //لانه مب صفحة

    let receiver ;
    let numberOfMes ;
    if(userRule < 1){
        receiver = Users.filter(item => item.id === ownerID);
        numberOfMes = newOwnerMes;
    }else{
        receiver = Users.filter(item => item.id === userID);
        numberOfMes = newUserMes;
    }
    
    function selectChatHandler(){
        if(userRule < 1){
            navigation.navigate('Chat', {
                chatId: id,
                chatReceiverInfo: receiver,
                chatStart: start,
                chatUserID: userID,
                chatUserEmail: userEmail,
                chatUserImage: userImage,
                chatUserRule: userRule,
            });
        }else{
            navigation.navigate('Chat', {
                chatId: id,
                chatReceiverInfo: receiver,
                chatStart: start,
                chatUserID: ownerID,
                chatUserEmail: userEmail,
                chatUserImage: userImage,
                chatUserRule: userRule,
            });
        }

    }
    //get time diffrent 
    if(timeOfLastMes != undefined){
        let dayOfLastMes = timeOfLastMes.toDate().getTime();
        const today = new Date().getTime();
    
        let timeDiffrent = (today-dayOfLastMes) / 1000;
      
        var dayDiff = Math.floor(timeDiffrent / (3600*24));
        var hoursDiff = Math.floor(timeDiffrent % (3600*24) / 3600);
        var minutesDiff = Math.floor(timeDiffrent % 3600 / 60);
        var secondsDiff = Math.floor(timeDiffrent % 60);
    
        var time ;
        var timeText ;
        if(dayDiff != 0){
            time = dayDiff;
            timeText = 'Day ago';
        }else if(hoursDiff != 0){
            time = hoursDiff;
            timeText = 'Hrs ago';
        }else if(minutesDiff != 0){
            time = minutesDiff;
            timeText = 'Min ago';
        }else{
            time = secondsDiff;
            timeText = 'Sec ago';
        }
    }


    return(
        <View style={styles.Container}>
            {
                start ?
                receiver.length != 0 ?
                        <Pressable 
                            style={({pressed}) => (pressed ? [styles.PressablePress, styles.Pressable] : styles.Pressable)}
                            onPress={selectChatHandler}
                        >
                            <View style={styles.MessageContainer}>

                                <View style={styles.ImageContainer}>
                                    <View style={styles.ImageShape}>
                                        <Image style={styles.Image} source={{uri: receiver[0].data.imageUrl}}/>
                                    </View>
                                </View>

                                <View style={styles.ContentContainer}>
                                    <View style={styles.NameContainer}>
                                        <Text style={styles.Name}>{receiver[0].data.Name}</Text>
                                    </View>
                                    <View style={styles.MessageContentContainer}>
                                        <Text style={styles.Message}>{lastMes}</Text>
                                    </View>
                                </View>

                                <View style={styles.InformationContainer}>
                                    <View style={styles.TimeContainer}>
                                        <Text style={styles.Time}>{time} {timeText}</Text>
                                    </View>
                                    <View style={styles.NumberOfMessageContainer}>
                                        <View style={styles.CircleShape}>
                                            <Text style={styles.NumberOfMessage}>{numberOfMes}</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </Pressable>
                    :
                        <View></View>
                :
                    <View></View>
            }
        </View>
    );
}

export default MessageView;

const styles = StyleSheet.create({
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
        marginTop: 15,
        marginRight: 5
    },
    TimeContainer:{
        flex: 1,
        width: 80,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
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