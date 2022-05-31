import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCustomers, getAllUsers, getCustomerPurchases, getPurchases } from "../ApiManager"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [purchases, setPurchases] = useState([])

    let navigate = useNavigate()

    useEffect(
        () => {
            getAllCustomers(setCustomers)
        },
        []
    )

    useEffect(
        () => {
            getPurchases(setPurchases)
        },
        []
    )

    
    const userQuantity = (customer) => {
        let quantity = 0
        let filtered = []

        purchases.map(purchase => {
            if(purchase.customerId === customer.id) {
                filtered.push(purchase)
            }
        })
        console.log(filtered)
                
        filtered.map(purchase =>  {
            quantity = quantity + purchase.quantity
        })

        return quantity
    }

    return <>
    <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}  
                customerObj={customer}
                quantity={userQuantity(customer)}
                />)
        }
    </article> </>
}