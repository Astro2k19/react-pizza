import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../../redux/slices/cartSlice';
import styles from './PizzaBlock.module.scss';
import {selectPizzaById} from "../../redux/slices/PizzasSlice.js";
import {selectCountByProductId} from "../../redux/slices/cartSlice";
import {Link} from "react-router-dom";
import {ICart} from "../CartItem";

export const typesName = ['тонкое', 'традиционное'];

interface IPizzaBlock {
    id: number
    productId: string
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    prices: number[]
}

const PizzaBlock: React.FC = React.memo( ({pizzaId}) => {
    const {id, productId, imageUrl, title, types, sizes, prices} = useSelector(state => selectPizzaById(state, pizzaId));

    const [pizzaState, setPizzaState] = React.useState({
        price: prices[0],
        type: types[0],
        size: sizes[0],
    });

    const dispatch = useDispatch();
    const count = useSelector(state => selectCountByProductId(state, productId)) ?? 0;

    const items = useSelector(state => state.cart.items);

    const handlePizzaState = (newPizzaState: ICart) => {
        setPizzaState((prevPizzaState) => ({
            ...prevPizzaState,
            ...newPizzaState,
        }));
    };

    const onAddItem = () => {
        const item = {
            id: items.length + 1,
            productId,
            title,
            imageUrl,
            price: pizzaState.price,
            type: typesName[pizzaState.type],
            size: pizzaState.size,
        };

        dispatch(addItem(item));
    };
    return (
        <div className={styles.item}>
            <Link to={`pizza/${id}_${productId}`} state={{pizzaState, productId}}>
                <img className={styles.image} src={imageUrl} alt={title}/>
            </Link>
            <Link to={`pizza/${id}_${productId}`} state={{pizzaState, productId}} >
                <h4 className={styles.title}>{title}</h4>
            </Link>
            <div className={styles.selector}>
                <ul>
                    {types.map((typeIndex) => (
                        <li
                            key={typeIndex}
                            className={pizzaState.type === typeIndex ? styles.active : ''}
                            onClick={() => handlePizzaState({type: typeIndex})}
                        >
                            {typesName[typeIndex]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, sizeIndex) => (
                        <li
                            key={size}
                            className={pizzaState.size === size ? styles.active : ''}
                            onClick={() => {
                                handlePizzaState({
                                    size: size,
                                    price: prices[sizeIndex],
                                });
                            }}
                        >
                            {size} см.
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.bottom}>
                <div className={styles.price}>от {pizzaState.price} &#8372;</div>
                <div className='button button--outline button--add' onClick={onAddItem}>
                    <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                            fill='white'
                        />
                    </svg>
                    <span>Добавить</span>
                    {count ? <i>{count}</i> : ''}
                </div>
            </div>
        </div>
    );
});

export default PizzaBlock;
