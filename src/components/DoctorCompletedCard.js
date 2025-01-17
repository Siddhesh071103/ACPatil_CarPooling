import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { color, colorTheme } from '../constant'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import LottieView from 'lottie-react-native'

export default function DoctorCard({ isButtonRequired, item }) {
    return (
        <View style={styles.card}>
            <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-between" }}>
                <Text style={[styles.boldText]}>{item.date}</Text>
                <Text style={styles.boldText}> {item.time}</Text>
            </View>
            <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between' }}>
                <View style={{ marginRight: 12 }}>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={styles.boldText}>{item.Rides}</Text>
                        <Text style={styles.smallText}>{item.vehicle}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="star" size={20} color={'#EF802F'} style={{ marginRight: 10, marginTop: 6 }} />
                        <View>
                            <Text style={[styles.grayText, { fontSize: 12 }]}>Rating</Text>
                            <Text style={[styles.smallText]}>4.7 out of 5</Text>
                        </View>
                    </View>
                </View>
                <LottieView
                    source={item.lotteasset}
                    autoPlay
                    loop
                    style={{ width: 100, height: 100 }}
                />
            </View>
            {isButtonRequired ?
                <View style={[styles.subCard, { backgroundColor: 'white' }]}>
                    <TouchableOpacity
                        style={{ backgroundColor: colorTheme.primaryColor, width: 120, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colorTheme.borderColor }}
                    // onPress={() => { setIsReshedule(true) }}
                    >
                        <Text style={{ color: "white" }}>Add Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: "white", width: 120, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colorTheme.borderColor }}
                    // onPress={() => { setIsReshedule(false) }}
                    >
                        <Text style={{ color: "black" }}>Re-Book</Text>
                    </TouchableOpacity>
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    grayText: {
        fontSize: 17,
        fontWeight: '700',
        color: "gray"
    },
    boldText: {
        fontSize: 17,
        fontWeight: '700',
        color: "black"
    },
    smallText: {
        fontSize: 12,
        fontWeight: '500',
        color: "black"
    },
    card: {
        backgroundColor: 'white',
        height: "auto",
        borderRadius: 10,
        elevation: 5,
        marginTop: 15,
        marginBottom: 15
    },
    image: {
        width: '40%',
        height: '110%',
        borderRadius: 20
    },
    subCard: {
        margin: 15,
        height: 50,
        backgroundColor: colorTheme.primaryColor,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 30
    }
})