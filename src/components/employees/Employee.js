import { Link } from "react-router-dom"
import { EmployeeDelete } from "./EmployeeDelete"

export const Employee = ({id, name, email, setterFunc}) => {
    return <section className="employee">
                    <div>
                        <Link to={`/employees/${id}`}>{name}</Link>
                    </div>
                    <div>Email: {email}</div>
                    <EmployeeDelete id={id} setEmployees={setterFunc}/>
                </section>
}