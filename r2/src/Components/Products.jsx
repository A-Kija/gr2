import Link from './Link';

const products = [
    { id: 11, name: 'Pienas', price: 100 },
    { id: 27, name: 'Duona', price: 200 },
    { id: 30, name: 'Sviestas', price: 300 },
    { id: 44, name: 'Kiaušiniai', price: 400 },
    { id: 51, name: 'Kefyras', price: 500 },
    { id: 67, name: 'Varškė', price: 600 },
    { id: 77, name: 'Jogurtas', price: 700 }, 
];


export default function Products() {
    return (
        <div>
            <h1>Products</h1>
            <p>Our products are the best in the world.</p>
            <ul>
                {
                    products.map(product => (
                        <li key={product.id}>
                            <Link to={`product/${product.id}`}>{product.name}</Link> - {product.price / 100} €
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}