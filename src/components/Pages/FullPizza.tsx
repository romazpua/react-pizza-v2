import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const url = 'https://649492be0da866a95367fe18.mockapi.io/items/' + id
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number
    }>()
    // const {title, imageUrl, price} = pizza

    const fetchPizza = async () => {
        try {
            const {data} = await axios.get(url)
            setPizza(data)
        } catch (error) {
            alert('ЧТо-то пошло не так...')
            navigate('/')
        }
    }

    const returnBtn = () => {
        navigate(-1)
    }

    useEffect(() => {
        fetchPizza()
        // return () => setPizza({imageUrl: '', title: '', price: 0})
    }, []);

    if (!pizza) {
        return <>Downloading...</>
    }

    return (
        <div className="container">
            <div className="single-pizza">
                <div className="single-pizza__img">
                    <img src={pizza.imageUrl} alt=""/>
                </div>
                <div className="single-pizza__descr">
                    <h2>{pizza.title}</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias at consequatur, debitis,
                        eligendi
                        enim eos eum fuga ipsum itaque magnam mollitia nulla numquam omnis quas repellat tenetur?
                        Deserunt
                        dolorem eius, illo minima officia reiciendis! Eos impedit incidunt officiis perspiciatis
                        quaerat?
                    </p>
                    <h4>{pizza.price} UAH</h4>
                    <button onClick={returnBtn} className="button">RETURN</button>
                </div>
            </div>
        </div>
    )
}

export default FullPizza