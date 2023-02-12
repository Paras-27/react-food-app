 import { useContext } from 'react';
 import { ThemeContext } from "../../App";
import './styles.css';
 const RecipeItem=(props)=>{
    const{id,image,title,addToFav}=props;

    const {theme}=useContext(ThemeContext)
    console.log(props,'recipe-item-props');

    return (
    <div key={id} className="recipe-item">
        <div>
            <img src={image} alt="image of recipe" />
        </div>
        <p style={theme ? {color : "#12343b"} :{}}>{title}</p>
        <button style={theme ? {backgroundColor :"#12343b"}:{}} type='button' onClick={addToFav}> Add to favourites</button>
    </div>
    )
}
export default RecipeItem;