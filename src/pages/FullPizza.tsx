import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function FullPizza() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();

    useEffect( () => {
        async function fetchPizza() {
            try {
                const resp = await axios.get('https://663b86b2fee6744a6ea1f725.mockapi.io/items/' + id);
                setPizza(resp.data)
            } catch(e) {
                alert('Error while fetching pizza')
                navigate('/')
            }
        }
        fetchPizza();

    }, []);

    if (!pizza) {
        return `Loading...`
    }

    return (
        <div>
            <img src={pizza.imageUrl} alt={'Image of chosen pizza'}/>
            <h2>{pizza.title}</h2>
            <h3>{pizza.price} ₽</h3>

        </div>

    );
}

export default FullPizza;