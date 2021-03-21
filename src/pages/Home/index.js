import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import * as Location from 'expo-location';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';

import api, { key } from '../../services/api';
import Loading from '../../components/Loading';

const mylist = [
    {
      "date": "17/03",
      "weekday": "Qua",
      "max": 28,
      "min": 17,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "18/03",
      "weekday": "Qui",
      "max": 26,
      "min": 19,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "19/03",
      "weekday": "Sex",
      "max": 25,
      "min": 18,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "20/03",
      "weekday": "Sáb",
      "max": 27,
      "min": 16,
      "description": "Tempestades isoladas",
      "condition": "storm"
    },
    {
      "date": "21/03",
      "weekday": "Dom",
      "max": 28,
      "min": 17,
      "description": "Ensolarado com muitas nuvens",
      "condition": "cloudly_day"
    },
    {
      "date": "22/03",
      "weekday": "Seg",
      "max": 28,
      "min": 18,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "23/03",
      "weekday": "Ter",
      "max": 28,
      "min": 17,
      "description": "Tempestades isoladas",
      "condition": "storm"
    },
    {
      "date": "24/03",
      "weekday": "Qua",
      "max": 28,
      "min": 18,
      "description": "Parcialmente nublado",
      "condition": "cloudly_day"
    },
    {
      "date": "25/03",
      "weekday": "Qui",
      "max": 25,
      "min": 19,
      "description": "Tempestades isoladas",
      "condition": "storm"
    },
    {
      "date": "26/03",
      "weekday": "Sex",
      "max": 25,
      "min": 17,
      "description": "Parcialmente nublado",
      "condition": "cloudly_day"
    }
  ]

export default function Home(){

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);

  useEffect( () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      
      if(status !== 'granted'){
        setErrorMsg('Permisão negada para acessar a localização');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;
 
      const response = await api.get(
        `/weather?key=${key}&lat=${latitude}&lon=${longitude}`
      );

      setWeather(response.data);
      setLoading(false);
      
    })();

  }, []);

    if(loading){
      return(
        <Loading/>
      );
    }
    return(
        <SafeAreaView style={styles.container}>
            <Menu/>
            <Header weather={weather}/>
            <Conditions weather={weather}/>

            <FlatList
            data={mylist}
            keyExtractor={item => item.date}
            renderItem={ ({item}) => <Forecast data={item}/> }
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={styles.list}
            contentContainerStyle={{ paddingBottom: '5%'}}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8f0ff',
        paddingTop: '5%',

    },
    list:{
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
});