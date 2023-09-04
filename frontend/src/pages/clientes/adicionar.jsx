import { useState, useEffect } from "react";

function Page(){
    const [Cliente, setCliente] = useState({
        cnpj: '',
        nome: '',
        tipo: 'regular',
        telefone: '',
        email: '',
        endereco:{
            cep: '',
            logradouro: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: ''
        },
        pessoas: []
    });
    const [Pessoas, setPessoas] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function getPessoas(){
            const pessoas = await fetch(`http://localhost:3000/api/pessoas?select=${JSON.stringify({id: true, nome: true})}`,{
                method: 'GET',
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            if(!pessoas.ok){
                const res = await pessoas.json()
                setMessage(res.message);
            } else {
                const res = await pessoas.json()
                setPessoas(res.pessoas);
            }
        }
        getPessoas();
        setIsLoading(false);
    }, [])
    const [Message, setMessage] = useState('');
    async function handleSubmit(e){
        e.preventDefault();
        const cliente = await fetch("http://localhost:3000/api/clientes",{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(Cliente)
        }).then((res) => res.json());
        setMessage(cliente.message);
    }
    console.log(Cliente)
    return (
        <div className="flex w-full h-full justify-center items-center">
            <form className="flex flex-row flex-wrap justify-center max-h-full overflow-y-auto scroll-smooth" onSubmit={handleSubmit}>
                <fieldset className="bg-white relative rounded shadow-lg flex flex-col p-[20px] max-w-[600px] overflow-y-auto scroll-smooth">
                    <legend className="text-center pt-[50px]"><h2 className="text-2xl font-bold">Adicionar cliente</h2></legend>
                    <fieldset className='flex flex-row flex-wrap justify-center items-center'>
                        <legend className="text-center"><h3 className="text-xl font-semibold">Dados</h3></legend>
                        <label className="label">
                            CNPJ*
                            <input className="input" value={Cliente.cnpj} maxLength={14} type="text" name="cnpj" onChange={(e) => setCliente({...Cliente, cnpj: e.target.value})}/>
                        </label>
                        <label className="label">
                            Nome*
                            <input className="input" value={Cliente.nome} maxLength={100} type="text" name="nome" onChange={(e) => setCliente({...Cliente, nome: e.target.value})}/>
                        </label>
                        <label className="label">
                            Tipo*
                            <select className="input" value={Cliente.tipo} name="tipo" onChange={(e) => setCliente({...Cliente, tipo: e.target.value})}>
                                <option value='regular'>Regular</option>
                                <option value='avulso'>Avulso</option>
                            </select>
                        </label>
                        <label className="label">
                            Telefone*
                            <input className="input" value={Cliente.telefone} maxLength={30} type="text" name="telefone" onChange={(e) => setCliente({...Cliente, telefone: e.target.value})}/>
                        </label>
                        <label className="label">
                            Email*
                            <input className="input" value={Cliente.email} maxLength={150} type="text" name="email" onChange={(e) => setCliente({...Cliente, email: e.target.value})}/>
                        </label>
                    </fieldset>
                    <fieldset className='flex flex-row flex-wrap justify-center items-center'>
                        <legend className="text-center"><h3 className="text-xl font-semibold">Endereço</h3></legend>
                        <label className="label">
                            CEP*
                            <input className="input" value={Cliente.endereco.cep} maxLength={20} type="text" name="cep" onChange={(e) => setCliente({...Cliente, endereco: {...Cliente.endereco, cep: e.target.value}})}/>
                        </label>
                        <label className="label">
                            Logradouro*
                            <input className="input" value={Cliente.endereco.logradouro} maxLength={150} type="text" name="logradouro" onChange={(e) => setCliente({...Cliente, endereco: {...Cliente.endereco, logradouro: e.target.value}})}/>
                        </label>
                        <label className="label">
                            Número*
                            <input className="input" value={Cliente.endereco.numero} min={0} step={1} type="number" name="numero" onChange={(e) => setCliente({...Cliente, endereco: {...Cliente.endereco, numero: e.target.value}})}/>
                        </label>
                        <label className="label">
                            Bairro*
                            <input className="input" value={Cliente.endereco.bairro} maxLength={50} type="text" name="bairro" onChange={(e) => setCliente({...Cliente, endereco: {...Cliente.endereco, bairro: e.target.value}})}/>
                        </label>
                        <label className="label">
                            Cidade*
                            <input className="input" value={Cliente.endereco.cidade} maxLength={50} type="text" name="cidade" onChange={(e) => setCliente({...Cliente, endereco: {...Cliente.endereco, cidade: e.target.value}})}/>
                        </label>
                        <label className="label">
                            Estado*
                            <input className="input" value={Cliente.endereco.estado} maxLength={50} type="text" name="estado" onChange={(e) => setCliente({...Cliente, endereco: {...Cliente.endereco, estado: e.target.value}})}/>
                        </label>
                    </fieldset>
                    <div className="flex flex-col w-full justify-center items-center">
                        <span className='min-h-[30px] text-red-600'>{Message !== '' && Message}</span>
                        <button className="btn" type="submit">
                            Adicionar cliente
                        </button>
                    </div>
                </fieldset>
                <fieldset className="bg-white rounded shadow-lg flex flex-row flex-wrap justify-start p-[20px] max-w-[600px] m-[10px] overflow-y-auto scroll-smooth">
                    <legend className="pt-[50px]"><h3 className="text-xl font-semibold">Relacionar pessoas</h3></legend>
                    <div className="flex flex-col">
                        {isLoading && (
                            <h2 className=" text-2xl font-bold text-white">Loading...</h2>
                        )}
                        {Pessoas && !isLoading && (
                            Pessoas.map((pessoa) =>
                                <label key={pessoa.id} className="flex flex-row items-center justify-center m-[5px]">
                                    <input type="checkbox" checked={Cliente.pessoas.some((pessoaSelecionada) => pessoaSelecionada === pessoa.id)} onChange={
                                        (e) => e.target.checked ? 
                                        setCliente({...Cliente, pessoas: [...Cliente.pessoas, pessoa.id]}) :
                                        setCliente({...Cliente, pessoas: Cliente.pessoas.filter((pessoaSelecionada) => pessoaSelecionada !== pessoa.id)})
                                    }/>
                                    <span className="text-lg ml-[5px]">{pessoa.nome}</span>
                                </label>
                            )
                        )}
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Page;