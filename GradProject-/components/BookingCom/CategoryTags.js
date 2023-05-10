import { View, Text, Pressable, StyleSheet, Image, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/styles";

import { db } from '../../config';
import { collection, where, query, onSnapshot, getDocs } from 'firebase/firestore';

function CategoryTags({ tags, setTags, onPressTagToScroll, settagActiveByClick }) {

    function onPressTag(tagName) {
        if (tagName == 'New') {
            setTags({
                New: true,
                History: false,
                Canceled: false,
            });
            settagActiveByClick(0);
            onPressTagToScroll.bind(this, 0)();
        }
        else if (tagName == 'History') {
            setTags({
                New: false,
                History: true,
                Canceled: false,
            });
            settagActiveByClick(1);
            onPressTagToScroll.bind(this, 1)();
        }
        else if (tagName == 'Canceled') {
            setTags({
                New: false,
                History: false,
                Canceled: true,
            });
            settagActiveByClick(2);
            onPressTagToScroll.bind(this, 2)();
        }
    }

    return (
        <View style={styles.categorys}>

            <Pressable
                style={({ pressed }) => (pressed ? [styles.category, styles.press] : styles.category)}
                onPress={onPressTag.bind(this, 'New')}
            >
                <View style={tags.New ? [styles.servieceContainerPressed, styles.left] : [styles.servieceContainer, styles.left]}>
                    <Text>New</Text>
                </View>
            </Pressable>

            <Pressable
                style={({ pressed }) => (pressed ? [styles.category, styles.press] : styles.category)}
                onPress={onPressTag.bind(this, 'History')}
            >
                <View style={tags.History ? styles.servieceContainerPressed : styles.servieceContainer}>
                    <Text>History</Text>
                </View>
            </Pressable>
            <Pressable
                style={({ pressed }) => (pressed ? [styles.category, styles.press] : styles.category)}
                onPress={onPressTag.bind(this, 'Canceled')}
            >
                <View style={tags.Canceled ? [styles.servieceContainerPressed, styles.right] : [styles.servieceContainer, styles.right]}>
                    <Text>Canceled</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default CategoryTags;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categorys: {
        height: 35,
        width: '95%',
        borderRadius: 8,
        flexDirection: 'row',
    },
    category: {
        flex: 1,
    },
    servieceContainerPressed: {
        backgroundColor: '#a960c4',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    servieceContainer: {
        backgroundColor: '#ecc5fa',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    right: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    press: {
        opacity: 0.6,
    },
});