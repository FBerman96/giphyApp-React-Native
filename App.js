import React, {useState} from 'react';
import {View, TextInput, StyleSheet, FlatList, Image} from 'react-native';

export default function App() {
  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('');
async function fetchGifs() {
    try {
      const API_KEY = 'xQQtrmOPbSryHAhCkfi6W2m7HLZSbUSd';
      const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
      const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}&limit=15&offset=0&rating=pg&lang=en
      `);
      const res = await resJson.json();
      setGifs(res.data);
    } catch (error) {
      console.warn(error);
    }
  } 
function onEdit(newTerm) {
    updateTerm(newTerm);
    fetchGifs();
  }
return (
    <View style={styles.view}>
      <TextInput
        placeholder="BUSCAR GIFS"
        style={styles.textInput}
        onChangeText={(text) => onEdit(text)}
      />
      <FlatList
        data={gifs}
        
        renderItem={({item}) => (
          <Image
            resizeMode='contain'
            style={styles.image}
            source={{uri: item.images.original.url}}
          />
        )}
        key={gifs.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4AB021',
  },
  textInput: {
    width: '100%',
    height: 50,
    color: 'orange',
    alignItems: 'center',
    margin: 2,
  },
  image: {
    width: 300,
    height: 150,
    borderWidth: 3,
    marginBottom: 5,
  },
});