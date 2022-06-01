import { useEffect, useState } from "react"
import { getProducts, getPurchases, getUsersAndCurrent } from "../ApiManager"

export const PurchaseList = ({id, customerId}) => {

    const [purchases, setPurchases] = useState([])
    const [userPurchases, setUserPurchase] = useState([])
    const [usersList, setUserList] = useState([])
    const [loggedInUser, setCurrentUser] = useState([])
    const [products, setProducts] = useState([])
    const [updatedPurchases, setQuantityPerProduct] = useState([])

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

    useEffect(
        () => {
            const categorizedPurchases = new Map()

            userPurchases.map(userPurchase => {
                let object = JSON.stringify(userPurchase.product.price + ':' + userPurchase.product.name)
                if (categorizedPurchases.has(object)) {
                    categorizedPurchases.set(object, categorizedPurchases.get(object) + 1)
                }
                else {
                    categorizedPurchases.set(object, 1)
                }
            })

            const categorizedPurchasesArray = Array.from(categorizedPurchases, ([key, value]) => {
                return {product: JSON.parse(key),
                        quantity: value};
              });

            setQuantityPerProduct(categorizedPurchasesArray)

        },
        [userPurchases]
    )

    let counter = 0
    let splitString
    let firstHalf
    let secondHalf
    let totalTotal = 0
    
    return <>
    <h2>Purchase History for {loggedInUser.name}</h2>
    <article className="products">
    {  userPurchases.length !== 0 ? 
            <>  
            {updatedPurchases.map((userPurchase) => {
                counter++
                splitString = userPurchase.product.split(":")
                firstHalf = splitString[0]
                secondHalf = splitString[1]
                totalTotal += (firstHalf * userPurchase.quantity)
                    return <section className="product" key={`product--${userPurchase.id}`}>
                        <>
                        <div>Order #{counter}</div>
                        <div>Product: {secondHalf}</div>
                        <div>Quantity: {userPurchase.quantity}</div>
                        <div>Total Price: {(firstHalf * userPurchase.quantity).toLocaleString('en-US', {style:'currency', currency:'USD'})}</div>
                        </> 
                    </section>
             })} </> : <div>No orders placed.</div>
    }
    </article>

    <h3>Total Price of Purchases: {totalTotal.toLocaleString('en-US', {style:'currency', currency:'USD'})}</h3>
    </>
}