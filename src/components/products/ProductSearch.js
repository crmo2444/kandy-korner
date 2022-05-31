export const ProductSearch = ({setterFunction, setSearch}) => {
    return (
        <div>
            <input 
                type="text" 
                placeholder="Search..."
                onChange={
                    (changeEvent) => {
                        let search = changeEvent.target.value
                        setterFunction(search)
                    }   
                }/>
        </div>
    )
}