import { View, StyleSheet } from "react-native";
import { useEffect, useRef, useCallback } from 'react'

import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';
import { GlobalStyles } from "../../constants/styles";


function WelcomeLoding({source, style, onAnimationFinish, autoplay = true, loop = true, speed = 1.5}){

  const lottieRef = useRef(null);
  useEffect(() => {
      lottieRef.current?.reset();
      setTimeout(() => {
          lottieRef.current?.play();
      }, 0)

  }, []);  

  return(
      <View style={[styles.view1, StyleSheet.absoluteFillObject]}>
          <AnimatedLottieView 
              ref={lottieRef}
              source={require('../../assets/lf30_editor_zq9c5wtz.json')} 
              style={{ flex: 1,height: 350}}
              autoPlay={autoplay}
              loop={loop}
              speed={speed}
          />
      </View>
  );
}

export default WelcomeLoding;

const styles = StyleSheet.create({
    view1:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary10,
        zIndex: 1,
    },
});