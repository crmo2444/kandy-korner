import { useEffect, useState } from "react"
import { deleteEmployee } from "../ApiManager"

export const EmployeeDelete = ({id, setEmployees}) => {


    const handleDeleteButtonClick = () => {
        deleteEmployee(id, setEmployees)
    }

    return <>
        <button
        onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
        className="btn btn-primary">
        Fire
    </button>
    </>
}