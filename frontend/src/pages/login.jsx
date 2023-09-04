import { useContext, useState } from 'react'
import { SessionContext } from '../App'

function Page(){
    const {setSession} = useContext(SessionContext);
    const [Login, setLogin] = useState({
        email: '',
        senha: ''
    })
    const [Message, setMessage] = useState('');
    async function handleSubmit(e){
        e.preventDefault();
        let res = null;
        const login = await fetch(`http://localhost:3000/api/usuario/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Login)
        })
        if(!login.ok){
            res = await login.json();
            setMessage(res.message)
        } else {
            res = await login.json();
            setSession(res.usuario);
        }
    }
    return (
        <main className='flex flex-col w-full h-full justify-center items-center'>
            <form className='flex flex-col items-center rounded shadow-lg p-[20px] bg-white' onSubmit={handleSubmit}>
                <fieldset className='flex flex-col items-center'>
                    <legend className='text-center'><h2 className=' text-xl font-semibold'>Realizar login</h2></legend>
                    <label className='label'>
                        Email:
                        <input className='input' value={Login.email} name='email' type='text' maxLength={150} onChange={(e) => setLogin({...Login, email: e.target.value})}/>
                    </label>
                    <label className='label'>
                        Senha:
                        <input className='input' value={Login.senha} name='senha' type='password' maxLength={100} onChange={(e) => setLogin({...Login, senha: e.target.value})}/>
                    </label>
                </fieldset>
                <span className='min-h-[30px] text-red-600'>{Message !== '' && Message}</span>
                <button className='btn' type='submit'>Login</button>
            </form>
        </main>
    )
}

export default Page