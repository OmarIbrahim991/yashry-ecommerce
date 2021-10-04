import { useState } from 'react'
import InputRange from 'react-input-range'
import Rating from './Rating'

const Filters = ({ priceRange, setPriceRange, colors, setColors, ratingFilter, setRatingFilter, priceLimits }) => {
	const [searchColor, setSearchColor] = useState("")

	const handleChange = ({ target }) => {
		if (target.id === "min-input") {
			setPriceRange(current => ({ ...current, min: parseInt(target.value) }))
		}
		else if (target.id === "max-input") {
			setPriceRange(current => ({ ...current, max: parseInt(target.value) }))
		}
	}

	const handleSelectColor = ({ target }) => {
		setColors(current => ({ ...current, [target.value]: !current[target.value] }))
	}

	const resetColors = (event) => {
		event.preventDefault()
		setColors((current) => (
			Object.fromEntries(
				Object.keys(current).map(color => [color, false])
			)
		))
	}

	return (
		<fieldset className="col filters pad-1 rounded" style={{ border: "3px solid red", position: "relative", }}>
			<legend style={{ textAlign: "left", fontSize: "115%", fontWeight: 700, }}>Filters</legend>
			<section className="col filter-section">
				<h3 className="left">Price range</h3>
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
				<InputRange minValue={priceLimits.min} maxValue={priceLimits.max} value={priceRange} onChange={setPriceRange} />
			</section>

			<section className="col filter-section">
				<h3 className="left">Color</h3>
				<form className="col">
					<input
						type="search"
						value={searchColor}
						onChange={e => setSearchColor(e.target.value)}
						placeholder="Enter color"
						style={{ padding: "0.5em", fontSize: "90%" }}
					/>

					<div className="col" style={{ maxHeight: "10rem", overflowY: "auto", margin: 0, }}>
						{
							Object.entries(colors).filter(([color]) => !searchColor || color.toLowerCase().includes(searchColor))
							.map(([color, checked]) => (
								<div key={color} className="left">
									<input
										type="checkbox"
										className="clickable"
										id={"color-" + color}
										name={"color-" + color}
										value={color}
										onChange={handleSelectColor}
										checked={checked}
									/>
									<label className="clickable" htmlFor={"color-" + color}>{color}</label>
								</div>
							))
						}
					</div>

					<div className="clickable hoverable" onClick={resetColors} style={{ alignSelf: "flex-start", fontWeight: 900, }}>
						<span style={{ fontFamily: "sans-serif", margin: 5, }}>X</span>
						<span style={{ fontSize: "115%" }}>Clear</span>
					</div>
				</form>
			</section>

			<section className="col filter-section">
				<h3 className="left">Average rating</h3>
				{
					[5, 4, 3, 2, 1].map((rating) => (
						<Rating
							key={rating}
							rating={rating} 
							handleClick={() => setRatingFilter(rating)}
							style={{ border: ratingFilter === rating ? "1px solid red" : "none" }}
						/>
					))
				}
			</section>
		</fieldset>
	)
}

export default Filters
