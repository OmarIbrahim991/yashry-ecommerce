import Rating from "./Rating"
import { capitalize } from "../helpers"

const ProductsList = ({ products, }) => {

    return (
        <main className="main-content">
            {
                products && products.length > 0 ? products.map(({ id, name, image, color, price, rating, }) => (
                    <div key={id} className="card">
                        <img src={image} alt={name} loading="lazy" style={{ height: 235, }} />
                        <p>{name} - ({capitalize(color)})</p>
                        <Rating rating={rating} />
                        <p>${price.toFixed(2)}</p>
                    </div>
                ))
                :
                    <h1>No product matches the selected options</h1>
            }
        </main>
    )
}

export default ProductsList
