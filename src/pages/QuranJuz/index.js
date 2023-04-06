import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyGap, MyPicker } from '../../components';
import { colors, fonts } from '../../utils';
import axios from 'axios';
import { apiURL, MYAPP, storeData } from '../../utils/localStorage';
import moment from 'moment';

export default function QuranJuz({ navigation, route }) {
    const [user, setUser] = useState(route.params)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        axios.post(apiURL + 'getQuranJuz', {
            juz_baca: user.juz_baca,
        }).then(res => {
            setData(res.data);
            setLoading(false);
            // console.log('data quran juz', res.data);

        })
    }, []);

    const ConvertToArabicNumbers = (num) => {
        const arabicNumbers = '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
        return new String(num).replace(/[0123456789]/g, (d) => { return arabicNumbers[d] });
    }

    return (
        <ImageBackground source={require('../../assets/ornamen.png')} style={{
            flex: 1,
            paddingHorizontal: 30,
            paddingVertical: 80,
        }}>

            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color={colors.primary} />
                <Text style={{
                    marginVertical: 10,
                    fontFamily: fonts.secondary[400]
                }}>Download data Quran...</Text>
            </View>}

            {!loading && <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                }}>
                    {data.map((item, index) => {
                        return (
                            <View style={{
                                marginVertical: 5
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    fontFamily: fonts.primary.normal
                                }}>{item.arab} {'{' + ConvertToArabicNumbers(item.ayat) + '}'}</Text>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>}
            <MyButton warna={colors.primary} title="SELESAI" onPress={() => {
                console.log(data[data.length - 1].id);

                if (parseInt(data[data.length - 1].id) == 6236) {
                    console.log('Khatam');


                    axios.post(apiURL + 'user_ubah_khatam', {

                        id: user.id,

                    }).then(res => {
                        console.log(res.data);
                        // storeData('user', res.data);
                        Alert.alert(MYAPP, 'Alhamdulillah Barakallahu fiikum')
                        navigation.replace('Khatam');


                    })
                } else {
                    axios.post(apiURL + 'user_ubah_last_juz', {
                        fid_quran: parseInt(data[data.length - 1].id) + 1,
                        id: user.id,
                        juz_baca: parseInt(user.juz_baca) + 1,
                        halaman_baca: parseInt(user.halaman_baca) + 1,
                        jadwal_baca: user.jadwal_baca,
                        tanggal_today: user.tanggal_today,
                        jumlah_today: user.jumlah_today,
                    }).then(res => {
                        console.log(res.data);
                        // storeData('user', res.data);
                        Alert.alert(MYAPP, 'Alhamdulillah Barakallahu fiikum')
                        navigation.replace('Home');


                    })
                }


            }} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})