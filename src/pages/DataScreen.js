import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'
import Country from './Country'
import { Picker } from '@react-native-community/picker'
import isoDate from '../functions/isoDate'

export default function DataScreen() {
    const [selectedValue, setSelectedValue] = useState("USA")
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState({})
    const [last5Days, setLastDays] = useState([])
    const [dayCharts, setChart] = useState([])
    const [bar, setBar] = useState([])
    useEffect(() => {
        Axios({
            method: 'GET',
            url: 'http://api.coronatracker.com/v3/stats/worldometer/country',
            withCredentials: true
        })
            .then(res => {
                setCountry(res.data[0])
                setCountries(res.data)
            })
            .then(() => {
                getLastDays('US')
            })
    }, [])
    getLastDays = (code) => {
        Axios({
            method: 'GET',
            url: 'http://api.coronatracker.com/v3/analytics/newCases/country?countryCode=' +
                code + '&startDate=' + '2020-09-01' + '&endDate=' + isoDate() + '',
            withCredentials: true
        })
            .then(res => {
                setLastDays(res.data)
                let data = []
                let bar = []
                res.data.map((l, i) => {
                    data.push({
                        month: l.last_updated,
                        confirmed: l.new_infections,
                        death: l.new_deaths,
                        recovered: l.new_recovered
                    })
                    bar.push(l.new_deaths)
                })
                setChart([...data])
                setBar([...bar])
            })
    }
    if (countries.length === 0 && last5Days.length === 0) return (
        <View style={styles.container}>
            <ActivityIndicator color='red' size={60} animating={true} />
        </View>)
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Picker
                        mode='dropdown'
                        selectedValue={selectedValue}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            setCountry(countries[itemIndex])
                            setSelectedValue(itemValue)
                            setLastDays([])
                            getLastDays(countries[itemIndex].countryCode)
                        }}
                    >
                        {countries.map((l, i) => (
                            <Picker.Item value={l.country} label={l.country} key={i} />
                        ))}
                    </Picker>
                </View>
                <Country countryData={country} last5Days={last5Days} chart={dayCharts} barChart={bar} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    picker: {
        width: '80%',
        height: 50
    }
})