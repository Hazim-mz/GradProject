import React, { Fragment, useState, useRef } from 'react';
import { AppRegistry, Dimensions, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Alert, FlatList } from 'react-native';

import { auth, db, storage } from './config';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

// const PaymentRequest = require('react-native-payments').PaymentRequest;

// const METHOD_DATA = [{
//     supportedMethods: ['apple-pay'],
//     data: {
//         merchantIdentifier: 'merchant.apple.test',
//         supportedNetworks: ['visa', 'mastercard', 'amex'],
//         countryCode: 'US',
//         currencyCode: 'USD'
//     }
// }];

// const DETAILS = {
//     id: 'basic-example',
//     displayItems: [
//         {
//             label: 'Movie Ticket',
//             amount: { currency: 'USD', value: '15.00' }
//         },
//         {
//             label: 'Grocery',
//             amount: { currency: 'USD', value: '5.00' }
//         }
//     ],
//     shippingOptions: [{
//         id: 'economy',
//         label: 'Economy Shipping',
//         amount: { currency: 'USD', value: '0.00' },
//         detail: 'Arrives in 3-5 days' // `detail` is specific to React Native Payments
//     }],
//     total: {
//         label: 'Enappd Store',
//         amount: { currency: 'USD', value: '20.00' }
//     }
// };
// const OPTIONS = {
//     requestPayerName: true,
//     requestPayerPhone: true,
//     requestPayerEmail: true,
//     requestShipping: true
// };
// const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

// paymentRequest.addEventListener('shippingaddresschange', e => {
//     const updatedDetails = getUpdatedDetailsForShippingAddress(paymentRequest.shippingAddress);

//     e.updateWith(updatedDetails);
// });

// paymentRequest.addEventListener('shippingoptionchange', e => {
//     const updatedDetails = getUpdatedDetailsForShippingOption(paymentRequest.shippingOption);

//     e.updateWith(updatedDetails);
// });

// check = () => {
//     paymentRequest.canMakePayments().then((canMakePayment) => {
//         if (canMakePayment) {
//             Alert.alert(
//                 'Apple Pay',
//                 'Apple Pay is available in this device'
//             );
//         }
//     })
// }

// pay = () => {
//     paymentRequest.canMakePayments().then((canMakePayment) => {
//         if (canMakePayment) {
//             console.log('Can Make Payment')
//             paymentRequest.show()
//                 .then(paymentResponse => {
//                     // Your payment processing code goes here

//                     paymentResponse.complete('success');
//                 });
//         }
//         else {
//             console.log('Cant Make Payment')
//         }
//     })
// }


var screenWidth = Dimensions.get('window').width;

const Test = () => {

    onPresss = (index) => {
        scroll.scrollTo({ x: index * screenWidth, y: 0, animated: true })
    }

    return (
        <View style={styles.MainContainer}>
            <View style={styles.ButtonContainer}>
                <Button title="Screen 1" onPress={() => onPresss(0) } />
            </View>
            <View style={styles.ButtonContainer}>
                <Button title="Screen 2" onPress={() => onPresss(1) } />
            </View>
            <View style={styles.ButtonContainer}>
                <Button title="Screen 3" onPress={() => onPresss(2) } />
            </View>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                ref={re => scroll = re}
            >
                <View style={styles.ScrollContainer}>
                    <Text style={styles.ScrollTextContainer}>
                        Screen 1
                    </Text>
                </View>
                <View style={styles.ScrollContainer}>
                    <Text style={styles.ScrollTextContainer}>
                        Screen 2
                    </Text>
                </View>
                <View style={styles.ScrollContainer}>
                    <Text style={styles.ScrollTextContainer}>
                        Screen 3
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
    // return (
    //     <Fragment>
    //         <StatusBar barStyle="dark-content" />
    //         <SafeAreaView>
    //             <ScrollView
    //                 contentInsetAdjustmentBehavior="automatic"
    //                 style={styles.scrollView}>
    //                 {global.HermesInternal == null ? null : (
    //                     <View style={styles.engine}>
    //                         <Text style={styles.footer}>Engine: Hermes</Text>
    //                     </View>
    //                 )}
    //                 <View style={styles.body}>
    //                     <View style={styles.sectionContainer}>
    //                         <Text style={styles.sectionTitle}>Check</Text>
    //                         <Text style={styles.sectionDescription}>
    //                             Ideally, you should check if Apple Pay is enable in background, and then accordingly call the payment method.
    //                             Showing here on button action for demo purpose.
    //                         </Text>
    //                         <Button
    //                             onPress={() => this.check()}
    //                             title="Check Apple Pay" />
    //                     </View>
    //                 </View>
    //                 <View style={styles.body}>
    //                     <View style={styles.sectionContainer}>
    //                         <View>
    //                             <Text style={styles.sectionTitle}>Cart</Text>
    //                             <Text style={styles.sectionDescription}>
    //                                 Simulating your cart items in an app
    //                             </Text>
    //                         </View>
    //                     </View>
    //                     <View style={styles.itemContainer}>
    //                         <View style={styles.itemDetail}>
    //                             <Text style={styles.itemTitle}>Movie Ticket</Text>
    //                             <Text style={styles.itemDescription}>
    //                                 Some description
    //                             </Text>
    //                         </View>
    //                         <View style={styles.itemPrice}>
    //                             <Text>USD 15.00</Text>
    //                         </View>
    //                     </View>
    //                     <View style={styles.itemContainer}>
    //                         <View style={styles.itemDetail}>
    //                             <Text style={styles.itemTitle}>Grocery</Text>
    //                             <Text style={styles.itemDescription}>
    //                                 Some description
    //                             </Text>
    //                         </View>
    //                         <View style={styles.itemPrice}>
    //                             <Text>USD 5.00</Text>
    //                         </View>
    //                     </View>
    //                     <View style={styles.totalContainer}>
    //                         <View style={styles.itemDetail}>
    //                             <Text style={styles.itemTitle}>Total</Text>
    //                         </View>
    //                         <View style={styles.itemPrice}>
    //                             <Text>USD 20.00</Text>
    //                         </View>
    //                     </View>
    //                     <Button style={styles.payButton}
    //                         title="Pay with Apple Pay"
    //                         onPress={() => this.pay()} />
    //                     {/* <ApplePayButton /> */}
    //                 </View>
    //             </ScrollView>
    //         </SafeAreaView>
    //     </Fragment>
    // );
};

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#abe3a8',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    ScrollContainer: {
        backgroundColor: '#cdf1ec',
        flexGrow: 1,
        marginTop: 0,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ScrollTextContainer: {
        fontSize: 20,
        padding: 15,
        color: '#000',
        textAlign: 'center'
    },
    ButtonViewContainer: {
        flexDirection: 'row',
        paddingTop: 35,
    },
    ButtonContainer: {
        padding: 30,
    },
    textContainer: {
        flex: 1,
        height: 20,
        width: 20,
        borderRadius: 10,
        margin: 5,
    },
    text: {
    },
    scrollView: {
        backgroundColor: 'red'
    },
    engine: {
        position: 'absolute',
        right: 0
    },
    body: {
        backgroundColor: 'white',
        borderBottomColor: "#cccccc",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    itemContainer: {
        marginTop: 12,
        paddingHorizontal: 24,
        display: "flex",
        flexDirection: 'row'
    },
    totalContainer: {
        marginTop: 12,
        paddingHorizontal: 24,
        display: "flex",
        flexDirection: 'row',
        borderTopColor: "#cccccc",
        borderTopWidth: 1,
        paddingTop: 10,
        marginBottom: 20
    },
    itemDetail: {
        flex: 2
    },
    itemTitle: {
        fontWeight: '500',
        fontSize: 18
    },
    itemDescription: {
        fontSize: 12
    },
    itemPrice: {
        flex: 1
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '400',
        color: 'blue',
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: 'blue',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default Test;