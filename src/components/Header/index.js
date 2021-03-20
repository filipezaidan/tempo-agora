import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';

import {  Ionicons } from '@expo/vector-icons';

export default function Header({weather}){
    const { date, city, temp} = weather.results;
    return( 
        <LinearGradient
        style={styles.header}
        colors={['#1ed6ff', '#97c1ff']}>

            <Text style={styles.date}>{date}</Text>
            <Text style={styles.city}>{city}</Text>

            <Ionicons
            name='cloud'
            color='#fff'
            size={150}
            />

            <Text style={styles.temp}>{temp}º</Text>
        </LinearGradient>

        
    );
}


const styles = StyleSheet.create({
    header: {
        width: '95%',
        height: '55%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    date:{
        color: '#fff',
        fontSize:  17,
    },
    city:{
        color: '#fff',
        fontSize:  20,
        fontWeight: 'bold'

    },
    temp:{
        color: '#fff',
        fontSize:  80,
        fontWeight: 'bold'

    },
});