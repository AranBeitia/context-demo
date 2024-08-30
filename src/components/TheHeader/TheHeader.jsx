// import './TheHeader.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext/UserState'
import { ShoppingCartOutlined } from '@ant-design/icons'

function TheHeader() {
	const navigate = useNavigate()
	const { token, logout } = useContext(UserContext)

	const logoutUser = () => {
		logout()

		setTimeout(() => {
			navigate('/')
		}, 2000)
	}

	return (
		<nav className="header">
			<h1>Header</h1>
			{token ? (
				<>
					<button onClick={logoutUser}>
						<Link to="/">Logout</Link>
					</button>
					<Link to="/profile">Profile</Link>
					<Link to="/products">Products</Link>
					<Link to="/cart">
						<ShoppingCartOutlined />
					</Link>
				</>
			) : (
				<Link to="/">Login</Link>
			)}
		</nav>
	)
}

export default TheHeader
