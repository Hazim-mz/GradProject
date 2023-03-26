import { View } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

import { AuthContext } from '../store/auth-context';
import UserPage from './User/UserPage';
import OwnerPage from './Owner/OwnerPage';
import VerificationScreen from './VerificationScreen';
import LodingOverlay from '../components/UI/LodingOverlay';
import WelcomeLoding from '../components/UI/WelcomeLoding';
import AdminPage from './Admin/AdminPage';

function MainPage(){
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userAccountCtx = useContext(AuthContext);
    const [locationOfUser, setLocationOfUser] = useState({
        latitude: -1,
        longitude: -1
    });
    useEffect(() => {
        (async () => {
            setIsSubmitting(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
        
            let location = await Location.getCurrentPositionAsync({});
            //console.log(location);
            setLocationOfUser({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            setIsSubmitting(false);
        })();
    }, []);
    const [rule, setRule] = useState(userAccountCtx.rule);
    useEffect(()=>{
        setRule(userAccountCtx.rule);
    }, [userAccountCtx]);

    if(isSubmitting){
        //return <LodingOverlay text={"Get your Loction"}/>;
        return <WelcomeLoding /> ;
    }
    
    //console.log(rule);
    if(userAccountCtx.isAuthenticated){
        if(rule == 2){
            return(
                <View style={{flex: 1}}>
                    <StatusBar style="auto" />
                    <AdminPage locationOfUser={locationOfUser}/>
                </View>
            );
        }else if(rule == 1){
            return(
                <View style={{flex: 1}}>
                    <StatusBar style="auto" />
                    <OwnerPage locationOfUser={locationOfUser}/>
                </View>
            );
        }else if(rule == -1){
            return(
                <View style={{flex: 1}}>
                    <StatusBar style="auto" />
                    <VerificationScreen locationOfUser={locationOfUser} updateRule={setRule}/>
                </View>
            );
        }
        else{
            return(
                <View style={{flex: 1}}>
                    <StatusBar style="auto" />
                    <UserPage locationOfUser={locationOfUser}/>
                </View>
            );
        }
    }
    else{
        return(
            <View style={{flex: 1}}>
                <StatusBar style="auto" />
                <UserPage locationOfUser={locationOfUser}/>
            </View>
        );
    }
    
}

export default MainPage;