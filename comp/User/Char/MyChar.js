import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../firbase/data/firestoreInit';
import { onAuthStateChangeListener } from '../../firbase/auth/auth.listener';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native';



export function MyChar() {
  const [charInfo, setCharInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener(user => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const charCollection = collection(db, 'Charakter');
      const q = query(charCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => doc.data());
      setCharInfo(docs); // Speichert alle Dokumente in charInfo
    };

    fetchData();
  }, [userId]);

  if (!charInfo) return <Text>Loading...</Text>;

return (
  <View style={{flex: 1, padding: 10, backgroundColor: '#292b29'  }}>
    {charInfo.map((char, index) => (
      <TouchableHighlight key={index} onPress={() => navigation.navigate('Charakterbogen', { char })}>
        <Card containerStyle={{ marginBottom: 20, padding: 10, borderRadius: 10,backgroundColor: '#292b29'}}>
          <Card.Divider />
          <Text style={styles.cardtext}>
            Vorname: {char.vorname}
          </Text>
          <Text style={styles.cardtext}>
            Name: {char.name}
          </Text>
          <Text style={styles.cardtext}>
            Klasse: {char.selectedClass}
          </Text>
          <Text style={styles.cardtext}>
            Level: {char.level}
          </Text>
        </Card>
      </TouchableHighlight>
    ))}
  </View>
);
}

const styles = StyleSheet.create({
    cardtext:{
      color: 'white',  
      marginBottom: 10,
      backgroundColor: '#292b29'} 
});