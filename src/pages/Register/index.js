import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('nama_lengkap is Not Correct');
            setData({ ...data, nama_lengkap: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, nama_lengkap: text });
            setValid(true);
            // console.log('nama_lengkap is Correct');
        }
    };

    const [data, setData] = useState({
        api_token: api_token,
        password: '',
        email: '',
        nama_lengkap: '',
        username: '',
        telepon: '',
    });

    const simpan = () => {
        if (
            data.nama_lengkap.length === 0 &&
            data.telepon.length === 0 &&
            data.username.length === 0 &&
            data.email.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Maaf Semua Field Harus Di isi !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Maaf nama lengkap masih kosong !',
            });
        }
        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Maaf telepon masih kosong !',
            });
        } else if (data.username.length === 0) {
            showMessage({
                message: 'Maaf username masih kosong !',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Maaf Password masih kosong !',
            });
        } else {
            setLoading(true);
            console.log(data);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        Alert.alert(MYAPP, res.data.message);
                        navigation.goBack();
                    }


                });
        }
    };
    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                <MyGap jarak={10} />
                <MyInput

                    label="username"
                    iconname="at"

                    placeholder="Masukan nomor username"
                    value={data.username}
                    onChangeText={value =>
                        setData({
                            ...data,
                            username: value,
                        })
                    }
                />
                <MyGap jarak={10} />



                <MyInput
                    placeholder="Masukan nama lengkap"
                    label="Nama Lengkap"
                    iconname="person"
                    value={data.nama_lengkap}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nama_lengkap: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan nomor telepon"
                    label="Telepon"
                    iconname="call"
                    keyboardType="phone-pad"
                    value={data.telepon}
                    onChangeText={value =>
                        setData({
                            ...data,
                            telepon: value,
                        })
                    }
                />




                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan password"
                    label="Password"
                    iconname="key"
                    secureTextEntry
                    value={data.password}
                    onChangeText={value =>
                        setData({
                            ...data,
                            password: value,
                        })
                    }
                />
                <MyGap jarak={20} />
                {!loading &&
                    <MyButton

                        warna={colors.primary}
                        title="Daftar Sekarang"
                        Icons="log-in"
                        onPress={simpan}
                    />
                }
                <MyGap jarak={20} />

                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
