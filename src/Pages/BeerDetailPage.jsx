import React, { useState, useEffect } from "react";
import BeersService from "../Services/BeersService";
import { useParams } from "react-router-dom";
import ModifyBeerComponent from "../Components/ModifyBeerComponent"



const BeerDetail = () => {
    const [beers, setBeers] = useState([])
    const [isModifyBeerModalOpen, setIsModifyBeerModalOpen] = useState(false)
    const { id } = useParams();

    const fetchBeer = async () => {
        try {
            const response = await BeersService.getBeersById(id);
            setBeers(response.data)
        } catch (error) {
            console.error(error)
        }
    };

    const handleUpdateBeer = (updatedBeerData) => {
        setBeers(updatedBeerData);
        setIsModifyBeerModalOpen(false);
    };

    useEffect(() => {
        fetchBeer();
    }, [id]);

    return (<>
        <div className="container-beer-detail">
            <div className="txt-beer-detail">
                <h1>infos</h1>
                <div className="line"></div>
                <h2>{beers.brand}</h2>
                {/* <h3>{beers.style}</h3> */}
                <h3>{beers.country?.name}</h3>
                <h4>{beers.quantity}</h4>
                <div className="beer-bars">
                    <h5>Trouvez-là ici 👇</h5>
                    {beers.bars?.map((bar, index) => (
                        <div key={index}>{bar.name}</div>
                    ))}
                </div>
                <button onClick={() => setIsModifyBeerModalOpen(true)}>Modifier cette bière</button>
            </div>
        </div>
        {isModifyBeerModalOpen && (
            <ModifyBeerComponent
                isOpen={isModifyBeerModalOpen}
                onClose={() => setIsModifyBeerModalOpen(false)}
                beers={beers}
                onUpdateBeer={handleUpdateBeer}
            />
        )}
    </>);
}

export default BeerDetail;