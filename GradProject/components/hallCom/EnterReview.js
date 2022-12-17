import { View, Text, Pressable, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/styles";

function EnterReview(){
    const [rate, setRate] = useState(0);

    return(
        <View style={styles.commentContainer}>
            <Text style={styles.boldName}>Enter you comment: </Text>

            <TextInput style={styles.textIput1} multiline={true} autoCorrect={false}/>
            <View style={styles.ratingContainer2}>
                <View style={styles.ratingContainer2}>
                    <Pressable
                        onPress={() => setRate(1)}
                    >
                        <Ionicons style={styles.map} name={rate > 0 ? 'star' : 'star-outline'} size='22' color='#bfba22' />
                    </Pressable>
                    <Pressable
                        onPress={() => setRate(2)}
                    >
                        <Ionicons style={styles.map} name={rate > 1 ? 'star' : 'star-outline'} size='22' color='#bfba22' />
                    </Pressable>
                    <Pressable
                        onPress={() => setRate(3)}
                    >
                        <Ionicons style={styles.map} name={rate > 2 ? 'star' : 'star-outline'} size='22' color='#bfba22' />
                    </Pressable>
                    <Pressable
                        onPress={() => setRate(4)}
                    >
                        <Ionicons style={styles.map} name={rate > 3 ? 'star' : 'star-outline'} size='22' color='#bfba22' />
                    </Pressable>
                    <Pressable
                        onPress={() => setRate(5)}
                    >
                        <Ionicons style={styles.map} name={rate > 4 ? 'star' : 'star-outline'} size='22' color='#bfba22' />
                    </Pressable>
                </View>
                <Button title="Send" color='#a73dcc'/>
            </View>

            
            
        </View>
    );
}

export default EnterReview;

const styles = StyleSheet.create({
    boldName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentContainer:{
        flex: 1,
        backgroundColor: 'white',
        borderRadius:3,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        marginHorizontal: 4,
        paddingTop:8,
        paddingLeft:6,
        minHeight: 180,
    },
    textIput1:{
        color: GlobalStyles.colors.primary700,
        borderWidth: 2,
        borderColor: '#dfa4f5',
        marginTop: 4,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        minHeight: 100,
        maxHeight: 150,
        textAlignVertical: 'top',
    },
    ratingContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingContainer2:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 4,
    },

});