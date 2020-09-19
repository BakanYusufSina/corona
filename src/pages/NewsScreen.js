import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Linking, RefreshControl } from 'react-native'
import Axios from 'axios'
import { ActivityIndicator, Card, Title, Paragraph, Divider } from 'react-native-paper'

export default class NewsScreen extends Component {
    constructor() {
        super()
        this.state = {
            news: [],
            refreshing: false
        }
    }
    getNews = () => {
        Axios({
            method: 'GET',
            url: 'http://api.coronatracker.com/news/trending?limit=14',
            withCredentials: true
        })
            .then(res => this.setState({ news: res.data.items }))
    }
    componentDidMount() {
        this.getNews()
    }
    onRefresh = () => {
        this.setState({ refreshing: false })
    }
    render() {
        let news = [...this.state.news]
        if (news.length === 0) return <ActivityIndicator size={60} color={'darkslategray'} />
        return (
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
            }>
                <View style={styles.container}>
                    <Title>Haberler</Title>
                    <Divider style={{ marginBottom: 5, backgroundColor: 'darkslategray' }} />
                    {news.map((l, i) => (
                        <Card key={i} style={{ borderRadius: 2, marginBottom: 5 }}>
                            <Card.Cover source={{ uri: l.urlToImage }} />
                            <Card.Content>
                                <Title>{l.title}</Title>
                                <Paragraph>{l.description}</Paragraph>
                                <Text style={{ textAlign: 'right' }}>{l.author}</Text>
                                <Text onPress={() => { Linking.openURL(l.url) }}
                                    style={{ textAlign: 'left', color: 'darkslategray' }}>Sayfayı ziyaret et</Text>
                            </Card.Content>
                        </Card>
                    ))}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        alignContent: 'center',
        backgroundColor: 'white'
    }
})