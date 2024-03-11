import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import BeersService from "../Services/BeersService";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { RiBeerFill } from "react-icons/ri";

const ArticlePage = ({ id, brand, style, quantity, country }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteBeer = async () => {
        try {
            await BeersService.deleteBeerById(id);
            toast.success("Cette bière a bien été supprimée");
            closeModal();
        } catch (error) {
            toast.error("Une erreur est survenue lors de la suppression");
        }
    };


    return (
        <>
            <div className="container-card-beer">
                <Link to={`/beers/${id}`}>
                    <div className="details">
                        <RiBeerFill />
                        <p>plus de détails</p>
                    </div>
                </Link>
                <div className="card-beer">
                    <div className="card-left">
                        <div>{brand}</div>
                        <div>{style}</div>
                        <div>{country.name}</div>
                    </div>
                    <div className="card-right">
                        Quantité en stock : {quantity}
                    </div>
                    <div className="delete">
                        <FiX onClick={openModal} />
                    </div>

                </div>
            </div>
            <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal">
                <h2>Êtes-vous sûr de vouloir supprimer cette bière ?</h2>
                <p>Une fois supprimée, la bière "{brand}" ne sera plus disponible.</p>
                <div className="modal-actions">
                    <button onClick={closeModal}>Annuler</button>
                    <button onClick={deleteBeer}>Supprimer</button>
                </div>
            </Modal>
        </>
    );
}

export default ArticlePage;
