import React, { useEffect, useState }  from 'react';
import SearchedResult from './logged_user/SearchedResult';
import './SearchBar.css';

const SearchBar = ({accountType, token = ''}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      // Delay hiding the results to allow clicks on the results
      setTimeout(() => {
        setIsFocused(false);
      }, 200);
    };
  
    const handleSearch = (e) =>
        {
          e.preventDefault();
          setSearchQuery(e);
        };

        useEffect(() => {
            const searchUserByName = async (name) => {
              try {
                const usersData = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/${accountType}/${name}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                });
                const users = await usersData.json()
                setSearchResult(users);
              } catch (error) {
            console.log("This is the error: ", error);
          }
          };
          if(searchQuery !== '' ) {
            searchUserByName(searchQuery);
          } else {
            setSearchResult([]);
          }
        },[searchQuery]);

  return (
    <div className="search_bar_section">
      {
         isFocused ? <div className="search_results_box">
          {
            searchResult.map(user => <SearchedResult user={user}/> )
          }
      </div> : null
}
    <form className="searchQuery_form" onSubmit={handleSearch}>
    <input
    value={searchQuery}
    id="searchQuery"
    onChange={(e) => setSearchQuery(e.target.value)}
    onFocus={handleFocus}
    onBlur={handleBlur}
    type="text"
    placeholder={accountType === "company" ? "Search Mentor..." : "Search Company..."}
    />
    <button type="submit" style={{display: "none"}}>Submit</button>
  </form>
    </div>
  )
}

export default SearchBar