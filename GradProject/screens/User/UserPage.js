import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from 'react';
import * as Location from 'expo-location';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

import { GlobalStyles } from '../../constants/styles';
import Home from './Home';
import HallPage from './HallPage';
import Inbox from './Inbox';
import Bookings from './Bookings';
import Account from './Account';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function HomeOverview() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary10 },
            headerTintColor: 'white',
        }}
        >
        <Stack.Screen
            name="Home"
            component={Home}
        />
        <Stack.Screen
            name="HallPage"
            component={HallPage}
        />

        </Stack.Navigator>
    );
}

function UserPage() {
    
    return (
        <>
        <StatusBar style="auto" />

        <NavigationContainer>
            <BottomTabs.Navigator
                screenOptions={() => ({
                    headerStyle: { backgroundColor: GlobalStyles.colors.primary10 },
                    headerTintColor: 'white',
                    //tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                    tabBarActiveTintColor: GlobalStyles.colors.primary10,
                })}
            >
            <BottomTabs.Screen
                name="HomeOverview"
                component={HomeOverview}
                options={{
                headerShown: false,
                title: 'Home',
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
                }}
            />
            <BottomTabs.Screen
                name="Inbox"
                component={Inbox}
                options={{
                title: 'Inbox',
                tabBarLabel: 'Inbox',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="mail" size={size} color={color} />
                ),
                }}
            />
            <BottomTabs.Screen
                name="Bookings"
                component={Bookings}
                options={{
                title: 'Bookings',
                tabBarLabel: 'Bookings',
                tabBarIcon: ({ color, size }) => (
                    <Foundation name="shopping-bag" size={size} color={color} />
                ),
                }}
            />
            <BottomTabs.Screen
                name="Account"
                component={Account}
                options={{
                title: 'Account',
                tabBarLabel: 'Account',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                ),
                }}
            />
            </BottomTabs.Navigator>
        </NavigationContainer>
        </>
    );
}

export default UserPage;
