import React from 'react'
import Profileinfo from '../ProfileInfo/Profileinfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'


const Navbar = ({ searchNote, handleClearSearch }) => {
  const [search, setSearch] = useState('')




  const navigate = useNavigate()
  const onlogout = () => {
    navigate("/login")
  }

  const handleSearch = () => {
    if (search) {
      searchNote(search)
    }
  }

  const onClearSearch = () => {
    setSearch('')
    handleClearSearch()
  }




  return (
    <div className='bg-white flex items-center justify-between px-6  py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>Write</h2>

      <SearchBar
        value={search}
        onChange={(e) => { setSearch(e.target.value) }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}

      />
      <Profileinfo onlogout={onlogout} />
    </div>
  )
}

export default Navbar
