import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeeDetails } from "../ApiManager"

export const EmployeeDetails = () => {
    //only displays when route = employee/:employeeId (some number)
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState({})


    useEffect(
        () => {
            getEmployeeDetails(employeeId, updateEmployee)
        },
        [employeeId]
    )

    return <> <section className="employee">
                    <header className="employee__header">{employee?.user?.name}</header>
                    <div>Email: {employee?.user?.email}</div>
                    <div>Start Date: {employee.startDate}</div>
                    <div>Rate: {employee.payRate}</div>
                    <div>Currently working at {employee?.location?.address}.</div>
        </section> </>
}