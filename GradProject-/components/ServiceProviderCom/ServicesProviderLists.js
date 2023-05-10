import { View, Text, TextInput, Pressable, Keyboard, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import ServiceProviderList from './ServiceProviderList';

function ServicesProviderLists({ tags, setTags, tagActive, tagActiveByClick, setTagActive, settagActiveByClick, shepherds, photogs }) {

    function onScrollHandler({ nativeEvent }) {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== tagActive && tagActiveByClick == tagActive) {
            if (slide == 0) {
                setTags({
                    Sheep: true,
                    Photog: false,
                    Resto: false,
                    Test: false,
                });
            }
            else if (slide == 1) {
                setTags({
                    Sheep: false,
                    Photog: true,
                    Resto: false,
                    Test: false,
                });
            }
            else if (slide == 2) {
                setTags({
                    Sheep: false,
                    Photog: false,
                    Resto: true,
                    Test: false,
                });
            }
            else if (slide == 3) {
                setTags({
                    Sheep: false,
                    Photog: false,
                    Resto: false,
                    Test: true,
                });
            }
            setTagActive(slide);
            settagActiveByClick(slide);
        } else if (slide !== tagActive && slide == tagActiveByClick) {
            if (slide == 0) {
                setTags({
                    Sheep: true,
                    Photog: false,
                    Resto: false,
                    Test: false,
                });
            }
            else if (slide == 1) {
                setTags({
                    Sheep: false,
                    Photog: true,
                    Resto: false,
                    Test: false,
                });
            }
            else if (slide == 2) {
                setTags({
                    Sheep: false,
                    Photog: false,
                    Resto: true,
                    Test: false,
                });
            }
            else if (slide == 3) {
                setTags({
                    Sheep: false,
                    Photog: false,
                    Resto: false,
                    Test: true,
                });
            }
            setTagActive(slide);
            settagActiveByClick(slide);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                ref={re => scroll = re}
                scrollEventThrottle={16}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScrollHandler}
            >
                <View>
                    <ServiceProviderList Services={shepherds} ServiceNumber={1}/>
                </View>

                <View>
                    <ServiceProviderList Services={photogs} ServiceNumber={2}/>
                </View>

                <View>
                    <ServiceProviderList Services={shepherds} ServiceNumber={3}/>
                </View>

                <View>
                    <ServiceProviderList Services={photogs} ServiceNumber={4}/>
                </View>
            </ScrollView>
        </View>
    );

}

export default ServicesProviderLists;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
