import { useCallback, useContext } from 'react';
import { ThemeContext } from '../../App';
import { useEffect, useReducer, useState } from 'react';
import Search from '../../components/search';
import RecipeItem from '../../components/recipe-item';
import FavoriteItem from '../../components/favorite-item';
import './styles.css';

const reducer=(state,action)=>{
    switch (action.type) {
        case "filterFavorites":
            return {
                ...state,
                filteredValue :action.value
            };
    
        default:
            return state;
    }
}

const initialState={
    filteredValue: ''
}

const Homepage = () => {
    //loading state
    const [loadingState, setLoadingState] = useState(false)

    //save result that we recieve from api
    const [recipes, setRecipes] = useState([])

    //fav data sets

    const[favourites,setFavorites]=useState([])

    //state for api is succesfull or not

    const [apiCalledSucces,setApiCalledSucces]=useState(false);


    // use reducer functionality

    const [filteredState,dispatch]=useReducer(reducer,initialState)

    const {theme}=useContext(ThemeContext)

    const getDataFromSearch = (getData) => {
        //keep the loading data state as true before we are calling api
        setLoadingState(true)

        async function getRecepies() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=20be6491012f460d8642cfce58dbd206&query=${getData}`)
            const result = await apiResponse.json()
            const { results } = result;
            console.log(result);
            if (results && results.length > 0) {
                //set loading as false again
                //set the recipes state

                setLoadingState(false);
                setRecipes(results);
                setApiCalledSucces(true);
            }
        }
        getRecepies();
    };
    // console.log(loadingState, recipes);

    const addToFav=useCallback((getCurrentRecipeItem)=>{
        const copyFavorites=[...favourites];

        const index=copyFavorites.findIndex(item=> item.id === getCurrentRecipeItem.id)
        if(index ===-1){
            copyFavorites.push(getCurrentRecipeItem)
            setFavorites(copyFavorites)
            localStorage.setItem('favorites',JSON.stringify(copyFavorites))
            window.scrollTo({top : '0', behavior :'smooth'})
        }
        else{
            alert('Item is already present in favorites');
        }
    },[favourites])



    const removeFromFavorites=(getCurrentId)=>{
        let copyFavorites=[...favourites];
        copyFavorites=copyFavorites.filter(item=> item.id !== getCurrentId);
        setFavorites(copyFavorites);
        localStorage.setItem("favorites",JSON.stringify(copyFavorites));
    }

    useEffect(()=>{
        const extractFavoritesFromLocalStorage=JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(extractFavoritesFromLocalStorage)
    },[])
    
    //Filter the favorites here

    const filteredFavoritesItems=favourites && favourites.length>0 ? favourites.filter(item=>
        item.title.toLowerCase().includes(filteredState.filteredValue)
        ): [];
    
    const renderRecipes=useCallback(()=>{
        if(recipes  && recipes.length>0){
            return (
                    recipes.map(item =>
                        <RecipeItem addToFav={()=>addToFav(item)} 
                        id={item.id}
                        image={item.image} 
                        title={item.title} 
                        />))
        }
        
    },[recipes,addToFav])


    return (
        <div className="homepage">
            <Search getDataFromSearch={getDataFromSearch} 
                apiCalledSucces={apiCalledSucces}
                setApiCalledSucces={setApiCalledSucces}
            />
            {/* show favorites items */}
            <div className="favorites-wrapper">
                <h1 style={theme ? {color :"#12343b"}:{}}className="favorites-title">Favorites</h1>

                <div className="search-favorites">
                    <input
                    onChange={(event)=> 
                    dispatch({type : 'filterFavorites',value : event.target.value})
                    }
                    value={filteredState.filteredValue}
                    name="searchfavorites" placeholder='Search Favorites' />
                </div>

                <div className="favorites">
                    {
                        !filteredFavoritesItems.length && <div style={{display:'flex',width:'100%',justifyContent:'center'}} className="no-items">No Favorites are Found</div>
                    }
                    {
                        filteredFavoritesItems && filteredFavoritesItems.length >0 ?
                        filteredFavoritesItems.map(item=> (<FavoriteItem removeFromFavorites={()=> removeFromFavorites(item.id)} id={item.id} image={item.image} title={item.title} />)) : null}
                </div>
            </div>

            {/* show favorites items */}

            {/* show loading state */}
            {
                loadingState && <div className='loading'>Loading recipes ! Please wait.</div>
            }

            {/* show loading state */}

            {/* map through all recipes */}

            <div className="items">
                {
                    renderRecipes()
                }
                
                {/* {recipes && recipes.length > 0 ?
                    recipes.map(item =>
                        <RecipeItem addToFav={()=>addToFav(item)} id={item.id} image={item.image} title={item.title} />) : null} */}
            </div>


            {/* map through all recipes */}

            {
                !loadingState && !recipes.length && <div className="no-items">No Recipes are found</div>
            }
        </div>
    )
}
export default Homepage;