import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
    const { name, price, img, seller, ratings } = props.product
    const { handlerAddToCard } = props
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <p className='product-name'>Name: {name}</p>
                <p>Price: {price}</p>
                <p>Seller: {seller} </p>
                <p>Ratings: {ratings} stars</p>
            </div>
            <button onClick={() => handlerAddToCard(props.product)} className='add-to-card'>
                <p className='btn-text'>Add to card </p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;