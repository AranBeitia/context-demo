import React, { useContext, useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'
import CreateProduct from '../Products/CreateProduct'
import EditProductModal from '../Products/EditProductModal'

const Admin = () => {
	const { getProducts, products, deleteProduct, getProductById } =
		useContext(ProductsContext)

	useEffect(() => {
		getProducts()
	}, [])

	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = (id) => {
		getProductById(id)
		setIsModalVisible(true)
	}

	return (
		<>
			<CreateProduct />
			{products ? (
				products.map((product) => (
					<div key={product._id}>
						<span>{product.name} </span>
						<span>{product.price.toFixed(2)}</span>
						<button onClick={() => deleteProduct(product._id)}>
							<DeleteOutlined />
						</button>
						<button onClick={() => showModal(product._id)}>
							<EditOutlined />
						</button>
					</div>
				))
			) : (
				<span>Loading...</span>
			)}
			<EditProductModal
				visible={isModalVisible}
				setVisible={setIsModalVisible}
			/>
		</>
	)
}
export default Admin
