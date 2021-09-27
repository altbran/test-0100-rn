import { useEffect, useState } from "react";
import getOrderProducts from "../services/getOrderProducts";

export default function useOrderProducts(orderID) {

    const [feedback, setFeedback] = useState({
        hasError: false,
        loading: false,
        message: ''
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setFeedback({
            ...feedback,
            loading: true
        });
        getOrderProducts(orderID)
            .then((response) => {
                setFeedback({
                    hasError: false,
                    loading: false,
                    message: ''
                })
                setProducts(response)
            })
            .catch((error) => {
                let newMessage = "";
                if (error.name !== "Connection") {
                    switch (error.name) {
                        case 500:
                            newMessage = "Connection error. Verify internet connection."
                            break;
                        case 404:
                            newMessage = "Could not find resource.";
                            break;
                        default:
                            newMessage = "Something went wrong. State: " + error.name;
                    }
                } else {
                    newMessage = error.message;
                }
                setFeedback({
                    hasError: true,
                    loading: false,
                    message: newMessage,
                });
            })

    }, []);

    return { products, feedback };
}
