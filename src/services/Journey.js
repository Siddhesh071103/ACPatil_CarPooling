import axios from "axios"
import { API_URL, COMMON_USER } from "../constant";

function FetchLatLong(address) {
    console.log(address);
    return new Promise((resolve, reject) => {
        axios.get(
            `https://photon.komoot.io/api/?lang=en&limit=1&q=${address}`
        ).then(async (response) => {
            try {
                // console.log(response.data.features[0].geometry.coordinates);
                resolve(response)
            } catch (e) { reject(e) }
        }).catch((err) => {
            reject(err)
        })
    })
}

async function bookRide(tripfrom, tripto, vehicletype, vehiclecapacity, vehiclenumber, date, time) {
    console.log(date, time);
    const token = COMMON_USER
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZmM2MDMwNjZlMjIwNjZlN2ZjOGRlIn0sImlhdCI6MTcwODExNjM0NX0.DnzbQIqxXVVhzZU741LFUXD33UpEBxAt6lbgAPRHCwM'
    const config = {
        headers: {
            'auth-token': token,
        }
    }

    console.log(tripfrom);
    const body = {
        tripfrom: tripfrom,
        tripto: tripto,
        vehicletype: vehicletype,
        vehiclecapacity: vehiclecapacity,
        seatavailable: vehiclecapacity,
        vehicleNumber: vehiclenumber,
        payment: "not paid",
        date: date,
        time: time
    }

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/ride/postride`, body, config)
            .then(async (response) => {
                try {
                    console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

async function getAllRide(tripfrom, tripto) {
    // console.log(typeof priority);
    const token = COMMON_USER
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZmM2MDMwNjZlMjIwNjZlN2ZjOGRlIn0sImlhdCI6MTcwODExNjM0NX0.DnzbQIqxXVVhzZU741LFUXD33UpEBxAt6lbgAPRHCwM'
    const config = {
        headers: {
            'auth-token': token,
        }
    }

    const body = {
        tripfrom: tripfrom,
        tripto: tripto
    }


    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/ride/getride`, body, config)
            .then(async (response) => {
                try {
                    // console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

function FetchRtoDetails(carno) {
    return new Promise((resolve, reject) => {
        axios.get(
            `https://www.carinfo.app/_next/data/TdGfV1tvLtidtsVDPbtWw/rc-details/MH02DR4101.json?rc=${carno}`
        ).then(async (response) => {
            try {
                // console.log(response.data);
                resolve(response)
            } catch (e) { reject(e) }
        }).catch((err) => {
            console.log(err);
            reject(err)
        })
    })
}

export const journeyServices = { FetchLatLong, bookRide, getAllRide, FetchRtoDetails }
