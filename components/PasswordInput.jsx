import {useState} from 'react';
import {FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, ...props}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='relative'>
         <input
         type={passwordVisible ? 'text' : 'password'}
         value={value}
         onChange={onChange}
         {...props}
         className='w-full p-2 border-none rounded-md'
         />
         <button
            onClick={togglePasswordVisibility}
            className='absolute inset-y-2 right-0 pr-2 mt-0 mb-0 pt-0 pb-0 border-none bg-white  items-center'
            type='button'
            
        >
            {passwordVisible ? (
                <FaEye className='h-4 w-4' /> 
            ) : (
                <FaEyeSlash className='h-4 w-4' /> 
            )}
        </button>
        </div>
    );
};
export default PasswordInput;