import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Conditions from '../Conditions';


export default function Card({weather}){  
    const { date, city, temp} = weather.results;

    return(
        <LinearGradient style={styles.header} colors={['#13d6ff', '#97c1ff']}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.weather}>{city}</Text>

            <View>
                <Text style={styles.temp}>{temp}º</Text>
            </View>

            <Conditions weather={weather} />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: '5%',
        width: "90%",
        paddingTop: '5%',
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8
    },
    date:{
        color:"#fff",
        fontSize: 16,
    },
    weather:{
        fontSize: 20,
        fontWeight:'bold',
        color: "#fff",
    },
    temp:{
        color:"#fff",
        fontSize: 90,
        fontWeight:'bold'
    }
});