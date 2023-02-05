import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, Foundation } from '@expo/vector-icons';

import { GlobalStyles } from '../../constants/styles';

import OwnerHome from './OwnerHome';
import OwnerAccount from './OwnerAccount';
import OwnerInbox from './OwnerInbox';
import OwnerReservation from './OwnerReservation';
import Chat from '../User/Chat';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function OwnerPage({locationOfUser}){

    //Inbox page
    function InboxOverview() {
        return (
            <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: GlobalStyles.colors.primary10 },
                headerTintColor: 'white',
            }}
            >
            <Stack.Screen
                name="Inbox"
                component={OwnerInbox}
                initialParams={{locationOfUser: locationOfUser}}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                initialParams={{locationOfUser: locationOfUser}}
            />
    
            </Stack.Navigator>
        );
    }

    return(
        <>
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
                        name="Home"
                        component={OwnerHome}
                        options={{
                            title: 'Home',
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="home" size={size} color={color} />
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
                        name="Reservation"
                        component={OwnerReservation}
                        options={{
                            title: 'Reservation',
                            tabBarLabel: 'Reservation',
                            tabBarIcon: ({ color, size }) => (
                                <Foundation name="shopping-bag" size={size} color={color} />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="Account"
                        component={OwnerAccount}
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

export default OwnerPage;
