import { createContext, useReducer } from 'react'
import axios from 'axios'
import ProductsReducer from './ProductsReducer'

const cartStorage = JSON.parse(localStorage.getItem('cart'))

const initialState = {
	products: [],
	// cart: cartStorage || [],
	cart: cartStorage ? cartStorage : [],
	product: {},
}

const API_URL = 'http://localhost:3001'

export const ProductsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ProductsReducer, initialState)

	const getProducts = async () => {
		const res = await axios.get(API_URL + `/products/getAll?limit=15`)

		dispatch({
			type: 'GET_PRODUCTS',
			payload: res.data,
		})
		return res
	}

	const addCart = (product) => {
		dispatch({
			type: 'ADD_CART',
			payload: product,
		})
	}

	const clearCart = () => {
		dispatch({
			type: 'CLEAR_CART',
		})
	}

	const deleteProduct = async (id) => {
		const token = JSON.parse(localStorage.getItem('token'))

		const res = await axios.delete(`${API_URL}/products/id/${id}`, {
			headers: {
				authorization: token,
			},
		})

		dispatch({
			type: 'DELETE_PRODUCT',
			payload: res.data.response,
		})
	}

	const createProduct = async (product) => {
		const token = JSON.parse(localStorage.getItem('token'))

		const res = await axios.post(`${API_URL}/products`, product, {
			headers: { authorization: token },
		})

		dispatch({
			type: 'CREATE_PRODUCT',
			payload: res.data,
		})
		return res
	}

	const getProductById = async (id) => {
		const res = await axios.get(`${API_URL}/products/getById/${id}`)

		dispatch({
			type: 'GET_PRODUCT_BY_ID',
			payload: res.data,
		})
	}

	const editProduct = async (product, id) => {
		const token = JSON.parse(localStorage.getItem('token'))

		const res = await axios.put(`${API_URL}/products/${id}`, product, {
			headers: { authorization: token },
		})

		dispatch({
			type: 'EDIT_PRODUCT',
			payload: res.data,
		})
		return res
	}

	return (
		<ProductsContext.Provider
			value={{
				products: state.products,
				cart: state.cart,
				product: state.product,
				getProducts,
				addCart,
				clearCart,
				deleteProduct,
				createProduct,
				getProductById,
				editProduct,
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}

export const ProductsContext = createContext(initialState)
