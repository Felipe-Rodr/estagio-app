import { useEffect, useState, useContext } from "react";
import { PageContext } from "../main";

function Page(){
    const { setPage } = useContext(PageContext);
    const [Pessoas, setPessoas] = useState(null);
    const [Refetch, setRefetch] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [Message, setMessage] = useState('');
    useEffect(() => {
        async function getPessoas(){
            const pessoas = await fetch('http://localhost:3000/api/pessoas',{
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
    }, [Refetch])
    return (
        <>
            <button 
                type="button" 
                className="fixed top-[75px] right-5 btn bg-white text-blue-600 hover:bg-gray-200"
                onClick={() => setPage('AdicionarPessoa')}
            >
                Adicionar pessoa
            </button>
            <ul className="flex flex-col">
                {isLoading && (
                    <li><h2 className=" text-2xl font-bold text-white">Loading...</h2></li>
                )}
                {!isLoading && Message !== '' && (
                    <li><h2 className=" text-2xl font-bold text-white">{Message}</h2></li>
                )}
                {Pessoas && !isLoading && (
                    Pessoas.map((pessoa) =>
                        <li className="bg-white flex flex-col relative rounded shadow-lg items-center p-[10px] m-[10px] max-w-[800px]" key={pessoa.id}>
                            <h2 className="text-2xl font-bold">{pessoa.nome}</h2>
                            <div className="flex flex-row absolute top-1 right-0">
                                <button className="btn mx-[5px]" type="button">Editar pessoa</button>
                                <button className="btn mx-[5px]" type="button" onClick={async () => {
                                    await fetch(`http://localhost:3000/api/pessoas/${pessoa.id}`,{
                                        method: 'DELETE',
                                        headers:{
                                            "Content-Type" : "application/json"
                                        }
                                    });
                                    setRefetch((prev) => prev + 1);
                                }}>Deletar pessoa</button>
                            </div>
                            <ul className="flex flex-row flex-wrap items-center">
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">CNPJ:</h3>{pessoa.cpf}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Data de nascimento:</h3>{new Date(pessoa.data_nascimento).toLocaleDateString()}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Telefone:</h3>{pessoa.telefone}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Email:</h3>{pessoa.email}
                                </li>
                            </ul>
                        </li>
                    )
                )}
            </ul>
        </>
    )
}



export default Page;