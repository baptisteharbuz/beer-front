import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import BeersService from "../Services/BeersService";
import CountriesService from "../Services/PaysService"
import { toast } from 'react-toastify';
import Select from 'react-select';
import BarsService from "../Services/BarsService"

const ModifyBeer = ({ isOpen, onClose, beers }) => {

    const [brand, setBrand] = useState(beers.brand || "");
    const [style, setStyle] = useState(beers.style || "");
    const [countryId, setCountryId] = useState('');
    const [quantity, setQuantity] = useState(beers.quantity || "");
    const [countries, setCountries] = useState([])
    const [bars, setBars] = useState([]);
    const [selectedBars, setSelectedBars] = useState([]);

    const fetchCountriesAndBars = async () => {
        try {
            const countriesResponse = await CountriesService.getCountry();
            setCountries(countriesResponse.data);

            const barsResponse = await BarsService.getAllBars();
            setBars(barsResponse.data);
            const selectedBarIds = beers.bars.map(bar => bar.id);
            setSelectedBars(selectedBarIds);
        } catch (e) {
            console.log(e);
        }
    };

    const modifyBeer = (b) => {
        b.preventDefault();
        const newdata = {
            brand: brand,
            style: style,
            country_id: countryId,
            quantity: quantity,
            bars: selectedBars,
        }
        console.log(newdata)
        BeersService.modifyBeer(beers.id, newdata)
            .then(response => {
                toast.success('Santé !', response)
                onClose();
            })
            .catch(error => {
                toast.error('Oh non, quelque chose ne va pas !', error)
            });
    };


    useEffect(() => {
        fetchCountriesAndBars();
    }, []);


    const handleBarSelectionChange = (barId) => {
        setSelectedBars(prevSelectedBars =>
            prevSelectedBars.includes(barId)
                ? prevSelectedBars.filter(id => id !== barId)
                : [...prevSelectedBars, barId]
        );
    };

    return (<>
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className="container-add-beer">
                <h1>Modifier cette bière</h1>
                <form onSubmit={modifyBeer} className="form-add-beer">
                    <div>
                        <label htmlFor="marque">Marque :</label>
                        <input type="text" id="marque" value={brand} onChange={(b) => setBrand(b.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="style">Style :</label>
                        <input type="text" id="style" value={style} onChange={(b) => setStyle(b.target.value)} />
                    </div>
                    <div>
                        <Select
                            name="country"
                            value={countries.find(c => c.id === countryId) || ''}
                            onChange={(selectedOption) => setCountryId(selectedOption ? selectedOption.value : '')}
                            options={countries.map((c) => ({
                                value: c.id,
                                label: c.name,
                            }))}
                        />
                    </div>
                    <div className="scroll-bars">
                        {bars.map(bar => (
                            <div key={bar.id}>
                                <input
                                    type="checkbox"
                                    id={`bar-${bar.id}`}
                                    checked={selectedBars.includes(bar.id)}
                                    onChange={() => handleBarSelectionChange(bar.id)}
                                />
                                <label htmlFor={`bar-${bar.id}`}>{bar.name}</label>

                            </div>
                        ))}
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantité :</label>
                        <input type="number" id="quantity" value={quantity} onChange={(b) => setQuantity(b.target.value)} />
                    </div>
                    <button type="submit">Modifier</button>
                </form>
                <button onClick={onClose}>Fermer</button>
            </div>
        </Modal>
    </>);
}

export default ModifyBeer;