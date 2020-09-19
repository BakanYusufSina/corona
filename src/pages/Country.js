import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Flag from 'react-native-flags'
import { Card } from 'react-native-elements'
import { DataTable, ActivityIndicator, Title } from 'react-native-paper'
import Charts from './Charts'

export default class Country extends Component {
    commas = (x) => {
        return x !== 0 ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ''
    }
    render() {
        let country = this.props.countryData
        let last5Days = [...this.props.last5Days]
        return (
            <View style={styles.container}>
                <Card title={(
                    <View style={styles.cardTitle}>
                        <Flag code={country.countryCode} size={48} />
                        <Text style={[styles.title, { marginLeft: 10, color: 'black' }]}>{country.country}</Text>
                    </View>)} containerStyle={{ borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.casesView}>
                            <Text style={styles.casesText}>Vaka</Text>
                            <Text style={styles.casesText}>
                                {this.commas(country.totalConfirmed)}
                            </Text>
                            <Text style={[styles.casesText, { color: '#000000', fontSize: 14 }]}>
                                {country.dailyConfirmed ? '+' + this.commas(country.dailyConfirmed) : ''}
                            </Text>
                        </View>
                        <View style={styles.casesView}>
                            <Text style={[styles.casesText, { color: '#ff4444' }]}>Ölüm</Text>
                            <Text style={[styles.casesText, { color: '#ff4444' }]}>
                                {this.commas(country.totalDeaths)}
                            </Text>
                            <Text style={[styles.casesText, { color: '#000000', fontSize: 14 }]}>
                                {country.dailyDeaths ? '+' + this.commas(country.dailyDeaths) : ''}
                            </Text>
                        </View>
                        <View style={styles.casesView}>
                            <Text style={[styles.casesText, { color: '#00C851' }]}>İyileşen</Text>
                            <Text style={[styles.casesText, { color: '#00C851' }]}>
                                {this.commas(country.totalRecovered)}
                            </Text>
                        </View>
                    </View>
                </Card>
                <Text style={styles.title}>Oranlar</Text>{country.countryCode === ('IN') ? <></> :
                    <Charts countryData={country} last5Days={last5Days} chart={this.props.chart}
                        barChart={this.props.barChart} />
                }
                <View>
                    <Text style={styles.title}>Günlük Veriler</Text>
                    {last5Days.length === 0 ? <ActivityIndicator color='darkslategray' size={50}
                        style={{ marginTop: 20 }} /> : (
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Tarih</DataTable.Title>
                                    <DataTable.Title numeric>Vaka</DataTable.Title>
                                    <DataTable.Title numeric>Ölüm</DataTable.Title>
                                    <DataTable.Title numeric>İyileşen</DataTable.Title>
                                </DataTable.Header>
                                {last5Days.map((l, i) => (
                                    <DataTable.Row key={i} style={i % 2 === 0 ?
                                        { backgroundColor: 'rgba(91, 192, 222, 0.1)' } : ''}>
                                        <DataTable.Cell>
                                            {new Date((new Date(l.last_updated).getTime() - 24 * 60 * 60 * 1000)).toLocaleDateString()}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={{ color: 'darkcyan' }}>{this.commas(l.new_infections)}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={{ color: 'red' }}>{this.commas(l.new_deaths)}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={{ color: 'green' }}>{this.commas(l.new_recovered)}</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        )}
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 0.75,
        marginBottom: 20
    },
    title: {
        textAlignVertical: 'center',
        fontSize: 18,
        marginLeft: 20,
        letterSpacing: 2,
        color: 'darkslategray',
        fontWeight: '500'
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
    },
    casesView: {
        width: '33.3%',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.25)',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    },
    casesText: {
        color: '#0099CC',
        fontSize: 15,
        fontWeight: '700'
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 1.5,
        paddingLeft: 10
    }
})