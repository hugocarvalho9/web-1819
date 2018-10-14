"use strict"

let http = require('http')
let url = require('url')
let fs = require('fs')

http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/html'})
    let myObj = url.parse(req.url, true)

    if (myObj.pathname === "/index" || myObj.pathname === "/") {
        fs.readFile('website/index.html', (err, dados)=> {
            if (!err) {
                res.write(dados)
            }
            else {
                res.write('<p><b>Erro</b>'+err+'</p>')
            }
            res.end()
        })
    }
    
    else if (myObj.pathname === "/arqelem") {
        fs.readFile('website/html/'+myObj.query.id+'.html', (err, dados) => {
            if (!err) {
                res.write(dados)
            }
            else {
                res.write('<p><b>Erro</b>'+err+'</p>')
            }
            res.end()
        })
    }

}).listen(4000,()=>{
	console.log('Servidor à escuta na porta 4000...')
})




