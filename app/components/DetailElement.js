import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Subheading, Text } from 'react-native-paper'


export default function DetailElement({title, value}) {
    return (
        <View style={styles.view}>
            <Subheading>{title}</Subheading>
            <Text>${parseFloat(value).toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 3
    }
});