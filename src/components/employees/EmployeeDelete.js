import { useEffect, useState } from "react"

export const EmployeeDelete = ({id, setEmployees}) => {


    const handleDeleteButtonClick = () => {
        fetch(`http://localhost:8088/users/${id}`, { method: "DELETE" })
        .then(
            () => {
                fetch(`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                .then((employees) => {
                    setEmployees(employees)
                })
            }
        )
    }

    return <>
        <button
        onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
        className="btn btn-primary">
        Fire
    </button>
    </>
}