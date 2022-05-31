import { useState } from "react"
import { ProductList } from "./ProductList"
import { ProductSearch } from "./ProductSearch"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [userSearch, setUserSearch] = useState(false)
    
    return <>
        <ProductSearch setterFunction = {setSearchTerms} setSearch = {setUserSearch}/>
        <ProductList searchTermState = {searchTerms} userSearch = {userSearch} setSearchTerms = {setSearchTerms}/>
        
    </>
}