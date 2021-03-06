import { useEffect, useState } from "react"
import { getLocations } from "../ApiManager"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            getLocations(setLocations) // View the initial state of locations
        },
        [] // When this array is empty, you are observing initial component state
    )
    
    return <>
    <h2>List of Locations</h2>
    <article className="locations">
        {
            locations.map((location) => {
                return <section className="location" key={`location--${location.id}`}>
                    <header>Store Address: {location.address} <br></br>
                    Square Footage: {location.squareFt}</header>
                </section>
            })
        }
    </article>
    </>
}