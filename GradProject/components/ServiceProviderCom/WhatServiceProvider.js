import { View, Text, TextInput, Pressable, Keyboard, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import ServiceProviderList from './ServiceProviderList';

function WhatServiceProvider({ tags, setTags, shepherds, photogs }){
    const [ref, setRef] = useState(null);
    const [tagActive, setTagActive] = useState(0);
    const [tagActiveOnClick, setTagActiveOnClick] = useState(0);

    const [dataSourceCords, setDataSourceCords] = useState([]);

    const [fistTime, setFistTime] = useState(0);
    var clickOnTag = 0 ; 
    useEffect(()=>{
        if(fistTime != 0){

            if(tags.Sheep){
                ref.scrollTo({
                    x: dataSourceCords[0],
                    y: 0,
                    animated: true
                });
                setTagActiveOnClick(0);
            }
            else if(tags.Photog){
                ref.scrollTo({
                    x: dataSourceCords[1],
                    y: 0,
                    animated: true
                });
                setTagActiveOnClick(1);
            }
            else if(tags.Resto){
                ref.scrollTo({
                    x: dataSourceCords[2],
                    y: 0,
                    animated: true
                });
                setTagActiveOnClick(2);
            }

        }
        setFistTime(1);

    }, [tags]);


    console.log(tagActiveOnClick, tagActive);
    function onScrollHandler({nativeEvent}){
        // const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        // if(slide !== tagActive && tagActiveOnClick == tagActive){
        //     console.log('if');
        //     if(slide == 0 ){
        //         setTags({
        //             Sheep: true,
        //             Photog: false,
        //             Resto: false,
        //         });
        //     }
        //     else if(slide == 1){
        //         setTags({
        //             Sheep: false,
        //             Photog: true,
        //             Resto: false,
        //         });    
        //     }
        //     else if(slide == 2){
        //         setTags({
        //             Sheep: false,
        //             Photog: false,
        //             Resto: true,
        //         });   
        //     }
        //     setTagActive(slide);

        // }else if(slide !== tagActive && slide == tagActiveOnClick) {
        //     console.log('else');
        //     if(slide == 0 ){
        //         setTags({
        //             Sheep: true,
        //             Photog: false,
        //             Resto: false,
        //         });
        //     }
        //     else if(slide == 1){
        //         setTags({
        //             Sheep: false,
        //             Photog: true,
        //             Resto: false,
        //         });    
        //     }
        //     else if(slide == 2){
        //         setTags({
        //             Sheep: false,
        //             Photog: false,
        //             Resto: true,
        //         });   
        //     }
        //     setTagActive(slide);
        // }

    }

    return(
        <View style={styles.container}>
            <ScrollView
                ref={(ref)=>{
                    setRef(ref);
                }}
                scrollEventThrottle={16}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScrollHandler}
            >
                <View
                    key={0}
                    onLayout={(event)=>{
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[0] = layout.x;
                        setDataSourceCords(dataSourceCords);
                    }}
                >
                    <ServiceProviderList Services={shepherds}/>
                </View>

                <View
                    key={1}
                    onLayout={(event)=>{
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[1] = layout.x;
                        setDataSourceCords(dataSourceCords);
                    }}
                >
                    <ServiceProviderList Services={photogs}/>
                </View>

                <View
                    key={2}
                    onLayout={(event)=>{
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[2] = layout.x;
                        setDataSourceCords(dataSourceCords);
                    }}
                >
                    <ServiceProviderList Services={photogs}/>
                </View>
            </ScrollView>
        </View>
    );
    
}

export default WhatServiceProvider;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
  });
  