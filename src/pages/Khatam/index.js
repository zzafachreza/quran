import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, windowWidth } from '../../utils'
import { MyButton } from '../../components'

export default function Khatam({ navigation }) {
    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,
            }}>
                <Image source={require('../../assets/khatam.jpg')} style={{
                    width: windowWidth,
                    resizeMode: 'contain'
                }} />
            </View>
            <View style={{
                padding: 10,
            }}>
                <MyButton warna={colors.primary} title="KEMBALI KE HOME" onPress={() => navigation.replace('Home')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})