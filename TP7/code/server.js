"use strict"

let http = require('http')
let express = require('express')
let logger = require('morgan')
let jsonfile = require('jsonfile')
let pug = require('pug')
let fs = require('fs')
let formidable = require('formidable')

let app = express()
let myBD = "./bd/ficheiros.json"

// morgan
app.use(logger('combined'))

// stylesheets
app.all('*', (req,res,next)=>{
	if(req.url != '/w3.css')
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
	next()
})

app.get('/w3.css', (req,res)=>{
	res.writeHead(200, {'Content-Type': 'text/css'})
	fs.readFile('stylesheets/w3.css', (erro, dados)=>{
		if(!erro)
			res.write(dados)
		else
			res.write(pug.renderFile('erro.pug', {e: erro}))
		res.end()
	})
})

// formulario
app.get('/', (req,res)=>{
	jsonfile.readFile(myBD, (erro, ficheiros)=>{
		if(!erro){
			res.write(pug.renderFile('./templates/form-ficheiro.pug', {lista: ficheiros}))
			res.end()
		}
		else{
			res.write(pug.renderFile('./templates/erro.pug', {e: "Erro: na lista da base de dados"}))
			res.end()
		}
	})
})

// processaForm
app.post('/processaForm', (req,res)=>{
    let form = new formidable.IncomingForm()
    
	form.parse(req,(erro, fields, files)=>{
		let fenviado = files.ficheiro.path
        let fnovo = './uploaded/'+files.ficheiro.name
        console.log(fields)
        
		jsonfile.readFile(myBD,(erro, tarefas)=>{
			if(!erro){
                let currentdate = new Date(); 
                let data =  currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() 
                let hora = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()

                tarefas.push({nome:files.ficheiro.name, path:files.ficheiro.path, desc: fields.desc, data: data, hora: hora})
                
				jsonfile.writeFile(myBD, tarefas, erro =>{
					if(erro)
						console.log(erro)
					else
						console.log('Registo gravado com sucesso.')
				})
			}
        })
        
		fs.rename(fenviado, fnovo, err => {
			if(!err){
				res.write(pug.renderFile('./templates/ficheiro-recebido.pug',{ficheiro: files.ficheiro.name,status: 'Ficheiro recebido e guardado com sucesso'}))
				res.end()
			}
			else{
				res.write(pug.renderFile('./templates/erro.pug'), {e: 'Ocorreram erros no upload do ficheiro'})
				res.end()
			}
        })
        
	})

})

// ficheiros
app.get('/ficheiros', (req,res)=>{
	jsonfile.readFile(myBD, (erro, ficheiros)=>{
		if(!erro){
			res.write(pug.renderFile('./templates/ficheiros.pug', {lista: ficheiros}))
			res.end()
		}
		else{
			res.write(pug.renderFile('./templates/erro.pug', {e: "Erro: na lista da base de dados"}))
			res.end()
		}
	})
})

// server
let myServer = http.createServer(app)
myServer.listen(4000, ()=>{
	console.log('Servidor à escuta na porta 4000...')
})