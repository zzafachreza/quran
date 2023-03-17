import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyGap, MyPicker } from '../../components';
import { colors } from '../../utils';
import axios from 'axios';
import { apiURL, storeData } from '../../utils/localStorage';

export default function QuranAyat({ navigation, route }) {
    const user = route.params;

    const [kirim, setKirim] = useState({
        id: route.params.id,
        jadwal_baca: 1,
        jumlah_ayat: 1,
    })

    return (
        <ImageBackground source={require('../../assets/ornamen.png')} style={{
            flex: 1,
            paddingHorizontal: 30,
            paddingVertical: 80,
        }}>
            <MyPicker label="Pilih Jadwal baca" onValueChange={x => setKirim({ ...kirim, jadwal_baca: x })} iconname="repeat" data={[
                { label: '1x baca', value: 1 },
                { label: '3x baca', value: 3 },
                { label: '5x baca', value: 5 },
            ]} />
            <MyGap jarak={10} />
            <MyPicker label="Pilih Jumlah Ayat" onValueChange={x => setKirim({ ...kirim, jumlah_ayat: x })} iconname="book-outline" data={[
                { label: '1 Ayat', value: 1 },
                { label: '3 Ayat', value: 3 },
                { label: '5 Ayat', value: 5 },
            ]} />
            <MyGap jarak={30} />
            <MyButton onPress={() => {
                console.log(kirim);

                axios.post(apiURL + 'user_jadwal', kirim).then(res => {
                    console.log('user hasil', res.data);
                    storeData('user', res.data);
                    navigation.navigate('QuranAyatBaca', res.data)
                })


            }} warna={colors.primary} title="Simpan" />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})