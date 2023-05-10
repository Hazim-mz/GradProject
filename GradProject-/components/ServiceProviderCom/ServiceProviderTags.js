import { View, Text, TextInput, Pressable, Keyboard, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useLayoutEffect, useState, useContext } from 'react';

import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons'; 

function ServiceProviderTags({tags, setTags, onPressTagToScroll, settagActiveByClick}){

    function onPressTag(tagName){
        if(tagName == 'Sheep'){
            setTags({
                Sheep: true,
                Photog: false,
                Resto: false,
                Test: false,
            });
            settagActiveByClick(0);
            onPressTagToScroll.bind(this, 0)();  
        }
        else if(tagName == 'Photog'){
            setTags({
                Sheep: false,
                Photog: true,
                Resto: false,
                Test: false,
            });    
            settagActiveByClick(1);
            onPressTagToScroll.bind(this, 1)();  
        }
        else if(tagName == 'Resto'){
            setTags({
                Sheep: false,
                Photog: false,
                Resto: true,
                Test: false,
            });  
            settagActiveByClick(2);
            onPressTagToScroll.bind(this, 2)();  
        }
        else if(tagName == 'Test'){
            setTags({
                Sheep: false,
                Photog: false,
                Resto: false,
                Test: true,
            });  
            settagActiveByClick(3);
            onPressTagToScroll.bind(this, 3)();  
        }
    }
    return(
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.serviecesContainer}
        >
            <Pressable 
                style={({pressed}) => (pressed ? styles.button : null)}
                onPress={onPressTag.bind(this, 'Sheep')}
            >
                <View style={tags.Sheep ? styles.servieceContainerPressed : styles.servieceContainer}>
                    <MaterialCommunityIcons name="sheep" size={24} color="black" />
                    <Text>Sheep</Text>
                </View>
            </Pressable>

            <Pressable 
                style={({pressed}) => (pressed ? styles.button : null)}
                onPress={onPressTag.bind(this, 'Photog')}
            >
                <View style={tags.Photog ? styles.servieceContainerPressed : styles.servieceContainer}>
                    <FontAwesome name="camera-retro" size={18} color="black" />
                    <Text style={{marginLeft: 2}}>Photog</Text>
                </View>
            </Pressable>

            <Pressable 
                style={({pressed}) => (pressed ? styles.button : null)}
                onPress={onPressTag.bind(this, 'Resto')}
            >
                <View style={tags.Resto ? styles.servieceContainerPressed : styles.servieceContainer}>
                    <Ionicons name="restaurant" size={20} color="black" />
                    <Text style={{marginLeft: 2}}>Restaurant</Text>
                </View>
            </Pressable>

            <Pressable 
                style={({pressed}) => (pressed ? styles.button : null)}
                onPress={onPressTag.bind(this, 'Test')}
            >
                <View style={tags.Test ? styles.servieceContainerPressed : styles.servieceContainer}>
                    <Ionicons name="restaurant" size={20} color="black" />
                    <Text style={{marginLeft: 2}}>Restaurant</Text>
                </View>
            </Pressable>
        </ScrollView>

    );
}

export default ServiceProviderTags;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    serviecesContainer: {
        flex: 1,
        marginHorizontal: 2,
    },
    servieceContainerPressed: {
        height: 32,
        width: 110,
        borderWidth: 0.8,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a960c4',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    servieceContainer: {
        height: 32,
        width: 110,
        borderWidth: 0.8,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecc5fa',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    button:{
        opacity: 0.6,
    },
});
  