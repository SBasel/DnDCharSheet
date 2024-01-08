import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const imageMap = {
  '0': require('../../../../assets/Stats/stat0.png'),
  '1': require('../../../../assets/Stats/stat1.png'),
  '2': require('../../../../assets/Stats/stat2.png'),
  '3': require('../../../../assets/Stats/stat3.png'),
  '4': require('../../../../assets/Stats/stat4.png'),
  '5': require('../../../../assets/Stats/stat5.png'),
  '6': require('../../../../assets/Stats/stat6.png'),
  '7': require('../../../../assets/Stats/stat7.png'),
  '8': require('../../../../assets/Stats/stat8.png'),
  '9': require('../../../../assets/Stats/stat9.png'),
  '10': require('../../../../assets/Stats/stat10.png'),
  '11': require('../../../../assets/Stats/stat11.png'),
  '12': require('../../../../assets/Stats/stat12.png'),
  '13': require('../../../../assets/Stats/stat13.png'),
  '14': require('../../../../assets/Stats/stat14.png'),
  '15': require('../../../../assets/Stats/stat15.png'),
  '16': require('../../../../assets/Stats/stat16.png'),
  '17': require('../../../../assets/Stats/stat17.png'),
  '18': require('../../../../assets/Stats/stat18.png'),
  '19': require('../../../../assets/Stats/stat19.png'),
  '20': require('../../../../assets/Stats/stat20.png'),
};

export const CharacterBadge = ({ value, stat }) => {
  const [statValue, setStatValue] = useState(null);
  const [imageSource, setImageSource] = useState(imageMap[value]);



 useEffect(() => {
    setStatValue(value);
    setImageSource(imageMap[value]);
  }, [value]);

  return (
    <View style={styles.imageContainerStat}>
        <ImageBackground
            source={imageSource}
            style={styles.backgroundImageStat}
            resizeMode="contain">
            <Text style={styles.textStatone}>{stat}</Text> 
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainerStat: {
    height: 180,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  backgroundImageStat: {
    width: '100%',
    height: '100%',
    justifyContent: 'start',
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: 'black'
  },
  textStatone: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    padding: 5,
    borderWidth: 1, 
    borderColor: 'black',
  },
});