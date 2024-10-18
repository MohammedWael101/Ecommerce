import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import siteLogo from '../../Imgs/site-logo.png'

export default function Header(){
    return(
        <>
            <div className='bg-gray-100'>
                <h5 className='text-gray-400 text-center text-sm p-2'>
                    Free Express Shipping on all orders with all duties included
                </h5>
            </div>  
            <div className="header">
                <button>
                    <a href='#'>
                    <img src={siteLogo} alt="site-logo"/>
                    </a>
                </button>
            </div>    
        </>
    )
}