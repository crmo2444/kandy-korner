import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    let navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
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
                />)
        }
    </article> </>
}