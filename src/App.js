import { useEffect, useState } from 'react'
import Filters from './components/Filters'
import NavBar from './components/NavBar'
import ProductsList from './components/ProductsList'
import LoadingSpinner from "./components/LoadingSpinner"
import { baseURL, defaultInitialData, capitalize } from './helpers'
import useProducts from './hooks/useProducts'


const App = () => {
	const [initialData, setInitialData] = useState(defaultInitialData)
	const [category, setCategory] = useState(0)
	const [loading, setLoading] = useState(true)
	const [priceLimits, setPriceLimits] = useState({ min: 50, max: 250 })
	const [priceRange, setPriceRange] = useState({ min: 50, max: 250 })
	const [colors, setColors] = useState({})
	const [ratingFilter, setRatingFilter] = useState(1)

	const filteredProducts = useProducts({ products: initialData.products, category, ratingFilter, colors, priceRange, })

	useEffect(() => {
		(async() => {
			setLoading(true)
			const [products, categories] = await Promise.all(["/product", "/category"].map(async(endpoint) => {
				try {
					const data = await fetch(baseURL + endpoint)
					return await data.json()
				}
				catch (error) {
					console.log(error.message)
				}
			}))

			const { min, max, colors } = products.reduce((prev, { price, color, }) => {
				return {
					min: Math.min(prev.min, price), max: Math.max(prev.max, price),
					colors: { ...prev.colors, [capitalize(color)]: false } }
			}, { min: 100, max: 200, colors: {}, })

			setPriceLimits({ min, max })
			setPriceRange({ min, max })
			setColors(colors)
			setInitialData({ products, categories })
			setLoading(false)
		})()
	}, [])

    if (loading) {
        return(
            <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", flex: 3, }}>
                <LoadingSpinner />
            </div>
        )
    }

	return (
		<div className="center col pad-1">
			<h1>Our Ecommerce Store</h1>
			<h3>Choose one of our categories from below</h3>
			<NavBar navItems={initialData.categories} selected={category} setSelected={setCategory} />
			<div className="row">
				<Filters
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					colors={colors}
					setColors={setColors}
					ratingFilter={ratingFilter}
					setRatingFilter={setRatingFilter}
					priceLimits={priceLimits}
				/>
				<ProductsList products={filteredProducts} />
			</div>
		</div>
	)
}

export default App
