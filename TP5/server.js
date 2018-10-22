var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')

var reg_obra = /\/obra\//
var estilo = /w3\.css/

function getGroupedByTipo(infos) {
    var result = [];
    var obras = [];
    var tipo = "";

    infos.forEach(function(info) {
        if (info.tipo === tipo) {
            obras.push({_id: info._id, titulo: info.titulo});
        }
        else {
            if (tipo !== "") {
                result.push({tipo: tipo, obras: obras});
            }
            obras = [];
            tipo = info.tipo;
            obras.push({_id: info._id, titulo: info.titulo});
        }

    })

    return result;
}

var flag = 0;

http.createServer((req,res)=>{
    var obra_url = url.parse(req.url)
    
    if( (obra_url.pathname == '/')||(obra_url.pathname == '/index') ){
        res.writeHead(200, {'Content-Type': 'text/html'})
        
        if (flag === 0) {
            flag++;
            fs.readdir('obras/', (erro,ficheiros)=>{
                var infos = []
                for(var file=0;file<ficheiros.length;file++){
                    var dados = fs.readFileSync('obras/'+ficheiros[file])
                    var myObj = JSON.parse(dados);
                    var entrada = {_id: myObj._id, titulo:myObj.titulo, tipo:myObj.tipo}
                    infos.push(entrada)
                }
                
                infos.sort((a,b) => (a.tipo > b.tipo) ? 1 : ((b.tipo > a.tipo) ? -1 : 0))
                var col = getGroupedByTipo(infos);
                console.log("gerei index")
                fs.writeFileSync('./obras/index.json', JSON.stringify(col));  

                
                fs.readFile('./obras/index.json', 'utf8', (erro, dados)=>{
                    if(!erro)
                        res.write(pug.renderFile('index.pug', {ind: JSON.parse(dados)}))
                    else
                        res.write('<p><b>Erro: </b> ' + erro + '</p>')
                    res.end()
                })
            });
        }
        else {
            fs.readFile('./obras/index.json', 'utf8', (erro, dados)=>{
                if(!erro)
                    res.write(pug.renderFile('index.pug', {ind: JSON.parse(dados)}))
                else
                    res.write('<p><b>Erro: </b> ' + erro + '</p>')
                res.end()
            })
        }
    }
 
    else if( reg_obra.test(obra_url.pathname) ){
        var ficheiro = obra_url.pathname.split('/')[2]
        res.writeHead(200, {'Content-Type': 'text/html'})

        fs.readFile('obras/'+ ficheiro +'.json', (erro, dados)=>{
            if(!erro)
                res.write(pug.renderFile('template.pug', {obra: JSON.parse(dados)}))
            else
                res.write('<p><b>Erro: </b> ' + erro + '</p>')
            res.end()
        })
    }

    else if( estilo.test(obra_url.pathname) ){
        res.writeHead(200, {'Content-Type': 'text/css'})
        fs.readFile('estilo/w3.css', (erro, dados)=>{
            if(!erro)
                res.write(dados)
            else
                res.write('<p><b>Erro: </b> ' + erro + '</p>')
            res.end()
        })
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<p><b>Erro, pedido desconhecido: </b> ' + obra_url.pathname + '</p>')
        res.end()
    }
    
}).listen(5000, ()=>{
    console.log('Servidor à escuta na porta 5000...')
})