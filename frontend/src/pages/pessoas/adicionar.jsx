import { useState } from "react";

function Page(){
    const [Pessoa, setPessoa] = useState({
        cpf: '',
        nome: '',
        data_nascimento: '',
        telefone: '',
        email: ''
    });
    const [Message, setMessage] = useState('');
    async function handleSubmit(e){
        e.preventDefault();
        const pessoa = await fetch("http://localhost:3000/api/pessoas",{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(Pessoa)
        }).then((res) => res.json());
        setMessage(pessoa.message);
    }
    return (
        <div className="flex w-full h-full justify-center items-center">
            <form className="bg-white rounded shadow-lg flex flex-col items-center p-[20px] max-w-[600px]" onSubmit={handleSubmit}>
                <fieldset className='flex flex-row flex-wrap justify-center items-center'>
                    <legend className="text-center"><h2 className="text-2xl font-bold">Adicionar cliente</h2></legend>
                    <label className="label">
                        CPF*
                        <input className="input" value={Pessoa.cpf} maxLength={11} type="text" name="cpf" onChange={(e) => setPessoa({...Pessoa, cpf: e.target.value})}/>
                    </label>
                    <label className="label">
                        Nome*
                        <input className="input" value={Pessoa.nome} maxLength={100} type="text" name="nome" onChange={(e) => setPessoa({...Pessoa, nome: e.target.value})}/>
                    </label>
                    <label className="label">
                        Data de nascimento*
                        <input className="input" value={Pessoa.data_nascimento} type="date" name="data_nascimento" onChange={(e) => setPessoa({...Pessoa, data_nascimento: e.target.value})}/>
                    </label>
                    <label className="label">
                        Telefone*
                        <input className="input" value={Pessoa.telefone} maxLength={30} type="text" name="telefone" onChange={(e) => setPessoa({...Pessoa, telefone: e.target.value})}/>
                    </label>
                    <label className="label">
                        Email*
                        <input className="input" value={Pessoa.email} maxLength={150} type="text" name="email" onChange={(e) => setPessoa({...Pessoa, email: e.target.value})}/>
                    </label>
                </fieldset>
                <span className='min-h-[30px] text-red-600'>{Message !== '' && Message}</span>
                <button className="btn" type="submit">
                    Adicionar pessoa
                </button>
            </form>
        </div>
    )
}

export default Page;