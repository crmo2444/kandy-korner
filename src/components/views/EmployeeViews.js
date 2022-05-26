
import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { EmployeeList } from "../employees/EmployeeList"
import { LocationList } from "../locations/LocationList"
import { EmployeeForm } from "../employees/EmployeeForm"
import { ProductList } from "../products/ProductList"
import { ProductForm } from "../products/ProductForm"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductList /> } />
                <Route path="product/create" element={ <ProductForm /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
                <Route path="employees/create" element={ <EmployeeForm /> } />
            </Route>
        </Routes>
    )
}