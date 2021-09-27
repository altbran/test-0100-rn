import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';
import DetailElement from '../components/DetailElement';
import Error from '../components/Error';
import Line from '../components/Line';
import useOrderProducts from "../hooks/useOrderProducts";

function OrderProducts({ route }) {
    const { products, feedback } = useOrderProducts(route.params.orderID);

    if (feedback.hasError) {
        return <Error message={feedback.message}/>
    }

    const renderContent = () => {
        return feedback.loading
            ? renderLoader()
            : renderList()
    }

    const renderList = () => {
        const subtotal = products.reduce(getSubtotal, 0);
        const discounts = products.reduce(getDiscounts, 0);
        return (
            <View style={styles.container}>
                <Title style={styles.title}>Order N° {route.params.orderID}</Title>
                {products.map((product) => {
                    return (<DetailElement key={product.ProductID} title={product.Product.ProductName} value={product.UnitPrice * product.Quantity}/>)
                })}
                <Line />
                <DetailElement title={'Subtotal'} value={subtotal}/>
                <DetailElement title={'Discounts'} value={discounts}/>
                <Line />
                <DetailElement title={'Total'} value={subtotal - discounts}/>
            </View>
        )
    }

    const renderLoader = () => {
        return <>
            <ActivityIndicator animating={true} size={'large'} />
        </>
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderContent()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    title: {
        marginBottom: 5
    }
});

function getSubtotal(total, product) {
    return total + (product.UnitPrice * product.Quantity);
}

function getDiscounts(total, product) {
    return total + product.Discount;
}

export default OrderProducts;