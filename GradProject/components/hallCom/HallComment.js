import { ScrollView, View, Text, Image, Pressable,StyleSheet } from "react-native";
import { useState } from "react";
import Star from "../common/Star";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';


function HallComment({reviews }){
    const [reportedCommentIDs, setReportedCommentIDs] = useState([]);
    async function addReportToComment (id, report){
        let reported = true 
        for(var i =0; i<reportedCommentIDs.length; i++){
            if(reportedCommentIDs[i] = id)
                reported = false
        }
        if(reported){
            const docRef = doc(db, "Review", id);

            await updateDoc(docRef, {
                Report: report+1
            });
            reportedCommentIDs.push(id);
        }
    }

    return(
        <View style={styles.bigContainer}>
            <Text style={styles.boldName}>Comments: </Text>
            <ScrollView
                style={{flex: 1, maxHeight: 500, minHeight: 300}}
                showsHorizontalScrollIndicator={false}
            >
                {
                    reviews.map((review, index) => (
                        <View style={styles.container} key={review.id}>
                            <View style={styles.bigImageContainer}>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image1} source={require('../../assets/images/user.jpg')} resizeMode='cover'/>
                                </View>
                            </View>
                            <View style={styles.commentContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.boldName}>{review.data.UserID}</Text>
                                    <Star size={12} rate={review.data.Rate} style={{marginTop: 2}}/>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.normalName}>{review.data.Comment}</Text>
                                    <View style={styles.reportContainer}>
                                        <Pressable
                                            style={({pressed}) => pressed ? styles.pressable1 : null }
                                            onPress={addReportToComment.bind(this, review.id, review.data.Report)}
                                        >
                                            <Text style={styles.reportText}>Report</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
}

export default HallComment;

const styles = StyleSheet.create({
    bigContainer:{
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 4,
        paddingTop: 4,
        paddingLeft: 6,
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3,
    },
    container:{
        marginTop: 12,
        flex: 1,
        flexDirection: 'row',
        minHeight: 100,
    },
    bigImageContainer:{
        flex: 1,
        paddingLeft: 2,
        overflow: 'hidden',
        maxHeight: 50
    },
    imageContainer:{
        flex: 1,
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 0.7,
    },
    image1:{
        width: '100%',
        height: '100%',
    },
    commentContainer:{
        flex: 6,
        marginTop: 4,
    },
    nameContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    boldName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    normalName:{
        fontSize: 12,
    },
    textContainer:{
        flex: 4,
        paddingLeft: 6,
    },
    reportContainer:{
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        marginRight: 250,
        marginTop: 20,
    },
    pressable1:{
        opacity: 0.6
    },
    reportText:{
        fontSize: 13,
        fontWeight: 'bold',
        color: 'red'
    },
});
