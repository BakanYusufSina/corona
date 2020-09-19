import React, { Component } from 'react'
import { ProgressCircle, StackedAreaChart, BarChart, Grid, LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View, Text, StyleSheet } from 'react-native'
import { ForeignObject } from 'react-native-svg'

export default class Charts extends Component {
    render() {
        const colors = ['#0099CC', '#ff4444', '#00ff00']
        const keys = ['confirmed', 'death', 'recovered']
        let countryData = this.props.countryData
        let chartData = [...this.props.chart]
        return (
            <View style={{ flex: 2 }}>
                <View style={styles.container}>
                    <View style={{ width: '50%' }}>
                        <ProgressCircle style={{ height: 100 }} progress={countryData.FR / 100} progressColor={'rgb(250, 10, 10)'}
                            animate={true}>
                            <ForeignObject x={-20} y={-15}>
                                <View style={styles.progressCircleContentContainer}>
                                    <Text style={styles.text}>Ölüm</Text>
                                    <Text style={{ fontWeight: '700' }}>{"\n%" + Number(countryData.FR).toFixed(2)}</Text>
                                </View>
                            </ForeignObject>
                        </ProgressCircle>
                    </View>
                    <View style={{ width: '50%' }}>
                        <ProgressCircle style={{ height: 100 }} progress={countryData.PR / 100} progressColor={'rgb(10, 250, 10)'}
                            animate={true}>
                            <ForeignObject x={-25} y={-15}>
                                <View style={styles.progressCircleContentContainer}>
                                    <Text style={[styles.text, { color: 'green' }]}>İyileşme</Text>
                                    <Text style={{ fontWeight: '700' }}>
                                        {"\n%" + Number(countryData.PR).toFixed(2)}
                                    </Text>
                                </View>
                            </ForeignObject>
                        </ProgressCircle>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <StackedAreaChart
                        style={{ height: 150, paddingVertical: 20 }}
                        data={chartData}
                        keys={keys}
                        colors={colors}
                        curve={shape.curveNatural}
                        showGrid={false}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Text><Text style={{ color: '#0099CC', fontWeight: '700', fontSize: 20 }}>-</Text>Vaka</Text>
                        <Text style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#ff4444', fontWeight: '700', fontSize: 20 }}>-</Text>Ölüm
                            </Text>
                        <Text style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#00ff00', fontWeight: '700', fontSize: 20 }}>-</Text>İyileşen
                            </Text>
                    </View>
                    {/*
                    <BarChart style={{ height: 200, width: '100%' }} data={[...this.props.barChart]}
                        svg={{ fill: 'rgba(200, 25, 30)' }} contentInset={{ top: 30, bottom: 30 }}>
                        <Grid />
                    </BarChart>
                    <LineChart
                        style={{ height: 200 }}
                        data={this.props.barChart}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
                    */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10
    },
    progressCircleContentContainer: {
        alignItems: 'center',
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 15,
        color: 'tomato'
    },
});