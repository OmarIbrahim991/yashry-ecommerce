import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'

const baseURL = "http://test-api.edfa3ly.io"
const defaultInitialData = { products: [], categories: [], }

const App = () => {
	const [initialData, setInitialData] = useState(defaultInitialData)

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
		<div className="container">
			<h1>Our Ecommerce Store</h1>
			<h4>Choose one of our categories from below</h4>
			<NavBar navItems={initialData.categories} />
			<div className="row">
				<aside className="col filters"></aside>
				<main className="main-content"></main>
			</div>
		</div>
	)
}

export default App
