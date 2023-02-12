import { useEffect, useState } from 'react';
import './styles.css'
import { useContext } from 'react';
import { ThemeContext } from '../../App';

const Search=(props)=>{
    const {theme}=useContext(ThemeContext)

    const{getDataFromSearch,apiCalledSucces,setApiCalledSucces}=props;
    const[inputValue,setInputValue]= useState('')

    const handleInputvalue=(event)=>{
        const{value}=event.target;
        setInputValue(value)
    }

    useEffect(()=>{
        if(apiCalledSucces){
            setInputValue('');
            setApiCalledSucces(false);
        }
    },[apiCalledSucces,setApiCalledSucces])

    const handleSubmit=(event)=>{
        event.preventDefault()
        getDataFromSearch(inputValue)
    }
    return(
        <form onSubmit={handleSubmit} className="Search">
            <input name="search"  onChange={handleInputvalue} value={inputValue} placeholder="Search Recipes" id="search" />
            <button style={theme ? {backgroundColor :"#12343b"}:{}}type="submit">Search</button>
        </form>
    );
};
export default Search;