import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, Foundation, MaterialIcons } from '@expo/vector-icons';

import { GlobalStyles } from '../../constants/styles';

import Home from './Home';
import HallPage from './HallPage';
import Inbox from './Inbox';
import Bookings from './Bookings';
import Account from './Account';
import ServiceProvider from './ServiceProvider';
import Chat from './Chat';

import LoginScreen from '../LoginScreen';
import SignupScreen from '../SignupScreen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function UserPage({locationOfUser}) {

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
                headerStyle: { backgroundColor:  'white'},
                headerTintColor: GlobalStyles.colors.primary10,
            }}
            >
            <Stack.Screen
                name="Home"
                component={Home}
                initialParams={{locationOfUser: locationOfUser}}
            />
            <Stack.Screen
                name="HallPage"
                component={HallPage}
                initialParams={{locationOfUser: locationOfUser}}
            />
    
            </Stack.Navigator>
        );
    }

    //Inbox page
    function InboxOverview() {
        return (
            <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'white'},
                headerTintColor: GlobalStyles.colors.primary10,
            }}
            >
            <Stack.Screen
                name="Inbox"
                component={Inbox}
                initialParams={{locationOfUser: locationOfUser}}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
            />
    
            </Stack.Navigator>
        );
    }

    //Service page
    function ServicesOverview() {
        return (
            <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor:  'white'},
                headerTintColor: GlobalStyles.colors.primary10,
            }}
            >
            <Stack.Screen
                name="Services"
                component={ServiceProvider}
                initialParams={{locationOfUser: locationOfUser}}
            />
            <Stack.Screen
                name="HallPage"
                component={HallPage}
                initialParams={{locationOfUser: locationOfUser}}
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
                            <MaterialIcons name="home-repair-service" size={size+3} color={color} />
                        ),
                    }}
                />
                <BottomTabs.Screen
                    name="Bookings"
                    component={Bookings}
                    initialParams={{locationOfUser: locationOfUser}}
                    options={{
                        title: 'Bookings',
                        tabBarLabel: 'Bookings',
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
                    initialParams={{locationOfUser: locationOfUser}}
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
