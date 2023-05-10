import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useEffect, useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, Foundation, MaterialIcons } from '@expo/vector-icons';

import { GlobalStyles } from '../../constants/styles';

import Home from './Home';
import HallPage from './HallPage';
import ServicesProvider from './ServicesProvider';
import ServiceProviderPage from './ServiceProviderPage';
import Bookings from './Bookings';
import BillPage from './BillPage';
import Inbox from './Inbox';
import Chat from './Chat';
import Account from './Account';

import LoginScreen from '../LoginScreen';
import SignupScreen from '../SignupScreen';

import { AuthContext } from '../../store/auth-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function UserPage({ locationOfUser }) {
    const userAccountCtx = useContext(AuthContext);

    //hiding Login Page 
    function LoginOverview() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: GlobalStyles.colors.primary10 },
                    headerTintColor: 'white',
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                />

            </Stack.Navigator>
        );
    }

    //Home Page 
    function HomeOverview() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: 'white' },
                    headerTintColor: GlobalStyles.colors.primary10,
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    initialParams={{ locationOfUser: locationOfUser }}
                />
                <Stack.Screen
                    name="HallPage"
                    component={HallPage}
                    initialParams={{ locationOfUser: locationOfUser }}
                />

            </Stack.Navigator>
        );
    }

    //Service page
    function ServicesOverview() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: 'white' },
                    headerTintColor: GlobalStyles.colors.primary10,
                }}
            >
                <Stack.Screen
                    name="Services"
                    component={ServicesProvider}
                    initialParams={{ locationOfUser: locationOfUser }}
                />
                <Stack.Screen
                    name="ServicePage"
                    component={ServiceProviderPage}
                    initialParams={{ locationOfUser: locationOfUser }}
                />

            </Stack.Navigator>
        );
    }

    //Booking page
    function BookingOverview() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: 'white' },
                    headerTintColor: GlobalStyles.colors.primary10,
                }}
            >
                <Stack.Screen
                    name="Bookings"
                    component={Bookings}
                    initialParams={{ locationOfUser: locationOfUser }}
                />
                <Stack.Screen
                    name="BillPage"
                    component={BillPage}
                    initialParams={{ locationOfUser: locationOfUser }}
                />

            </Stack.Navigator>
        );
    }

    //Inbox page
    function InboxOverview() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: 'white' },
                    headerTintColor: GlobalStyles.colors.primary10,
                }}
            >
                <Stack.Screen
                    name="Inbox"
                    component={Inbox}
                    initialParams={{ locationOfUser: locationOfUser }}
                />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                />

            </Stack.Navigator>
        );
    }

    return (
        <>
            <NavigationContainer>
                <BottomTabs.Navigator
                    screenOptions={() => ({
                        headerStyle: { backgroundColor: 'white' },
                        headerTintColor: GlobalStyles.colors.primary10,
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
                        name="ServiceOverview"
                        component={ServicesOverview}
                        options={{
                            headerShown: false,
                            title: 'Services',
                            tabBarLabel: 'Services',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons name="home-repair-service" size={size + 3} color={color} />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="BookingOverview"
                        component={BookingOverview}
                        options={{
                            headerShown: false,
                            title: 'Booking',
                            tabBarLabel: 'Booking',
                            tabBarIcon: ({ color, size }) => (
                                <Foundation name="shopping-bag" size={size} color={color} />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="InboxOverview"
                        component={InboxOverview}
                        options={{
                            headerShown: false,
                            title: 'Inbox',
                            tabBarLabel: 'Inbox',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="mail" size={size} color={color} />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="Account"
                        component={Account}
                        initialParams={{ locationOfUser: locationOfUser }}
                        options={{
                            title: 'Account',
                            tabBarLabel: 'Account',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person" size={size} color={color} />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="LoginOverview"
                        component={LoginOverview}
                        options={{
                            tabBarStyle: {
                                display: "none",
                            },
                            tabBarButton: () => null,
                            headerShown: false,
                            title: 'Login',
                            tabBarLabel: 'Login',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="home" size={size} color={color} />
                            ),
                        }}
                    />
                </BottomTabs.Navigator>

            </NavigationContainer>
        </>
    );
}

export default UserPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hallBookedContainer: {
        position: 'absolute',
        right: 0,
        bottom: 48,
        left: 0,
        backgroundColor: 'rgba(203, 39, 239, 0.8)',
        height: 55
    },
});