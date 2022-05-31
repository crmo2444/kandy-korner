import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveNewProduct } from "../ApiManager"

export const ProductForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [product, update] = useState({
        productTypeId: "",
        name: "",
        price: ""
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the product list
    */
   let navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        let productToSendToAPI = {
            productTypeId: product.productTypeId,
            name: product.name,
            price: parseFloat(product.price).toFixed(2)
        }

        // TODO: Perform the fetch() to POST the object to the API
        saveNewProduct(productToSendToAPI, navigate)
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Service product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productTypeId">Candy Type: &#40;Input 1 for Chocolate, 2 for Gummy, 3 for Hard Candy&#41;</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={product.productTypeId}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                if (parseInt(event.target.value) > 3 || parseInt(event.target.value) < 1) {
                                    window.alert("Candy Type value must be 1, 2, or 3.")
                                }
                                else {
                                    copy.productTypeId = parseInt(event.target.value)
                                    update(copy)
                                }
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        required autoFocus 
                        type="text"
                        className="form-control"
                        value={product.name}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Product Price:</label>
                    <input
                        required autoFocus 
                        type="text"
                        className="form-control"
                        value={product.price}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.price = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={(clickEvent) => 
                handleSaveButtonClick(clickEvent)
            }
            className="btn btn-primary">
                Submit product
            </button>
        </form>
    )
}