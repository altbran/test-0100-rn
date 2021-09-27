import { useEffect, useState } from "react";
import getOrders from "../services/getOrders";

export default function useOrders() {

    const [feedback, setFeedback] = useState({
        hasError: false,
        loading: false,
        message: ''
    });

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        setFeedback({
            ...feedback,
            loading: true
        });

        getOrders()
            .then((response) => {
                setFeedback({
                    hasError: false,
                    loading: false,
                    message: ''
                })
                setOrders(response)
            })
            .catch((error) => {
                let newMessage = "";
                if (error.name !== "Connection") {
                    switch (error.name) {
                        case 500:
                            newMessage = "Connection error. Verify internet connection."
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
                    message: newMessage
                });
            })

    }, []);

    return { orders, feedback };
}
