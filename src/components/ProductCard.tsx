import { useState } from "react";
import { ProductEntity } from "../types";

export interface ProductCardProps {
  product: ProductEntity;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const [cartCount, addCartCount] = useState(0);

  return(
    <div className="sp-card-2">
      <div className="overlap">
          <div className="cloth-size">
            <span><b>Name :</b> </span>
            <span><b>{product.name}</b></span>                                
          </div>
          <div className="cloth-size">
            <span><b>Type :</b> </span>
            <span><b>{product.type}</b></span>                                
          </div>
          <div className="cloth-size">
            <span><b>Color :</b> </span>
            <span><b>{product.color}</b></span>                                
          </div>
          <div className="cloth-size">
            <span><b>gender :</b> </span>
            <span><b>{product.gender}</b></span>                                
          </div>
      </div>
      <div className="card-image">
        <img src={product.imageURL}/>                            
      </div>
      <div className="card-content">
        <span className="card-title">{product.name}</span>
        <span className="price-start">Rs {product.price} </span>
        <div> 
          {
            cartCount > 0 ? 
            <> <button className="add-cart-btn" onClick={()=> { addCartCount(cartCount - 1 )}} > - </button> {cartCount}  <button className="add-cart-btn" onClick={()=> { addCartCount(cartCount + 1 )}}> + </button>  </> :  
            <button className="add-cart-btn" onClick={()=> { addCartCount(cartCount + 1 )}}> Add to Cart</button>
          }
        </div>
      </div>
    </div>
  )
};

export default ProductCard;
