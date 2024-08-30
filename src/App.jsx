import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import TheHeader from './components/TheHeader/TheHeader'
import { UserProvider } from './context/UserContext/UserState'

function App() {
	return (
		<UserProvider>
			<Router>
				<TheHeader />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</Router>
		</UserProvider>
	)
}
export default App
