import {React, useState} from 'react'
import Profileinfo from '../ProfileInfo/Profileinfo'
import SearchBar from '../SearchBar/SearchBar'



const Navbar = ({ userInfo, searchNote, handleClearSearch }) => {
  const [search, setSearch] = useState('')
 
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
    <div className='bg-white flex items-center justify-around cursor-pointer px-6  p-4 drop-shadow'>
      <h2 className='text-2xl font-medium text-black py-2'>Note</h2>

      <SearchBar
        value={search}
        onChange={(e) => { setSearch(e.target.value) }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        
      />
      <Profileinfo userInfo={userInfo} />
    </div>
  )
}

export default Navbar
