import React, { useState } from "react";
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from "react-native";

function HallImage({data, onPress, press,style}){
    const [imageActive, setImageActive] = useState(0);

    function onScrollHandler({nativeEvent}){
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== imageActive){
            setImageActive(slide);
        }
    }

    return(
        <View style={styles.Container}>
            <ScrollView
                scrollEventThrottle={16}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScrollHandler}
            >
                {
                    data.map((image, index) => (
                        <Pressable 
                        key={index}
                        style={({pressed}) => (pressed && press ? styles.button : null)}
                        onPress={onPress}
                        >
                            <View style={style}>
                                <Image 
                                    key={index}
                                    source={{uri: image}}
                                    style={styles.image1}
                                />
                            </View>
                        </Pressable>
                    ))
                }
            </ScrollView>
            <View style={styles.textContainer}>
                {
                    data.map((image, index) => (
                        <Text 
                            key={index} 
                            style={index === imageActive ? styles.text2 : styles.text1}
                        >
                            ⬤
                        </Text>
                    ))
                }
            </View>
        </View>
    );
}

export default HallImage;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
    },
    image1:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position:'absolute'
    },
    textContainer:{
        flexDirection: 'row',
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',  
    },
    text1:{
        color: '#888',
        margin: 3,
        fontSize: 8,
    },
    text2:{
        color: '#fff',
        margin: 3,
        fontSize: 8,
    },
    button:{
        opacity: 0.8,
    },
});
