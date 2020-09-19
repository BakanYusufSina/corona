import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Card } from 'react-native-elements'
import Axios from 'axios'
import commasNumber from '../functions/pointNumber'
import { ScrollView } from 'react-native-gesture-handler'
import Flag from 'react-native-flags'
import { DataTable } from 'react-native-paper'

export default class HomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            globalData: {},
            someCountries: []
        }
    }
    componentDidMount() {
        Axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://api.coronatracker.com/v3/stats/worldometer/global'
        })
            .then(res => this.setState({ globalData: res.data }))
            .then(
                Axios({
                    method: 'GET',
                    withCredentials: true,
                    url: 'http://api.coronatracker.com/v3/stats/worldometer/country'
                })
                    .then(res => this.setState({ someCountries: res.data.slice(0, 25) }))
            )
    }
    commas = (x) => {
        return x !== 0 ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ''
    }
    render() {
        let globalData = this.state.globalData
        let countries = this.state.someCountries
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container} >
                    <View style={styles.logoContainer}>
                        <FontAwesomeIcon name="virus" size={60} color="rgb(201,130,118)" />
                        <Text style={styles.title}>CoronaVirus</Text>
                    </View>
                    <View style={styles.globalDatas}>
                        <Card title={(
                            <View style={styles.cardTitle}>
                                <Ionicons name="earth" size={36} />
                                <Text style={[styles.title, { marginLeft: 10, color: 'black' }]}>Dünya</Text>
                            </View>)}>
                            {typeof globalData.totalConfirmed !== 'undefined' ? (
                                <>
                                    <View style={[styles.boxes,
                                    { backgroundColor: 'rgba(159, 209, 233, 0.7)' }]}>
                                        <Text style={styles.boxesTitle}>Vaka Sayısı</Text>
                                        <Text style={styles.numbers}>
                                            {this.commas(globalData.totalConfirmed)}
                                        </Text>
                                        <Text style={{ fontWeight: '700' }}>
                                            +{this.commas(globalData.totalNewCases)}
                                        </Text>
                                    </View>
                                    <View style={[styles.boxes, { backgroundColor: 'rgba(27, 228, 144, 0.7)' }]}>
                                        <Text style={styles.boxesTitle}>İyileşen Sayısı</Text>
                                        <Text style={styles.numbers}>
                                            {this.commas(globalData.totalRecovered)}
                                        </Text>
                                    </View>
                                    <View style={[styles.boxes, { backgroundColor: 'rgba(228, 27, 27, 0.7)' }]}>
                                        <Text style={styles.boxesTitle}>Ölüm Sayısı</Text>
                                        <Text style={styles.numbers}>
                                            {this.commas(globalData.totalDeaths)}
                                        </Text>
                                        <Text style={{ fontWeight: '700' }}>
                                            +{this.commas(globalData.totalNewDeaths)}
                                        </Text>
                                    </View>
                                </>
                            ) : <ActivityIndicator animating={true} color='red' size={60} />}
                        </Card>
                    </View>
                    <View>
                        <Card title="En Çok Etkilenen 25 Ülke">
                            {countries.length !== 0 ? (<DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Ülke</DataTable.Title>
                                    <DataTable.Title numeric>Vaka Sayısı</DataTable.Title>
                                    <DataTable.Title numeric>Ölüm Sayısı</DataTable.Title>
                                </DataTable.Header>
                                {countries.map((l, i) => (
                                    <DataTable.Row key={i} style={i % 2 === 0 ?
                                        { backgroundColor: 'rgba(91, 192, 222, 0.1)' } : ''}>
                                        <DataTable.Cell>
                                            <Flag code={l.countryCode} size={16} /> {l.country}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={{ color: 'darkcyan' }}>{this.commas(l.totalConfirmed)}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={{ color: 'red' }}>{this.commas(l.totalDeaths)}</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                            )
                                : <ActivityIndicator animating={true} color='darkslategray' size={50} />}
                        </Card>
                    </View>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    logoContainer: {
        backgroundColor: 'darkslategray',
        padding: 50,
        borderBottomRightRadius: 90,
        borderBottomLeftRadius: 90,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        textAlignVertical: 'center',
        fontSize: 20,
        marginLeft: 20,
        letterSpacing: 2,
        color: 'white',
        fontWeight: 'bold'
    },
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 0.75,
        marginBottom: 20
    },
    globalDatas: {
        padding: 6,
    },
    boxes: {
        alignItems: 'center',
        marginBottom: 10,
        borderBottomColor: 'rgba(0, 0, 0, 0.15)',
        borderBottomWidth: 0.75,
        borderRadius: 6
    },
    boxesTitle: {
        fontSize: 15,
        letterSpacing: 1,
        marginBottom: 10
    },
    numbers: {
        fontSize: 18,
        letterSpacing: 0.5,
        marginBottom: 6,
        fontWeight: '600'
    }
})