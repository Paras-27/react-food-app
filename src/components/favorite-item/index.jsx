 import { useContext } from 'react';
import { ThemeContext } from '../../App';
import './styles.css';
 const FavoriteItem=(props)=>{
    const{id,image,title,removeFromFavorites}=props;
    const {theme}=useContext(ThemeContext)

    console.log(props,'favorite-item-props');

    return (
    <div key={id} className="favorite-item">
        <div>
            <img src={image} alt="image of recipe" />
        </div>
        <p style={theme ? {color :"#12343b"}:{}}>{title}</p>
        <button style={theme ? {backgroundColor :"#12343b"}:{}} type='button' onClick={removeFromFavorites}> Remove From favourites</button>
    </div>
    )
}
export default FavoriteItem;