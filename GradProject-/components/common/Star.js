import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

function Star({rate, size, style}){
    if(rate > 4.5){//5
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
            </View>
        );
    }
    else if(rate == 4.5){//4.5
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-half-sharp" size={size} color='#bfba22' />
            </View>
        );
    }
    else if(rate < 4.5 && rate > 3.5){//4
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
            </View>
        );
    }
    else if(rate == 3.5){//3.5
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-half-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
            </View>
        );
    }
    else if(rate < 3.5 && rate > 2.5){//3
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
            </View>
        );
    }
    else if(rate == 2.5){//2.5
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-half-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
            </View>
        );
    }
    else if(rate < 2.5 && rate > 1.5){//2
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
            </View>
        );
    }
    else if(rate == 1.5){//1.5
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-half-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
            </View>
        );
    }
    else if(rate < 1.5 && rate > 0){//1
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#bfba22' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
            </View>
        );
    }
    else if(rate == 0){//1
        return(
            <View style={[styles.Container, style]}>
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
                <Ionicons name="ios-star-sharp" size={size} color='#ada99e' />
            </View>
        );
    }
    
}

export default Star;

const styles = StyleSheet.create({
    Container:{
        flexDirection: 'row',
        alignItems: 'center',
    }
});