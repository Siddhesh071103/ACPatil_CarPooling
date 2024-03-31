import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import LottieView from 'lottie-react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { sendSmsData } from '../../components/SendSMS'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-element-dropdown';

export default function Template({ navigation }) {

    const [email, setemail] = useState('')
    const [username, setUsename] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')

    const [gender, setGender] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ])

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [date, setdate] = useState(new Date())
    const [show, setshow] = useState(false)
    const [text, setText] = useState('')

    function onChange(event, selectedDate) {
        const currentDate = selectedDate || date;
        setdate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + tempDate.getMonth() + '/' + tempDate.getFullYear();
        setText(fDate)
        setshow(false)
    }

    // const auth = useSelector((state) => state.auth)
    // const { errorMessageSignUp } = auth
    // const dispatch = useDispatch()

    // async function handleClick(params) {
    //     dispatch(Signup(username, email, password, phone, gender, liscence, aadhar, dob))
    // }

    function generateOTP() {
        // Generate a random 4-digit number
        const otp = Math.floor(1000 + Math.random() * 9000);
        return otp.toString(); // Convert the number to a string
    }

    function handleRegister(params) {
        const otp = generateOTP()
        const SMSDATA = [
            {
                phone: phone,
                msg: `Your OTP for E-commute is ${otp}. Valid Only for 10 minutes`
            }
        ]
        sendSmsData(SMSDATA)
        navigation.navigate('VerifyAccount', { email: email, username: username, password: password, phone: phone, gender: value, dob: text, otp: otp })
    }

    return (
        <ScrollView style={styles.container}>
            {show && (
                <DateTimePicker
                    testId='dateTimePicker'
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            <View style={styles.subContainer}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate("Login") }}
                    style={{ width: 40, height: 40, backgroundColor: colorTheme.primaryColor, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons size={25} name={"arrow-left"} color={"white"} style={{ margin: 2 }} />
                </TouchableOpacity>
                <LottieView source={require("../../assets/json/signup.json")} autoPlay loop style={{ height: 200, }} />
                <Text style={[styles.smallText, { textAlign: 'center', marginTop: 50, fontSize: 16, fontWeight: '300', color: 'black', marginBottom: 25 }]}>Create your account</Text>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, marginBottom: 10 }}>
                    <View
                        style={{ backgroundColor: colorTheme.primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons size={25} name={"account"} color={"white"} style={{ margin: 10 }} />
                    </View>
                    <TextInput
                        placeholder='Name'
                        onChangeText={(text) => setUsename(text)}
                        value={username}
                        style={{ height: 48, width: "85%" }}
                    />
                </View>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, marginBottom: 5 }}>
                    <View
                        style={{ backgroundColor: colorTheme.primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons size={25} name={"cellphone"} color={"white"} style={{ margin: 10 }} />
                    </View>
                    <TextInput
                        keyboardType='numeric'
                        placeholder='Phone'
                        onChangeText={(text) => setPhone(text)}
                        value={phone}
                        style={{ height: 48, width: "85%" }}
                    />
                </View>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, marginBottom: 5 }}>
                    <View
                        style={{ backgroundColor: colorTheme.primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons size={25} name={"calendar"} color={"white"} style={{ margin: 10 }} />
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => setshow(true)}>
                        <Text style={{ marginLeft: 5 }}>{text === '' ? 'Enter Date' : text}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }, {}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={gender}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Gender' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <View
                                style={{ backgroundColor: colorTheme.primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center', height: 50, marginRight: 5 }}>
                                <MaterialCommunityIcons size={25} name={"lock"} color={"white"} style={{ padding: 10 }} />
                            </View>
                        )}
                    />
                </View>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, marginBottom: 10 }}>
                    <View
                        style={{ backgroundColor: colorTheme.primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons size={25} name={"email"} color={"white"} style={{ margin: 10 }} />
                    </View>
                    <TextInput
                        placeholder='Email'
                        onChangeText={(text) => setemail(text)}
                        value={email}
                        style={{ height: 48, width: "85%" }}
                    />
                </View>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, marginBottom: 5 }}>
                    <View
                        style={{ backgroundColor: colorTheme.primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons size={25} name={"lock"} color={"white"} style={{ margin: 10 }} />
                    </View>
                    <TextInput
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        style={{ height: 48, width: "85%" }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => { handleRegister() }}
                    style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 10, justifyContent: 'center', alignItems: "center", marginTop: 30 }}
                >
                    <Text style={[styles.smallText, { color: "white", margin: 14 }]}>Register</Text>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ borderWidth: 1, borderColor: colorTheme.primaryColor, height: 2, width: 50, }} />
                        <Text style={[styles.smallText, { marginLeft: 10, marginRight: 10 }]}>Or Register With</Text>
                        <View style={{ borderWidth: 1, borderColor: colorTheme.primaryColor, height: 2, width: 50, }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 30, }}>
                    <View style={{ width: 60, height: 60, elevation: 1.5, backgroundColor: "white", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/img/google.png')} resizeMode='contain' style={styles.image} />
                    </View>
                    <View style={{ width: 60, height: 60, elevation: 1.5, backgroundColor: "white", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/img/facebook.png')} resizeMode='contain' style={styles.image} />
                    </View>
                    <View style={{ width: 60, height: 60, elevation: 1.5, backgroundColor: "white", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/img/twitter.png')} resizeMode='contain' style={styles.image} />
                    </View>
                </View>
                <Text style={[styles.smallText, { textAlign: "center", marginTop: 10, }]}>
                    Already have an account? <Text onPress={() => { navigation.navigate('Login') }} style={[styles.smallText, { color: colorTheme.primaryColor }]}>Sign In</Text>
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor,
    },
    subContainer: {
        // width: "90%",
        height: "auto",
        alignSelf: "center",
        padding: 20
        // backgroundColor:"red"
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight
    },
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight
    },
    textInput: {
        borderRadius: 10,
        // backgroundColor:"red",
        width: "86%"
    },
    image: {
        width: 40,
        height: 40
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        // paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})