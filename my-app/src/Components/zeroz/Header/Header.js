import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBagShopping, faUser, faXmark} from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import siteLogo from '../../Imgs/zeroz/site-logo.png'
import HeaderStyle from './HeaderStyle.css'
import { useState, useRef, useEffect } from 'react';

export default function Header(){
    const [sidebar, setSidebar] = useState(false);
    const [cart, setCart] = useState(false);
    // const [shoppingElements, setShoppingElements] = useState([]);
    const [shoppingElementsCount, setShoppingElementsCount] = useState(0);

    const sidebarChange = () => {
        setSidebar(!sidebar);
    }
    const shoppingCart = () => {
        setCart(!cart);
        // console.log('Shopping cart toggled');
        // const storedItems = JSON.parse(window.localStorage.getItem("item"))|| [];
        // // console.log(shoppingElements)
        // if (storedItems.length > 0 && !cart) {
        //     console.log('Items found in localStorage');
        //     setShoppingElements(storedItems);
        // }
    };
    useEffect(() => {
        const updateCartItems = () => {
        const storedItems = JSON.parse(window.localStorage.getItem("item"))|| [];
        setShoppingElementsCount(storedItems.reduce((acc, item) => acc + item.shoesNumber ,0));
    };
    updateCartItems();
    window.addEventListener('storage', updateCartItems);
    return () => {
        window.removeEventListener('storage', updateCartItems);
    };
},);

// function deleteProduct(e) {
//     const itemName = e.target.parentElement.firstChild.nextSibling.firstChild.innerHTML;
//     const updatedShoppingElements = shoppingElements.filter(item => item.name !== itemName);
//     setShoppingElements(updatedShoppingElements);
//     window.localStorage.setItem("item", JSON.stringify(updatedShoppingElements));
// }
const [shoppingElements, setShoppingElements] = useState(() => {
    // Initialize cart items from localStorage
    return JSON.parse(localStorage.getItem("item")) || [];
});

// Sync state with `localStorage` on mount and whenever `localStorage` changes
useEffect(() => {
    const syncCartFromStorage = () => {
        const storedItems = JSON.parse(localStorage.getItem("item")) || [];
        setShoppingElements(storedItems);
    };

    // Load items from local storage on component mount
    syncCartFromStorage();

    // Listen for `storage` events and update state when it occurs
    window.addEventListener('storage', syncCartFromStorage);
    return () => {
        window.removeEventListener('storage', syncCartFromStorage);
    };
}, []);

// Function to delete an item
function deleteProduct(e) {
    const itemName = e.target.closest('.flex').querySelector('h4').innerHTML;
    const updatedShoppingElements = shoppingElements.filter(
        item => item.name !== itemName
    );

    // Update `localStorage` and state
    localStorage.setItem("item", JSON.stringify(updatedShoppingElements));
    setShoppingElements(updatedShoppingElements);

    // Trigger storage event to notify other components of the change
    window.dispatchEvent(new Event('storage'));
}

    return(
        <>
        { sidebar &&
        <div className='sidebarContainer absolute'>
            <div className='sidebarDiv'>
            <FontAwesomeIcon onClick={sidebarChange} className='closeBtn text-xl absolute z-20' icon={faXmark}/>
                <ul className='sidebarSections flex flex-col text-lg'>
                    <li className='py-5 border-b ps-8 text-gray-500 cursor-pointer'><a href='#'>Home</a></li>
                    <li className='py-5 border-b ps-8 text-gray-500 cursor-pointer'><a href='#'>Shop Everything</a></li>
                    <li className='py-5 border-b ps-8 text-gray-500 cursor-pointer'><a href='#'>Lookbook</a></li>
                    <li className='py-5 border-b ps-8 text-gray-500 cursor-pointer'><a href='#'>Sale</a></li>
                    <li className='py-5 border-b ps-8 text-gray-500 cursor-pointer'><a href='#'>Story</a></li>
                    <li className='py-5 border-b ps-8 text-gray-500 cursor-pointer'><a href='#'>Contact</a></li>
                </ul>
            </div>
            <div className='sidebarBg' onClick={sidebarChange}></div>
        </div>
        }
        { cart &&
        <div className='shoppingContainer flex'>
            <div className='shoppingBg w-[60vw]' onClick={shoppingCart}></div>
            <div className='shoppingDiv flex flex-col w-[40vw]'>
                <div className='flex border-b px-[5%] items-center h-[6vh]'>
                    <h2 className='text-lg font-semibold w-[97%]'>Shopping Cart</h2>
                    <FontAwesomeIcon onClick={shoppingCart} className='w-[3%] text-xl cursor-pointer' icon={faXmark}/>
                </div>
                {shoppingElements.length > 0 ?
                    <div id='cartProductsContainer' className='flex flex-col justify-between p-[5%] h-[100vh]'>
                        <div className='flex flex-col gap-y-[10px]'>
                            {shoppingElements.map((item, index) => ( 
                                <>
                                <div id={index} className='flex py-[2%]'>
                                    <div className='w-[150px]'>
                                        <img src={`${process.env.PUBLIC_URL}${item.img}`}/>
                                    </div>
                                    <div className="flex flex-col justify-between px-[5%] font-semibold w-[100%]">
                                        <h4>{item.name}</h4>
                                        <h6 className='text-gray-400 font-semibold'>{item.price.new}</h6>
                                    </div>
                                    <div className='h-fit select-none text-xl text-gray-400 font-semibold cursor-pointer -mt-[2%]' onClick={deleteProduct}>x</div>
                                </div>
                                {index + 1 != shoppingElements.length ? <hr/> : null}
                                
                                </>
                            ))}
                        </div>
                        <div>
                            <div className='shoppingBtn cursor-pointer text-center mb-3 mx-[5%] py-3 text-gray-100 text-md tracking-widest font-semibold'><a href='#'>VIEW CART</a></div>
                            <div className='shoppingBtn cursor-pointer text-center mx-[5%] py-3 text-gray-100 text-md tracking-widest font-semibold'><a href='#'>CHECKOUT</a></div>
                        </div>

                    </div>
                :
                <>
                    <div className='flex justify-center items-center h-[86vh]'>
                        <h5 className='noElement text-lg font-semibold text-gray-500'>No products in the cart.</h5>
                    </div>
                    <div className='shoppingBtn cursor-pointer text-center mx-[5%] py-3 text-gray-100 text-md tracking-widest font-semibold'>CONTINUE SHOPPING</div>
                </>
                    }
            </div>
        </div>
        }
            <div className='shipping bg-gray-100 w-full'>
                <h5 className='text-gray-400 text-center text-xs p-3'>
                    Free Express Shipping on all orders with all duties included
                </h5>
            </div>  
            <div className="header mx-[3%] my-[3.5%] pe-0 flex relative">
                <div onClick={sidebarChange} className='sidebar cursor-pointer hidden'>
                    <a href='#'>
                    <div className='w-6 h-0.5 mb-1 mt-1 bg-gray-500'></div>
                    <div className='w-6 h-0.5 mb-1 bg-gray-500'></div>
                    <div className='w-6 h-0.5 mb-1 bg-gray-500'></div>
                    </a>
                </div>
                <button className='text-center'>
                    <a href='#'>
                    <img src={siteLogo} alt="site-logo"/>
                    </a>
                </button>
                <div className='flex headerLinks w-[100vw] h-fit ms-[1.5%] mt-[2px]'>
                    <ul className='flex justify-between w-[100%] text-gray-400 font-medium relative'>
                        <li className='leftLinks flex'>
                            <li>
                                <a className='pe-6' href='#'>MEN</a>
                            </li>
                            <li>
                                <a className='pe-6' href='#'>WOMEN</a>
                            </li>
                            <li>
                                <a className='pe-6' href='#'>COLLECTION</a>
                            </li>
                            <li>
                                <a className='pe-6' href='#'>LOOKBOOK</a>
                            </li>
                            <li>
                                <a className='pe-6' href='#'>SALE</a>
                            </li>
                        </li>
                        <li className='flex'>
                            <li className='rightLinks flex'>
                                <li>
                                    <a href='#' className=' whitespace-nowrap pe-6'>OUR STORY</a>
                                </li>    
                                <li>
                                    <a href='#' className='pe-6'>CONTACT</a>
                                </li>   
                            </li>
                            <li className='flex -mt-0.5'>
                                <li className='icons aspect-square text-black text-3xl -mt-2'>
                                    <a href='#' onClick={shoppingCart}>
                                        <FontAwesomeIcon  icon={faBagShopping}/>
                                        <div className='count text-sm bg-black text-white text-center'>{shoppingElementsCount}</div>
                                    </a>
                                </li>   
                                <li className='icons aspect-square ms-5 text-black text-2xl -mt-1'>
                                    <a href='#' className=''>
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                </li>   
                            </li>
                        </li>
                    </ul>
                </div>    
            </div>
        </>
    )
}