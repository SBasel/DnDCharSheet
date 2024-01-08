import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChangeListener } from '../../firbase/auth/auth.listener';
import { CharacterBadge } from './charcomp/statcomp'
import { CharakterInfo } from './charcomp/charinfo';
import { EditStatsModal } from './charcomp/editstat';
import db from '../../firbase/data/firestoreInit';

export function Charakterbogen({ route }) {
  const { char } = route.params;
  const [charData, setCharData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentStats, setCurrentStats] = useState({
    str: '',
    agi: '',
    con: '',
    wis: '',
    cha: '',
    int: '',
  });
  
  useEffect(() => {
    if (charData) {
      setCurrentStats({
        str: charData.str || '',
        agi: charData.agi || '',
        con: charData.con || '',
        wis: charData.wis || '',
        cha: charData.cha || '',
        int: charData.int || '',
      });
    }
  }, [charData]);


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
    const chars = querySnapshot.docs.map(doc => ({
      docId: doc.id, // Speichern Sie die Dokument-ID
      ...doc.data() // und die restlichen Daten des Dokuments
    }));
    const foundChar = chars.find(doc => doc.name === char.name);
    setCharData(foundChar); // Setzen Sie die Daten einschließlich der docId
  };

  fetchData();
}, [userId, char.name]);

const reloadCharData = async () => {
  if (!userId) return;

  try {
    const charCollection = collection(db, 'Charakter');
    const q = query(charCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
    const foundChar = docs.find(doc => doc.name === char.name);
    if (foundChar) {
      setCharData(foundChar);
      setCurrentStats({
        str: foundChar.str || '',
        agi: foundChar.agi || '',
        con: foundChar.con || '',
        wis: foundChar.wis || '',
        cha: foundChar.cha || '',
        int: foundChar.int || '',
      });
    }
  } catch (error) {
    console.error("Fehler beim Laden der Charakterdaten: ", error);
  }
};

  if (!charData) {
    return <Text>Loading...</Text>;
  }

return (
  <View style={{ flex: 1 }}>
    <View containerStyle={styles.cardContainer}>
      <View style={{borderWidth: 1, borderColor: 'black', margin: 5}}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../../../assets/badget28small.png')}
          style={styles.backgroundImage}
          resizeMode="contain" 
        >
          <Text style={styles.text}>
            {charData.vorname} {charData.name}
          </Text>
        </ImageBackground>
      </View>
      <Text style={{
            marginBottom: 10,
            fontSize: 12,
            justifyContent: 'center', 
            alignItems: 'center', 
            textAlign: 'center',}}>
            Charakter Name
      </Text>
      </View>
      <View style={{ flexDirection: 'row', paddingLeft: 10, borderWidth: 1, borderColor: 'black', margin: 5 }}>
        <CharakterInfo 
        charDataone={charData.selectedClass} 
        charDatatwo={charData.level} 
        infoone={'Klasse'} 
        infotwo={'Level'}/>
        <CharakterInfo 
        charDataone={charData.selectedClass} 
        charDatatwo={charData.level} 
        infoone={'Hintergrund'} 
        infotwo={'Exp. Points'}/>
        <CharakterInfo 
        charDataone={charData.selectedClass} 
        charDatatwo={charData.level} 
        infoone={'Alignment'} 
        infotwo={'Rasse'}/>
        <CharakterInfo 
        charDataone={charData.selectedClass} 
        charDatatwo={charData.level} 
        infoone={'Vorname'} 
        infotwo={'Nachname'}/>
      </View>
      <View style={{paddingLeft: 10, borderWidth: 1, borderColor: 'black', margin: 5}}>
        
      <View style={{ flexDirection: 'row' }}>
        <CharacterBadge stat={'STR'} value={charData.str}/>
        <CharacterBadge stat={'AGI'} value={charData.agi}/>
        <CharacterBadge stat={'CON'} value={charData.con}/>
        <EditStatsModal
        docId={charData?.docId} 
        currentStats={currentStats}
        onClose={reloadCharData} 
      />
      </View>
       <View style={{ flexDirection: 'row' }}>
        <CharacterBadge stat={'WIS'} value={charData.wis}/>
        <CharacterBadge stat={'CHA'} value={charData.cha}/>
         <CharacterBadge stat={'INT'} value={charData.int}/>
      </View>
      </View>        
    </View>
  </View>
);
}

const styles = StyleSheet.create({

  imageContainer: {
    height: 100, // Set a fixed height for the image container
    width: '100%', // Set the width to take the full width of the card
    alignItems: 'center', // Aligns children (like your Text component) to the start which is top in this case
    justifyContent: 'center', // Centers children on the cross axis (horizontally here)
  },
  
  backgroundImage: {
    width: '100%', // Full width of its container
    height: '100%', // Full height of its container
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 15
  },
  
});