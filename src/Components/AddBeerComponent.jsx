import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import BeersService from "../Services/BeersService";
import { toast } from 'react-toastify';
import CountriesService from "../Services/PaysService"
import Select from 'react-select';

const AddBeer = ({ isOpen, onClose }) => {

    const [brand, setBrand] = useState('');
    const [style, setStyle] = useState('');
    const [countryId, setCountryId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [countries, setCountries] = useState([])


    const fetchCountries = async () => {
        try {
            const response = await CountriesService.getCountry();
            setCountries(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    const addBeer = (b) => {
        b.preventDefault();
        const newBeer = {
            brand: brand,
            style: style,
            country_id: countryId,
            quantity: quantity,
        }
        console.log(newBeer)
        BeersService.addBeer(newBeer)
            .then(response => {
                toast.success('Santé !', response)
                onClose();
            })
            .catch(error => {
                toast.error('Oh non, quelque chose ne va pas !', error)
            });
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (<>
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className="container-add-beer">
                <h1>Ajouter une nouvelle bière</h1>
                <form onSubmit={addBeer} className="form-add-beer">
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
                    <div>
                        <label htmlFor="quantity">Quantité :</label>
                        <input type="number" id="quantity" value={quantity} onChange={(b) => setQuantity(b.target.value)} />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
                <button onClick={onClose}>Fermer</button>
            </div>
        </Modal>
    </>);
}

export default AddBeer;
