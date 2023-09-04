import { useState, createContext } from "react"
import ClientesPage from "./clientes"
import AdicionarClientePage from './clientes/adicionar.jsx'
import PessoasPage from "./pessoas"
import AdicionarPessoaPage from './pessoas/adicionar.jsx'

export const PageContext = createContext(null);

function Page(){
    const [Page, setPage] = useState('Clientes');
    return (
        <>
        <nav className="sticky top-0 flex flex-row w-full h-[60px] bg-white shadow-lg px-[20px]">
            <ul className="flex flex-row items-center">
                <li className="mx-[10px]">
                    <button className="btn" type="button" onClick={() => setPage('Clientes')}>Clientes</button>
                </li>
                <li className="mx-[10px]">
                    <button className="btn" type="button" onClick={() => setPage('Pessoas')}>Pessoas</button>
                </li>
            </ul>
        </nav>
        <main className='w-full h-full flex flex-col p-[20px]'>
            <PageContext.Provider value={{Page, setPage}}>
            {
                Page === 'Clientes' ? <ClientesPage/> :
                Page === 'AdicionarCliente' ? <AdicionarClientePage/> :
                Page === 'Pessoas' ? <PessoasPage/> :
                Page === 'AdicionarPessoa' ? <AdicionarPessoaPage/> :
                null
            }
            </PageContext.Provider>
        </main>
        </>
    )
}

export default Page