import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import Card from '../../components/Card';
import { Feather } from '@expo/vector-icons';
import {  useNavigation } from '@react-navigation/native';

import api, { key } from '../../services/api';

export default function Search(){
    const navigation = useNavigation();

    const [input, setInput ] = useState('');
    const [city, setCity ] = useState(null);
    const [error, setError] = useState(null);
    const [errorActive, setErrorActive] = useState(false);
   
    async function handleSearch(){

        if(input === ""){
            setErrorActive(true);
            setError("Por favor, digite o nome da cidade!")
            setInput('');
            setCity(null);
            Keyboard.dismiss();
            return;
        }

        const response =  await api.get(`/weather?key=${key}&city_name=${input}`);

        if(response.data.by === 'default'){
            setErrorActive(true);
            setError("Cidade não encontrada!");
            setInput('');
            setCity(null);
            Keyboard.dismiss();
            return;
        }

        setCity(response.data);
        setInput('');
        Keyboard.dismiss();
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Feather
                    name="chevron-left"
                    size={32}
                    color="#000"
                />
                <Text style={{ fontSize: 22}}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.searchBox}>
                <TextInput
                    value={input}
                    onChangeText={ (value) => setInput(value) }
                    placeholder= "Ex: Maceió, AL"
                    style={styles.input}
                />
                <TouchableOpacity style={styles.icon} onPress={handleSearch}>
                    <Feather
                        name="search"
                        size={22}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>

            {errorActive ? <Text>{error}</Text> :  <></>}
            {city && <Card weather={city}/>}
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: "#e8f0ff",
    },
    backButton:{
        flexDirection: 'row',
        marginLeft: 15,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    searchBox:{
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: "#ddd",
      width: '90%',
      height: 50,
      borderRadius: 8,
    },
    input:{
        width: "85%",
        height: 50,
        backgroundColor: "#fff",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 7,

    },
    icon:{
        width: "15%",
        backgroundColor: "#1ed6ff",
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    }

});