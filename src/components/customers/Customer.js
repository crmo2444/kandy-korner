import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCustomerPurchases, getPurchases } from "../ApiManager"

export const Customer = ({customerObj, quantity}) => {
    return <><section className="employee">
                    <div>
                        <Link to={`/customers/${customerObj.id}`}>{customerObj.name}</Link>
                    </div>
                    <div>Email: {customerObj.email}</div>
                    <div>Candies Purchased: {quantity}</div>
                </section></>
}