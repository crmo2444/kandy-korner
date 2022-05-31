import { useEffect, useState } from "react"
import { getProducts, getPurchases, getUsersAndCurrent } from "../ApiManager"

export const PurchaseList = ({id, customerId}) => {

    const [purchases, setPurchases] = useState([])
    const [userPurchases, setUserPurchase] = useState([])
    const [usersList, setUserList] = useState([])
    const [loggedInUser, setCurrentUser] = useState([])
    const [products, setProducts] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            getPurchases(setPurchases) // View the initial state of userPurchases
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            getProducts(setProducts) // View the initial state of userPurchases
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            getUsersAndCurrent(setUserList, setCurrentUser, kandyUserObject)// View the initial state of userPurchases

        },
        [] // When this array is empty, you are observing initial component state
    )
    
    useEffect(
        () => {
            let userPurchaseArray = purchases.filter(purchase => kandyUserObject.id === purchase.customerId)
            setUserPurchase(userPurchaseArray)
        },
        [purchases]
    )
    
    let counter = 0

    return <>
    <h2>Purchase History for {loggedInUser.name}</h2>
    <article className="products">
    {  userPurchases.length !== 0 ? <> 
            {userPurchases.map((userPurchase) => {
                counter++
                    return <section className="product" key={`product--${userPurchase.id}`}>
                        <>
                        <div>Order #{counter}</div>
                        <div>Product: {userPurchase?.product?.name}</div>
                        <div>Quantity: {userPurchase.quantity}</div>
                        <div>Total Price: ${userPurchase?.product?.price}</div>
                        <div>Date Placed: {userPurchase.date}</div>
                        </> 
                    </section>
             })} </> : <div>No orders placed.</div>
    }

    </article>
    </>
}