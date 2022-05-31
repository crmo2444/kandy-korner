import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCustomers } from "../ApiManager"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    let navigate = useNavigate()

    useEffect(
        () => {
            getAllCustomers(setCustomers)
        },
        []
    )

    return <>
    <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}  
                id={customer.id} 
                name={customer.name} 
                email={customer.email} 
                />)
        }
    </article> </>
}