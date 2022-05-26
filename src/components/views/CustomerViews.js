
import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { ProductContainer } from "../products/ProductContainer"
import { ProductList } from "../products/ProductList"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />
                <Route path="products" element={ <ProductContainer /> } />
            </Route>
        </Routes>
    )
}