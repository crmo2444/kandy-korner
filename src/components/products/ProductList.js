import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts, getProductTypes } from "../ApiManager"
import { ProductPurchase } from "./ProductPurchase"
import "./Products.css"

export const ProductList = ({searchTermState, userSearch, setSearchTerms}) => {
    const [products, setProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])
    const [sortedProducts, setSorted] = useState([])
    const [overTwo, setOverTwo] = useState(false)
    
    let navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            const searchedProducts = products.filter(product => 
                product.name.toLowerCase().startsWith(searchTermState.toLowerCase()))
            setSorted(searchedProducts)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            getProducts(setProducts) // View the initial state of products
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            getProductTypes(setProductTypes)// View the initial state of products
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            let newProducts = products.sort((a, b) => a.name.localeCompare(b.name))
            setSorted(newProducts)
        },
        [products]
    )

    useEffect(
        () => {
            if (overTwo) {
                let overTwoProducts = products.filter(product => product.price >= 2.00)
                setSorted(overTwoProducts)
            }
            else {
                setSorted(products)
            }
        },
        [overTwo]
    )

    return <>
        {kandyUserObject.staff ? <>
        <button onClick={() => navigate("/product/create")}>Create Product</button>
        <button onClick={() => {setOverTwo(true)}}>Top Priced</button>
        <button onClick={() => {setOverTwo(false)}}>Show All</button> 
        </> :
        <button onClick={() => {setSearchTerms("")}}>Show All</button>}



    <h2>List of Products</h2>
    <article className="products">
        {
            sortedProducts.map((product) => {
                let type
                if(product.productTypeId === 1) {
                    type = "Chocolate"
                }
                else if (product.productTypeId === 2) {
                    type = "Gummy"
                }
                else if (product.productTypeId === 3) {
                    type = "Hard candy"
                }

                return <section className="product" key={`product--${product.id}`}>
                    {kandyUserObject.staff ? <>
                    <header>Name: {product.name} <br></br>
                    Price: ${product.price} <br></br>
                    Type: {type} </header> 
                    </>:
                    <>
                    <header>Name: {product.name} <br></br>
                    Price: ${product.price} <ProductPurchase 
                    id={product.id}
                    customerId={kandyUserObject.id} /></header>
                    </> 
                    }
                </section>
            })
        }
    </article>
    </>
}