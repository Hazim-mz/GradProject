import { View, Text, Pressable, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/styles";
import GoToLoginPage from "../common/GoToLoginPage";

function EnterReview({onPress, account}){
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');

    const [emptyRate, setEmptyRate] = useState('#bfba22');//false
    const [emptyComment, setEmptyComment] = useState(false);

    const [goToLoginPageIsVisible, setGoToLoginPageIsVisible] = useState(false);
    function openLoginPage(){
        setGoToLoginPageIsVisible(true);
    }
    function closeLoginPage(){
        setGoToLoginPageIsVisible(false);
    }

    function send(){
        if(! account.isAuthenticated){
            openLoginPage();
        }
        else if(comment == ''){
            alert('Comment field is empty');
            setEmptyComment(true);
            setEmptyRate('#bfba22');//false
        }
        else if(rate == 0){
            alert('Rate field is empty');
            setEmptyRate('red');//true
            setEmptyComment(false);
        }
        else{
            setEmptyComment(false);
            setEmptyRate('#bfba22');//false

            setComment('');
            setRate(0);
            onPress(comment, rate, account.name, account.userID, account.image);
        }
    }
    return(
        <View style={styles.commentContainer}>

            <GoToLoginPage isVisible={goToLoginPageIsVisible} close={closeLoginPage}/>

            <Text style={styles.boldName}>Enter you comment: </Text>

            <TextInput 
                style={emptyComment ? [styles.textIput1,{borderColor: 'red'}] : styles.textIput1} 
                multiline={true} 
                autoCorrect={false}
                onChangeText={newComment => setComment(newComment)}
                defaultValue={comment}
            />

            <View style={styles.ratingContainer2}>
                <View style={styles.ratingContainer2 }>
                    <Pressable
                        onPress={() => {setRate(1); setEmptyRate('#bfba22');}}
                    >
                        <Ionicons style={styles.map} name={rate > 0 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                    </Pressable>
                    <Pressable
                        onPress={() => {setRate(2); setEmptyRate('#bfba22');}}
                    >
                        <Ionicons style={styles.map} name={rate > 1 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                    </Pressable>
                    <Pressable
                        onPress={() => {setRate(3); setEmptyRate('#bfba22');}}
                    >
                        <Ionicons style={styles.map} name={rate > 2 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                    </Pressable>
                    <Pressable
                        onPress={() => {setRate(4); setEmptyRate('#bfba22');}}
                    >
                        <Ionicons style={styles.map} name={rate > 3 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                    </Pressable>
                    <Pressable
                        onPress={() => {setRate(5); setEmptyRate('#bfba22');}}
                    >
                        <Ionicons style={styles.map} name={rate > 4 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                    </Pressable>
                </View>
                <Button title="Send" color='#a73dcc' onPress={send}/>
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
