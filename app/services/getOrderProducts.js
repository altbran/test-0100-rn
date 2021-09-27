import axios from 'axios';
import { API_URL } from '../../env';


export default function getOrderProducts(orderID) {
    return axios.get(API_URL + '/orders/' + orderID + '/products', {timeout: 5000})
    .then((response)=>{
        return response.data;
    })
    .catch((error)=>{
        let err = new Error();

        if (error.response) {
            err.name = error.response.status;
            err.message = error.response.data;
        } else {
            err.message = "Connection error. Verify internet connection."
            err.name = "Connection"
        }

        throw err;
    })
}