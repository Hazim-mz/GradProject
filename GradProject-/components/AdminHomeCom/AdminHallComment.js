import { ScrollView, View, Text, Image, Pressable, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";

import Star from "../Common/Star";
import { Colors } from "../../constants/styles";

import { db } from '../../config';
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

function AdminHallComment({ reviews, replays}) {

    const [reportedCommentIDs, setReportedCommentIDs] = useState([]);

    async function addReportToComment(id, report) {
        let reported = true
        for (var i = 0; i < reportedCommentIDs.length; i++) {
            if (reportedCommentIDs[i] = id)
                reported = false
        }
        if (reported) {
            const docRef = doc(db, "Review", id);

            await updateDoc(docRef, {
                Report: report + 1
            });
            reportedCommentIDs.push(id);
        }
    }
    async function DeleteUserComment(id) {
        await deleteDoc(doc(db, "Review", id));
    }
    async function DeleteOwnerComment(id) {
        await deleteDoc(doc(db, "ReplayToReview", id));
    }
    function getReplay(UserID){
        var tempReplay = replays.filter(item => item.data.ReplayTo === UserID);

        if(tempReplay != 0 ){
            return tempReplay;
        }
        else{
            return tempReplay;
        }
    }
    var TempReplay = [] ;


    return (
        <View style={styles.bigContainer}>
            <Text style={styles.boldName}>Comments: </Text>
            <ScrollView
                style={{ flex: 1, maxHeight: 500, minHeight: 300}}
                showsVerticalScrollIndicator={false}
            >
                {
                    reviews.map((review, index) => (
                        <View key={review.id}>
                            <View style={styles.container}>
                                <View style={styles.bigImageContainer}>
                                    <View style={styles.imageContainer}>
                                        <Image style={styles.image1} source={{ uri: review.data.UserImage }} resizeMode='cover' />
                                    </View>
                                </View>
                                <View style={styles.commentContainer}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.boldName2}>{review.data.UserName}</Text>
                                        </View>
                                        <View>
                                            <Star size={12} rate={review.data.Rate} style={{ marginTop: 2, marginRight: 6 }} />
                                        </View>
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.normalName}>{review.data.Comment}</Text>
                                        <View style={styles.reportContainer}>
                                            <Pressable
                                                style={({ pressed }) => pressed ? styles.pressable1 : null}
                                                onPress={DeleteUserComment.bind(this, review.id)}
                                            >
                                                <Text style={styles.reportText}>Delete</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View>
                            </View>
                            {
                                (TempReplay = getReplay(review.data.UserID)).length != 0 ?
                                    <View style={styles.container1} >
                                        <View style={styles.bigImageContainer}>
                                            <View style={styles.imageContainer}>
                                                <Image style={styles.image1} source={{ uri: TempReplay[0].data.UserImage }} resizeMode='cover' />
                                            </View>
                                        </View>
                                        <View style={styles.commentContainer}>
                                            <View style={styles.nameContainer}>
                                                <Text style={styles.boldName2}>{TempReplay[0].data.UserName}</Text>
                                                <Text style={styles.normalName}>(owner)</Text>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text style={styles.normalName}>{TempReplay[0].data.Comment}</Text>
                                                <View style={styles.reportContainer}>
                                                    <Pressable
                                                        style={({ pressed }) => pressed ? styles.pressable1 : null}
                                                        onPress={DeleteOwnerComment.bind(this, TempReplay[0].id)}
                                                    >
                                                        <Text style={styles.reportText}>Delete</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                :
                                    <View></View>
                            }
                            
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
}

export default AdminHallComment;

const styles = StyleSheet.create({
    bigContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 4,
        paddingTop: 4,
        paddingLeft: 6,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,

    },
    container: {
        backgroundColor: Colors.light,
        marginTop: 12,
        flex: 1,
        flexDirection: 'row',
        minHeight: 100,
        marginRight: 2,
        padding: 8,
        borderRadius: 20,
        shadowOffset: { width: 5, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    container1: {
        backgroundColor: Colors.light,
        marginRight: 2,
        marginTop: 12,
        marginLeft: 40,
        flex: 1,
        flexDirection: 'row',
        minHeight: 100,
        padding: 8,
        borderRadius: 20,
        shadowOffset: { width: 5, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    bigImageContainer: {
        flex: 1.2,
        overflow: 'hidden',
        maxHeight: 50,
        maxWidth: 80,
        marginRight: 2,

    },
    imageContainer: {
        flex: 1,
        width: 50,
        height: 50,
        marginRight: 5,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 0.8,
    },
    image1: {
        width: '100%',
        height: '100%',
    },
    commentContainer:{
        flex: 6,
        marginTop: 4,
        marginLeft: 0,

    },
    nameContainer:{
        flex: 1,
        marginLeft: 4,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    rateContainer:{
    },
    boldName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldName2:{
        fontSize: 12,
        fontWeight: 'bold',
    },
    normalName:{
        fontSize: 12,
    },
    textContainer:{
        flex: 4,
        marginLeft: 1,
        paddingLeft: 4,
    },
    inputBigContainer: {
        flex: 1,
        marginTop: 15,
        marginLeft: 10,
        minHeight: 70,
        paddingLeft: 4,
    },
    reportContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        marginLeft: 8,
        marginTop: 36,
    },
    pressable1: {
        opacity: 0.6
    },
    reportText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'red'
    },
    inputContainer: {
        minHeight: 40,
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: Colors.light,
        padding: 8,
        flex: 1,
        shadowOffset: { width: 5, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    replayText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.blue
    },
    buttonResend: {

    }
});


