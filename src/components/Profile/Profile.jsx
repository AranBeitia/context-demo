import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext/UserState'

const Profile = () => {
	const { getUserInfo, user } = useContext(UserContext)

	useEffect(() => {
		getUserInfo()
	}, [])

	return <>{user ? <h1>Profile {user.name}</h1> : <p>Loading...</p>}</>
}
export default Profile
