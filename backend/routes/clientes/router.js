import { Router } from "express";
import prisma from "../../prisma/db.js"

const router = Router();

router
.route('/')
.get(async function getClientes(_, res){
    try{
        const clientes = await prisma.cliente.findMany({
            include: {
                endereco: true
            }
        });
        if(!clientes || !clientes.length > 0){
            return res.status(404).json({
                message: "Nenhum cliente encontrado."
            })
        }
        return res.status(200).json({
            clientes
        })
    } catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Erro ao buscar clientes."
        });
    }
})
.post(async function createCliente(req, res){
    try{
        if(!req.body.cnpj || req.body.cnpj === ''){
            return res.status(400).json({
                message: "Cnpj não informado."
            });
        }
        if(!req.body.nome || req.body.nome === ''){
            return res.status(400).json({
                message: "Nome não informado."
            });
        }
        if(!req.body.tipo || req.body.tipo === ''){
            return res.status(400).json({
                message: "Data de nascimento não informado."
            });
        }
        if(!req.body.telefone || req.body.telefone === ''){
            return res.status(400).json({
                message: "Telefone não informado."
            });
        }
        if(!req.body.email || req.body.email === ''){
            return res.status(400).json({
                message: "Email não informado."
            });
        }
        if(!req.body.endereco){
            return res.status(400).json({
                message: "Endereco não informado."
            });
        }
        if(!req.body.endereco.cep || req.body.endereco.cep === ''){
            return res.status(400).json({
                message: "CEP não informado."
            });
        }
        if(!req.body.endereco.logradouro || req.body.endereco.logradouro === ''){
            return res.status(400).json({
                message: "Logradouro não informado."
            });
        }
        if(!req.body.endereco.numero){
            return res.status(400).json({
                message: "Número não informado."
            });
        }
        if(!parseInt(req.body.endereco.numero)){
            return res.status(400).json({
                message: "Número inválido."
            });
        }
        if(!req.body.endereco.bairro || req.body.endereco.bairro === ''){
            return res.status(400).json({
                message: "Bairro não informado."
            });
        }
        if(!req.body.endereco.cidade || req.body.endereco.cidade === ''){
            return res.status(400).json({
                message: "Cidade não informada."
            });
        }
        if(!req.body.endereco.estado || req.body.endereco.estado === ''){
            return res.status(400).json({
                message: "Estado não informado."
            });
        }
        if(!req.body.pessoas || !Array.isArray(req.body.pessoas) || !req.body.pessoas.length > 0){
            return res.status(400).json({
                message: "Relacionar pelo menos uma pessoa ao cliente."
            });
        }
        const cliente = await prisma.cliente.create({
            data:{
                cnpj: req.body.cnpj,
                nome: req.body.nome,
                tipo: req.body.tipo,
                telefone: req.body.telefone,
                email: req.body.email,
                endereco:{
                    create:{
                        cep: req.body.endereco.cep,
                        logradouro: req.body.endereco.logradouro,
                        numero: parseInt(req.body.endereco.numero),
                        bairro: req.body.endereco.bairro,
                        cidade: req.body.endereco.cidade,
                        estado: req.body.endereco.estado
                    }
                },
                pessoas:{
                    connect: req.body.pessoas.map((pessoa) => { return {id: parseInt(pessoa)}})
                }
            }
        });
        if(!cliente){
            return res.status(500).json({
                message: "Erro ao criar cliente."
            });
        }
        return res.status(201).json({
            message: "Cliente criado com sucesso."
        })
    } catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Erro ao criar cliente."
        });
    }
});

router
.route('/:id')
.delete(async function deleteClientePorId(req, res){
    try{
        if(!req.params.id){
            return res.status(400).json({
                message: "Id do cliente não informado."
            });
        }
        if(!parseInt(req.params.id)){
            return res.status(400).json({
                message: "Id do cliente inválido."
            });
        }
        const cliente = await prisma.cliente.delete({
            where:{
                id: parseInt(req.params.id)
            }
        });
        if(!cliente){
            return res.status(500).json({
                message: "Erro ao deletar cliente."
            });
        }
        return res.status(200).json({
            message: "Cliente deletado com sucesso."
        })
    } catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Erro ao deletar cliente."
        });
    }
})

export default router;