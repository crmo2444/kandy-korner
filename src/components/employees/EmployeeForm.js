import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEmployees, saveNewEmployee } from "../ApiManager"

export const EmployeeForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
   const [users, getUsers] = useState()

    const [user, update] = useState({
        name: "",
        email: "",
        isStaff: true
    })

    const [employee, updateEmployee] = useState({
        startDate: "",
        payRate: "",
        storeId: "",
        userId: ""
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the employee list
    */
   let navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            getEmployees(getUsers)
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        let userToSendToAPI = {
            name: user.name,
            email: user.email,
            isStaff: user.isStaff
        }

        // TODO: Perform the fetch() to POST the object to the API
        saveNewEmployee(userToSendToAPI, navigate, employee)

    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.name}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        required autoFocus 
                        type="text"
                        className="form-control"
                        value={user.email}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.email = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date: &#40;yyyy-mm-dd&#41;</label>
                    <input
                        required autoFocus 
                        type="text"
                        className="form-control"
                        value={employee.startDate}
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.startDate = event.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay Rate:</label>
                    <input
                        required autoFocus 
                        type="text"
                        className="form-control"
                        value={employee.payRate}
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.payRate = event.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Location: &#40;Input 1 for 100 Main St, 2 for 101 Main St, 3 for 102 Main St&#41;</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={employee.locationId}
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                if (parseInt(event.target.value) > 3 || parseInt(event.target.value) < 1) {
                                    window.alert("Value must be 1, 2, or 3.")
                                }
                                else {
                                    copy.locationId = event.target.value
                                    updateEmployee(copy)
                                }
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={(clickEvent) => 
                handleSaveButtonClick(clickEvent)
            }
            className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}