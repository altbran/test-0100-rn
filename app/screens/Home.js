import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import useOrders from '../hooks/useOrders';
import { format } from 'date-fns'
import Error from '../components/Error';


function Home({navigation}) {

    const { orders, feedback } = useOrders();

    if (feedback.hasError) {
        return <Error message={feedback.message}/>
    }

    const renderContent = () => {
        return feedback.loading
            ? renderLoader()
            : renderList()
    }

    const renderList = () => {
        return (
            <View >
                <DataTable >
                    <DataTable.Header>
                        <DataTable.Title>CustomerID</DataTable.Title>
                        <DataTable.Title>ShippedDate</DataTable.Title>
                        <DataTable.Title>ShipCity</DataTable.Title>
                        <DataTable.Title>ShipCountry</DataTable.Title>
                    </DataTable.Header>
                    <ScrollView>
                        {orders.map((order) => {
                            return (
                                <TouchableOpacity key={order.OrderID} onPress={() => navigation.navigate('Order Products Details', {orderID: order.OrderID})}>
                                    <DataTable.Row>
                                        <DataTable.Cell>{order.CustomerID}</DataTable.Cell>
                                        <DataTable.Cell>{getDateFormatted(order.ShippedDate)}</DataTable.Cell>
                                        <DataTable.Cell>{order.ShipCity}</DataTable.Cell>
                                        <DataTable.Cell>{order.ShipCountry}</DataTable.Cell>
                                    </DataTable.Row>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </DataTable>
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

function getDateFormatted(date) {
    const tempDate = new Date(date);
    return format(new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate()), 'dd/MM/yyyy');
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingBottom: 70
    }
});
export default Home;