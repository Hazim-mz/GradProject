import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

function HallComment({data}){
    return(
        <View style={styles.bigContainer}>
            <ScrollView
                style={{flex: 1, maxHeight: 500}}
                showsHorizontalScrollIndicator={false}
            >
                {
                    data.map((comment, index) => (
                        <View style={styles.container} key={comment.commentID}>
                            <View style={styles.bigImageContainer}>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image1} source={require('../../assets/images/user.jpg')} resizeMode='cover'/>
                                </View>
                            </View>
                            <View style={styles.commentContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.boldName}>{comment.UserName}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.normalName}>{comment.text}</Text>
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
    },
    boldName:{
        fontSize: 14,
        fontWeight: 'bold',
    },
    normalName:{
        fontSize: 12,
    },
    textContainer:{
        flex: 4,
        paddingLeft: 6,
    },
});