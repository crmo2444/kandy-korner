import { useEffect, useState } from "react"

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
            fetch(`http://localhost:8088/purchases?_expand=product`)
            .then(response => response.json())
            .then((purchasesArray) => {
                setPurchases(purchasesArray)
            }) // View the initial state of userPurchases
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
            .then(response => response.json())
            .then((productsArray) => {
                setProducts(productsArray)
            }) // View the initial state of userPurchases
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((usersArray) => {
                setUserList(usersArray)
                let currentUser = usersArray.find(user => kandyUserObject.id === user.id)   
                setCurrentUser(currentUser) 
            }) // View the initial state of userPurchases

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