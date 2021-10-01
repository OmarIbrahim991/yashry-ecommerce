import { Fragment } from 'react'
import InputRange from 'react-input-range'

const colors = ["Black", "Red", "Blue", "Yellow", "Green", "Orange"]

const Filters = ({ priceRange, setPriceRange }) => {
	const handleChange = (event) => {
		if (event.target.id === "min-input") {
			setPriceRange(current => ({ ...current, min: parseInt(event.target.value) }))
		}
		else if (event.target.id === "max-input") {
			setPriceRange(current => ({ ...current, max: parseInt(event.target.value) }))
		}
	}
	return (
		<aside className="col filters pad-1 rounded" style={{ border: "3px solid red", }}>
			<section className="col filter-section">
				<h3>Price range</h3>
				<div className="stretched-row pad-sm">
					<div className="row pad-sm">
						<label htmlFor="min-input">From</label>
						<input id="min-input" type="number" value={priceRange.min} onChange={handleChange} style={{ width: 50 }} />
					</div>
					<div className="row pad-sm">
						<label htmlFor="min-input">To</label>
						<input id="max-input" type="number" value={priceRange.max} onChange={handleChange} style={{ width: 50 }} />
					</div>

				</div>
				<InputRange minValue={0} maxValue={3000} value={priceRange} onChange={setPriceRange} />
			</section>

			<section className="col filter-section">
				<h3>Color</h3>
				<form className="stretched-row">
					{
						colors.map((color) => (
							<div key={color} style={{ textAlign: "left" }}>
								<input className="clickable" type="checkbox" id={"color-" + color} name={"color-" + color} value={color} />
								<label className="clickable" htmlFor={"color-" + color}>{color}</label>
							</div>
						))
					}
					<input className="clickable" type="reset" value="X Clear" />
				</form>
			</section>

			<section className="col filter-section">
			<h3>Average rating</h3>
			</section>
		</aside>
	)
}

export default Filters
