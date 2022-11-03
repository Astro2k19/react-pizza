import {useLocation, useParams} from "react-router-dom";
import {selectPizzaById} from "../../redux/slices/PizzasSlice.js";
import {useDispatch, useSelector} from "react-redux";
import styles from './PizzaBlockSingle.module.scss';
import React, {useRef} from 'react';
import {typesName} from "./index.tsx";
import {addItem, selectCountByProductId} from "../../redux/slices/cartSlice.js";

interface IPizza {
    id?: string
    productId?: string
    category?: number
    title?: string
    imageUrl?: string
    selectedPrice?: number
    selectedType?: number
    selectedSize?: number
    rating?: number
    prices?: number[]
    sizes?: number[]
    types?: number[]
}

interface ICartPizza {

}


const PizzaBlockSingle: React.FC = () => {
    const params = useParams();

    if (!params) return null;

    const [id, productId] = params?.pizzaId?.split('_') || '';

    const [pizza, setPizza] = React.useState<IPizza>();
    const [status, setStatus] = React.useState<string>('loading');
    const dispatch = useDispatch();

    const count: number = useSelector(state => selectCountByProductId(state, productId)) ?? 0;
    const items = useSelector(state => state.cart.items);

    React.useEffect(() => {
        const fetchPizzaById = async () => {

            try {
                const res = await fetch(`https://63471cba04a6d45757a0be78.mockapi.io/items/${id}`);
                const data = await res.json();

                handlePizzaState({
                    ...data,
                    selectedPrice: data.prices[0],
                    selectedType: data.types[0],
                    selectedSize: data.sizes[0]
                })

                setStatus('success');
            } catch (error) {
                console.log(error)
                setStatus('error');
            }
        }

         fetchPizzaById();

    }, []);

    const onAddItem = () => {
        const item = {
            id: items.length + 1,
            productId,
            title: pizza?.title || '',
            imageUrl: pizza?.imageUrl || '',
            price: pizza?.selectedPrice,
            type: typesName[pizza?.selectedType],
            size: pizza?.selectedSize,
        };

        dispatch(addItem(item));
    };

    const handlePizzaState = (newPizzaState: IPizza) => {
        setPizza((prevPizzaState) => ({
            ...prevPizzaState,
            ...newPizzaState,
        }));
    };

    let content;

    switch (status) {
        case 'loading':
            content = <p style={{textAlign: 'center', fontSize: '25px', padding: '50px'}}>Loading...</p>
            break;

        case 'success':

            if (!pizza) {
                return <p>Opps... something happened</p>
            }

            content = <div className={styles.item}>
                <div className={styles.inner}>
                    <div className={styles.image}>
                        <img src={pizza.imageUrl} alt={pizza.title}/>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.itemTopContent}>
                            <h3 className={styles.title}>{pizza.title}</h3>
                            <div className={styles.price}>от {pizza.selectedPrice} &#8372;</div>
                        </div>
                        <div className={styles.selector}>
                            <ul>
                                {pizza.types.map((typeIndex) => (
                                    <li
                                        key={typeIndex}
                                        className={pizza.selectedType === typeIndex ? styles.active : ''}
                                        onClick={() => handlePizzaState({selectedType: typeIndex})}
                                    >
                                        {typesName[typeIndex]}
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                {pizza.sizes.map((size, sizeIndex) => (
                                    <li
                                        key={size}
                                        className={pizza.selectedSize === size ? styles.active : ''}
                                        onClick={() => {
                                            handlePizzaState({
                                                selectedSize: size,
                                                selectedPrice: pizza.prices[sizeIndex],
                                            });
                                        }}
                                    >
                                        {size} см.
                                    </li>
                                ))}
                            </ul>
                        </div>
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
            </div>
            break;

        case 'error' :
            content = <p style={{textAlign: 'center', fontSize: '25px', padding: '50px'}}>😔 Opps something happened...</p>
            break;
    }

    return (content)
}
export default PizzaBlockSingle;