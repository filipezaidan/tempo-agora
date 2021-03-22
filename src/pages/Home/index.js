import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import * as Location from 'expo-location';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';
import Loading from '../../components/Loading';

import {ConditionSlug} from '../../utils/ConditionSlug';

import api, { key } from '../../services/api';

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
  const [icon, setIcon] = useState({name: 'cloud', color: '#fff'});
  const [background, setBackground] = useState(['#1ed6ff','#97c1ff'])

  useEffect( () => {
    (async () => {

      //Permissão de localização
      let { status } = await Location.requestPermissionsAsync();

      //Caso o usuário negue a permissão
      if(status !== 'granted'){
        setErrorMsg('Permisão negada para acessar a localização');
        setLoading(false);
        return;
      }

      //Armazena localizaão
      let location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;

      // Requisição de API
      const response = await api.get(
        `/weather?key=${key}&lat=${latitude}&lon=${longitude}`
      );

      //Armazena no useState os dados obtidos da API
      setWeather(response.data);
      
      const { currently, condition_slug  } = response.data.results;

      //Altera o background 
      if(currently === 'noite'){
        setBackground(['#0c3741', '#0f2f61'])
      }
      
      let iconSlug = ConditionSlug(condition_slug)

      //Altera o iconSlug
      if(icon !== iconSlug){
        setIcon(iconSlug);
      }


      //Desativa o Loading
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
          <Header weather={weather} background={background} icon={icon}/>
          <Conditions weather={weather}/>

          <FlatList
          data={weather.results.forecast}
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