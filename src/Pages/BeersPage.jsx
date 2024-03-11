import React, { useEffect, useState } from "react";
import BeersService from "../Services/BeersService";
import BeerComponent from "../Components/BeerComponent";
import AddBeerComponent from "../Components/AddBeerComponent"


const Beers = () => {
    const [beers, setBeers] = useState([])
    const [isAddBeerModalOpen, setIsAddBeerModalOpen] = useState(false)

    const fetchBeer = async () => {
        try {
            const response = await BeersService.getBeers();
            setBeers(response.data)
            console.log(response)
        } catch {

        }
    };
    useEffect(() => {
        fetchBeer();
    }, []);

    return (<>
        <div className="container-beer">
            <h1>Beers & Co</h1>
            <button onClick={() => setIsAddBeerModalOpen(true)}>Ajouter une nouvelle bière</button>
            {beers.map((beer) => {
                return (
                    <BeerComponent key={beer.id} {...beer} />
                );
            })}
        </div>
        {isAddBeerModalOpen && (
            <AddBeerComponent
                isOpen={isAddBeerModalOpen}
                onClose={() => setIsAddBeerModalOpen(false)}
            />
        )}
    </>);
}

export default Beers;