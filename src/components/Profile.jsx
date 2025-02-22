import React from 'react'
import EditPage from './EditPage'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'
import store from '../store/appStore'

const Profile = () => {
  const user = useSelector((store) => store.user)
  return (user &&
    <div className='flex items-center justify-center'>
      {<EditPage user={user} />}
      <UserCard user={user}/>
    </div>
  )
}

export default Profile