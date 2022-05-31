import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEmployees } from "../ApiManager"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    let navigate = useNavigate()

    useEffect(
        () => {
            getEmployees(setEmployees)
        },
        []
    )

    return <>
    <button onClick={() => navigate("/employees/create")}>Add New Employee</button>
    <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}  
                id={employee.id} 
                name={employee.name} 
                email={employee.email} 
                setterFunc={setEmployees}
                />)
        }
    </article> </>
}