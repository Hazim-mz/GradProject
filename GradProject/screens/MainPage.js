import { View } from 'react-native';
import { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../store/auth-context';
import UserPage from './User/UserPage';
import AdminPage from './Admin/AdminPage';

function MainPage(){
    const userAccountCtx = useContext(AuthContext);
    if(userAccountCtx.isAuthenticated){
        if(userAccountCtx.rule == 1){
            return(
                <View style={{flex: 1}}>
                    <StatusBar style="auto" />
                    <AdminPage/>
                </View>
            );
        }
        else{
            return(
                <View style={{flex: 1}}>
                    <StatusBar style="auto" />
                    <UserPage />
                </View>
            );
        }
    }
    else{
        return(
            <View style={{flex: 1}}>
                <StatusBar style="auto" />
                <UserPage />
            </View>
        );
    }

}

export default MainPage;