import { useEffect, useState, useContext } from "react";
import { PageContext } from "../main";

function Page(){
    const { setPage } = useContext(PageContext);
    const [Clientes, setClientes] = useState(null);
    const [Refetch, setRefetch] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [Message, setMessage] = useState('');
    useEffect(() => {
        setIsLoading(true);
        async function getClientes(){
            const clientes = await fetch('http://localhost:3000/api/clientes',{
                method: 'GET',
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            if(!clientes.ok){
                const res = await clientes.json()
                setMessage(res.message);
            } else {
                const res = await clientes.json()
                setClientes(res.clientes);
            }
        }
        getClientes();
        setIsLoading(false);
    }, [Refetch]);
    return (
        <>
            <button 
                type="button" 
                className="fixed top-[75px] right-5 btn bg-white text-blue-600 hover:bg-gray-200"
                onClick={() => setPage('AdicionarCliente')}
            >
                Adicionar cliente
            </button>
            <ul className="flex flex-col overflow-y-auto scroll-smooth">
                <h1 className="text-2xl font-bold text-white">Clientes:</h1>
                {isLoading && (
                    <li><h2 className=" text-2xl font-bold text-white">Loading...</h2></li>
                )}
                {!isLoading && Message !== '' && (
                    <li><h2 className=" text-2xl font-bold text-white">{Message}</h2></li>
                )}
                {Clientes && Clientes.length > 0 && !isLoading && (
                    Clientes.map((cliente) =>
                        <li className="bg-white flex flex-col relative rounded shadow-lg items-center p-[10px] m-[10px] max-w-[800px]" key={cliente.id}>
                            <h2 className="text-2xl font-bold">{cliente.nome}</h2>
                            <div className="flex flex-row absolute top-1 right-0">
                                <button className="btn mx-[5px]" type="button">Editar cliente</button>
                                <button className="btn mx-[5px]" type="button" onClick={async () => {
                                    await fetch(`http://localhost:3000/api/clientes/${cliente.id}`,{
                                        method: 'DELETE',
                                        headers:{
                                            "Content-Type" : "application/json"
                                        }
                                    });
                                    setRefetch((prev) => prev + 1);
                                }}>Deletar cliente</button>
                            </div>
                            <ul className="flex flex-row flex-wrap items-center">
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">CNPJ:</h3>{cliente.cnpj}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Data:</h3>{new Date(cliente.data).toLocaleDateString()}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Tipo:</h3>{cliente.tipo}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Telefone:</h3>{cliente.telefone}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Email:</h3>{cliente.email}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">CEP:</h3>{cliente.endereco.cep}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Logradouro:</h3>{cliente.endereco.logradouro}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Número:</h3>{cliente.endereco.numero}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Bairro:</h3>{cliente.endereco.bairro}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Cidade:</h3>{cliente.endereco.cidade}
                                </li>
                                <li className="w-max flex flex-row items-center break-before-avoid">
                                    <h3 className="text-lg font-semibold m-[5px]">Estado:</h3>{cliente.endereco.estado}
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