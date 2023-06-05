import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';



export default function RegisterPage()
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function registerUser(ev){
        ev.preventDefault();
        try{
        axios.post('/signup', {
            name,
            email,
            password,
        }); 
        alert('Registration successful. Now you can log in :)');
    }catch (e){alert ('Registration Failed. Please try again :(');}
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
               <h1 className="text-4xl text-center mb-4">Sign Up</h1>
              <form action="" className="max-w-md mx-auto" onSubmit={registerUser}>
              <input type="text" 
                    placeholder="name..." 
                    value={name}
                    onChange={ev => setName(ev.target.value)} />
                <input type="email"    
                    placeholder="Email..." 
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}/>
                <input type="password"  
                    placeholder="password..."
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button className="primary">register</button>
                <div className="text-center py-2 text-gray-500 ">
                Already have an account? 
                    <Link className="text-black font-bold" to={'/login'}> Login</Link>
                </div>
            </form>
           </div>    
        </div>
    );
}