import { Link, useNavigate } from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { CustomerNavBar } from "./CustomerNav"
import { EmployeeNavBar } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.staff) {
        return (
            <EmployeeNavBar />
        )
    }
    else {
        return (
            <CustomerNavBar />
        )
    }
}

