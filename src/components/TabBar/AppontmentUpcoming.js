import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { blackText, blueText, colorTheme, grayText } from '../../constant'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DoctorCard from '../DoctorCard'

const days = ["Mon", "Tue", "Wed", "Th", "Fr", "Sat", "Sun"]
const data = [
  {
    Ride: "Ride to Sakinaka",
    car: "Inova",
    lotteasset: require('../../assets/json/ecolottie/caranim2.json')
  },
  {
    Ride: "Ride to Vasai(West)",
    car: "Inova",
    lotteasset: require('../../assets/json/ecolottie/caranim3.json')
  },
  {
    Ride: "Ride to Virar(West)",
    car: "Inova",
    lotteasset: require('../../assets/json/ecolottie/carani.json')
  },
];
export default function Appointment({ navigation }) {
  const date = new Date().getDate()
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <Text style={[styles.smallText, { marginTop: 10 }]}>Apr 08,2022</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.bigText}>Today</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: 96, height: 30, backgroundColor: colorTheme.primaryColor, borderRadius: 50 }}>
              <MaterialCommunityIcons name="plus-thick" color="white" size={15} />
              <Text style={[styles.smallText, { color: "white", marginLeft: 5 }]}>Add</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            {days.map((day, index) => {
              return (
                <View style={{ justifyContent: "space-evenly", alignItems: "center", height: 60, width: 41.2, backgroundColor: index === 3 ? colorTheme.iconBackGroundColor : "white", borderRadius: 50, marginRight: 5 }} key={index}>
                  <Text style={[index === 3 ? styles.blueText : styles.bigText, { marginTop: 5, }]}>{12 + index}</Text>
                  <Text style={[styles.smallText, { marginBottom: 10, color: index === 3 ? blueText.color : grayText.color }]}>{day}</Text>
                </View>
              )
            })}
          </View>
          <Text style={[styles.bigText, { marginTop: 15 }]}>Remainder</Text>
          <Text style={styles.smallText}>Dont forget schedule for upcoming appointment </Text>
          {data.map((dat, index) => (
            <View style={{ marginTop: 15, marginBottom: 15 }} key={index}>
              <DoctorCard navigation={navigation} isButtonRequired item={dat } />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.appBackGroundColor
  },
  subContainer: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
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
})