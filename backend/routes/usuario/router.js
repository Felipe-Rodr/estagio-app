import { Router } from "express";

const router = Router();

const usuario = {
    email: 'teste@estagio.com.br',
    senha: '1234'
}

router
.route('/login')
.post(async function login(req, res){
    try{
        if(!req.body.email){
            return res.status(400).json({
                message: "Email não informado."
            });
        }
        if(!req.body.senha){
            return res.status(400).json({
                message: "Senha não informada."
            });
        }
        if(req.body.email !== usuario.email || req.body.senha !== usuario.senha){
            return res.status(400).json({
                message: "Email ou senha incorreta."
            });
        }
        return res.status(200).json({
            usuario
        });
    } catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Erro ao realizar login."
        })
    }
});

export default router;