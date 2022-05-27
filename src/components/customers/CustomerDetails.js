
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CustomerDetails = () => {
    //only displays when route = customer/:customerId (some number)
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})
    const [editButton, editButtonState] = useState(false)

    let navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/customers/${customerId}`)
            })
    }


    return <> <section className="customer">
                    <header className="customer__header">{customer?.user?.name}</header>
                    <div>Email: {customer?.user?.email}</div>
                    { editButton ? 
                    <><form className="editLoyalty">
                            <fieldset>
                                <div className="form-group">
                                <label htmlFor="loyaltyNum">Loyalty #</label>
                                <input
                                    required autoFocus
                                    type="number"
                                    className="form-control"
                                    value={customer.loyaltyNumber}
                                    onChange={
                                        (event) => {
                                            const copy = {...customer}
                                            copy.loyaltyNumber = parseInt(event.target.value)
                                            updateCustomer(copy)
                                        }
                        } />
                                </div>
                            </fieldset>
                    </form>
                    <button
                        onClick={(clickEvent) =>  {
                            handleSaveButtonClick(clickEvent)
                            editButtonState(false)
                        }}
                        className="btn btn-primary">
                        Save
                    </button></> : <>
                    <div>Loyalty #{customer.loyaltyNumber}<button onClick={() => {editButtonState(true)}}>Edit Loyalty Number</button></div> 
                    </>}
        </section> </>
}