import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons';

import { GlobalStyles } from '../../constants/styles';

import AdminHome from './AdminHome';
import AdminHallPage from './AdminHallPage';
import AdminAccept from './AdminAccept';
import AdminAccount from './AdminAccount';
import AdminComment from './AdminComment';
import AdminInbox from './AdminInbox';
import Chat from '../User/Chat';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AdminPage({locationOfUser}){
    
    //Home page
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
                component={AdminHome}
                initialParams={{locationOfUser: locationOfUser}}
            />
            <Stack.Screen
                name="HallPage"
                component={AdminHallPage}
                initialParams={{locationOfUser: locationOfUser}}
                options={{
                    title: 'HallPage',
                }}
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
                component={AdminInbox}
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
                        name="Owners"
                        component={AdminAccept}
                        options={{
                            title: 'Owners',
                            tabBarLabel: 'Owners',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome5 name="newspaper" size={size} color={color} />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="Comment"
                        component={AdminComment}
                        options={{
                            title: 'Comment',
                            tabBarLabel: 'Comment',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="comment-remove" size={size} color={color} />
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
                        component={AdminAccount}
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

export default AdminPage;