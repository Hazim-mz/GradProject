import { View, Text, TextInput, Pressable, Keyboard, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import ServiceProviderList from './ServiceProviderList';

function WhatServiceProvider({ tags, shepherds, photogs }){

    if(tags.Sheep){
        return(
            <View style={styles.container}>
                <ServiceProviderList Services={shepherds}/>
            </View>
        );
    }
    else if(tags.Photog){
        return(
            <View style={styles.container}>
                <ServiceProviderList Services={photogs}/>
            </View>
        );
    }
    else if(tags.Resto){
        return(
            <View style={styles.container}>
            </View>
        );
    }
    
}

export default WhatServiceProvider;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
  });
  