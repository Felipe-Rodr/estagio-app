import { Router } from "express";
import prisma from "../../prisma/db.js"

const router = Router();

router
.route('/')
.get(async function getPessoas(req, res){
    try{
        const pessoas = await prisma.pessoa.findMany({
            select: req.query.select ? JSON.parse(req.query.select) : undefined
        });
        if(!pessoas || !pessoas.length > 0){
            return res.status(404).json({
                message: "Nenhuma pessoa encontrada."
            })
        }
        return res.status(200).json({
            pessoas
        })
    } catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Erro ao buscar pessoas."
        })
    }
})
.post(async function createPessoa(req, res){
    try{
        if(!req.body.cpf || req.body.cpf === ''){
            return res.status(400).json({
                message: "Cpf não informado."
            });
        }
        if(!req.body.nome || req.body.nome === ''){
            return res.status(400).json({
                message: "Nome não informado."
            });
        }
        if(!req.body.data_nascimento || req.body.data_nascimento === ''){
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
        const pessoa = await prisma.pessoa.create({
            data: {
                cpf: req.body.cpf,
                nome: req.body.nome,
                data_nascimento: new Date(req.body.data_nascimento).toISOString(),
                telefone: req.body.telefone,
                email: req.body.email,
                clientes: req.body.clientes && Array.isArray(req.body.clientes) ? {
                    connect: req.body.clientes.map((cliente) => { return { id: parseInt(cliente) } })
                } : undefined
            }
        });
        if(!pessoa){
            return res.status(500).json({
                message: "Erro ao criar pessoa."
            });
        }
        return res.status(201).json({
            message: "Pessoa criada com sucesso."
        });
    } catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Erro ao criar pessoa."
        })
    }
})

router
.route('/:id')
.delete(async function deleteClientePorId(req, res){
    try{
        if(!req.params.id){
            return res.status(400).json({
                message: "Id da pessoa não informado."
            });
        }
        if(!parseInt(req.params.id)){
            return res.status(400).json({
                message: "Id da pessoa inválido."
            });
        }
        const pessoa = await prisma.pessoa.delete({
            where:{
                id: parseInt(req.params.id)
            }
        });
        if(!pessoa){
            return res.status(500).json({
                message: "Erro ao deletar pessoa."
            });
        }
        return res.status(200).json({
            message: "Pessoa deletada com sucesso."
        })
    } catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Erro ao deletar pessoa."
        });
    }
})
export default router;