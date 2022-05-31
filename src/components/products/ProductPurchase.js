import { useEffect, useState } from "react";

export const ProductPurchase = ({id, customerId}) => {

        // TODO: Create the object to be saved to the API

        const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
        
       const handleSaveButtonClick = () => {
        let today = new Date();
        let date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' at '+time;

        const newPurchase = {
            customerId: customerId,
            productId: id,
            quantity: 1,
            date: dateTime
        }

        // TODO: Perform the fetch() to POST the object to the API
        fetch('http://localhost:8088/purchases', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Product purchased!")
            })
        }

    return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
            <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Purchase
        </button>
        </>
}