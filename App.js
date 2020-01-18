import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    title: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to React Native!</Text>
        </View>
    );
}
