import { useEffect, useState } from 'react'
import Filters from './components/Filters'
import NavBar from './components/NavBar'
import ProductsList from './components/ProductsList'

const baseURL = "http://test-api.edfa3ly.io"
const defaultInitialData = { products: [], categories: [], }

const App = () => {
	const [initialData, setInitialData] = useState(defaultInitialData)
	const [category, setCategory] = useState(0)
	const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
	const [colors, setColors] = useState([])

	useEffect(() => {
		(async() => {
			const [products, categories] = await Promise.all(["/product", "/category"].map(async(endpoint) => {
				try {
					const data = await fetch(baseURL + endpoint)
					return await data.json()
				}
				catch (error) {
					console.log(error.message)
				}
			}))
			setInitialData({ products, categories })
		})()
	}, [])

	return (
		<div className="center col pad-1">
			<h1>Our Ecommerce Store</h1>
			<h3>Choose one of our categories from below</h3>
			<NavBar navItems={initialData.categories} selected={category} setSelected={setCategory} />
			<div className="row">
				<Filters priceRange={priceRange} setPriceRange={setPriceRange} colors={colors} setColors={setColors} />
				<ProductsList />
			</div>
		</div>
	)
}

export default App
