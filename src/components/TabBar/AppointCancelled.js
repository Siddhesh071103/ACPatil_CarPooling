import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { blackText, blueText, color, colorTheme, grayText } from '../../constant'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DoctorCancelledCard from '../../components/DoctorCancelledCard'

const days = ["Mon", "Tue", "Wed", "Th", "Fr", "Sat", "Sun"]
 const CancelledRideData=[
  {
      Rides:'Ride to Kurla',
      vehicle:'Swift Desire',
      date:'Dec,2023',
      time:'03:00PM',
      lotteasset:require('../../assets/json/ecolottie/bikeani.json')
  },
  {
      Rides:'Ride to Malad',
      vehicle:'Alto 800',
      date:'Aug,2023',
      time:'06:00PM',
      lotteasset:require('../../assets/json/ecolottie/bikeani2.json')
  },
  {
      Rides:'Ride to Saki-Vihar',
      vehicle:'Maruti Suzuki',
      date:'Jan,2024',
      time:'11:00AM',
      lotteasset:require('../../assets/json/ecolottie/carani.json')
  },
  
]
export default function Appointment() {
  const date = new Date().getDate()
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
        {CancelledRideData.map((dat,index)=>(
            <DoctorCancelledCard isButtonRequired={true} item={dat} key={index}/>
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