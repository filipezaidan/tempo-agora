import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading(){
    return(
        <View style={styles.container}>
            <LottieView
            source={require('../../../assets/loading.json')}
            autoPlay 
            loop
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
});