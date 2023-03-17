import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";
import ZavalabsScanner from 'react-native-zavalabs-scanner'
import moment from 'moment';

export default function Home({ navigation }) {



  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {


    if (isFocused) {
      __getTransaction();
    }

  }, [isFocused]);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
      console.log(res)
    })



  }


  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };




  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Selamat datang, {user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>{MYAPP}</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30
          }}>
            <Icon type='ionicon' name='list' color={colors.white} />

          </TouchableOpacity>

        </View>


      </View>

      <View style={{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={require('../../assets/logo.png')} style={{
          width: windowWidth / 1.2,
        }} />
        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: 15,
          marginTop: 10
        }}>Silahkan pilih dibawah ini jenis baca Al-Quran sampai khatam</Text>
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }}>



        {(user.jenis == 0 || user.jenis == 1) && <TouchableOpacity
          onPress={() => {

            if (user.jenis == 0) {

              Alert.alert(MYAPP, 'Kamu yakin akan baca one ayat ini sampai khatam ?', [
                { text: 'TIDAK' },
                {
                  text: 'IYA',
                  onPress: () => {

                    axios.post(apiURL + 'user_jenis', {
                      id: user.id,
                      jenis: 1,
                    }).then(res => {
                      console.log('user hasil', res.data);
                      setUser(res.data);
                      storeData('user', res.data);
                      navigation.navigate('QuranAyat', user)
                    })

                  }
                }
              ])
            } else {
              if (user.jadwal_baca !== 0) {
                navigation.navigate('QuranAyatBaca', user)
              } else {
                navigation.navigate('QuranAyat', user)
              }
            }



          }}

          style={{
          }}>
          <Image style={{
            width: windowWidth / 4.5,
            height: windowWidth / 4.5,
            resizeMode: 'contain'
          }} source={require('../../assets/A1.png')} />
        </TouchableOpacity>}

        {(user.jenis == 0 || user.jenis == 2) && <TouchableOpacity
          onPress={() => {

          }}

          style={{
          }}>
          <Image style={{
            width: windowWidth / 4.5,
            height: windowWidth / 4.5,
            resizeMode: 'contain'
          }} source={require('../../assets/A2.png')} />
        </TouchableOpacity>}

        {(user.jenis == 0 || user.jenis == 3) && <TouchableOpacity
          onPress={() => {

          }}

          style={{
          }}>
          <Image style={{
            width: windowWidth / 4.5,
            height: windowWidth / 4.5,
            resizeMode: 'contain'
          }} source={require('../../assets/A3.png')} />
        </TouchableOpacity>}

        {(user.jenis == 0 || user.jenis == 4) && <TouchableOpacity
          onPress={() => {

          }}

          style={{
          }}>
          <Image style={{
            width: windowWidth / 4.5,
            height: windowWidth / 4.5,
            resizeMode: 'contain'
          }} source={require('../../assets/A4.png')} />
        </TouchableOpacity>}





      </View>



    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});