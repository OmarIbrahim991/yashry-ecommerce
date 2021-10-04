import { useMemo, useCallback } from 'react'
import { capitalize } from '../helpers'

const useProducts = ({ products, category, ratingFilter, colors, priceRange, }) => {
	const applyFilters = useCallback(({ categoryId, price, color, rating, }) => {
		if (categoryId !== category) return false
		if (price < priceRange.min || price > priceRange.max) return false
		if (Object.values(colors).some(selected => selected) && !colors[capitalize(color)]) return false
		if (rating < ratingFilter) return false
		return true
	}, [category, colors, ratingFilter, priceRange])

    return useMemo(() => {
		if (!products || !category) return []
		return products.filter(applyFilters)
    }, [products, category, applyFilters])
}

export default useProducts
