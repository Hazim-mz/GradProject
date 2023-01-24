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
//import Test from './Test';

import LoginScreen from '../LoginScreen';
import SignupScreen from '../SignupScreen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function UserPage({locationOfUser}) {
    //Login Page 
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
                headerStyle: { backgroundColor: GlobalStyles.colors.primary10 },
                headerTintColor: 'white',
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

    return (
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
                    initialParams={{locationOfUser: locationOfUser}}
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
                {/* <BottomTabs.Screen
                    name="Test"
                    component={Test}
                    initialParams={{locationOfUser: locationOfUser}}
                    options={{
                        title: 'Test',
                        tabBarLabel: 'Test',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="star" size={size} color={color} />
                        ),
                    }}
                /> */}
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
