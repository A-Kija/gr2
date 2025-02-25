import Link from './Link';
import axios from 'axios';
import { useEffect, useState } from 'react';




export default function Products() {


    const [products, setProducts] = useState(null);

    useEffect(_ => {
        axios.get('http://localhost:3333/products')
            .then(response => {
                console.log('products', response.data);
                setProducts(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);




    return (
        <div>
            <h1>Products</h1>
            <p>Our products are the best in the world.</p>
            <ul>
                {
                    products !== null && products.map(product => (
                        <li key={product.id}>
                            <Link to={`product/${product.id}`}>{product.name}</Link> - {product.price / 100} €
                        </li>
                    ))
                }

                {
                    products === null && 'Loading...'
                }
            </ul>
        </div>
    );
}