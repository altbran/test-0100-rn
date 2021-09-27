import React from 'react'
import { View, Text } from 'react-native'
import { Button, Card, Paragraph, Title } from 'react-native-paper'

function Error({ message }) {
    return (
        <View>
            <Card>
                <Card.Content>
                    <Title>Error</Title>
                    <Paragraph>{message}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    )
}

export default Error
