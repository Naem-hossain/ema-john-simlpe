import React, { useEffect, useState } from 'react';
import { addToDb, getStoredProduct } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(() => {
        const storedCart = getStoredProduct();
        const savedCard = []
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity
                savedCard.push(addedProduct)
            }
        }
        setCart(savedCard)
    }, [products])


    function handlerAddToCard(SelectedProduct) {

        let newCart = []
        const exists = cart.find(product => product.id === SelectedProduct.id);
        if (!exists) {
            SelectedProduct.quantity = 1;
            newCart = [...cart, SelectedProduct]
        }
        else {
            const rest = cart.filter(product => product.id !== SelectedProduct.id);
            exists.quantity = exists.quantity + 1
            newCart = [...rest, exists]
        }
        setCart(newCart)
        addToDb(SelectedProduct.id)
    }
    return (
        <div className='shop'>
            <div className='product-component'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handlerAddToCard={handlerAddToCard}
                    ></Product>)
                }
            </div>
            <div className='order-component'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;