const express = require("express")
const server = express()
const db = require("./database/db.js")
// Configurando a pasta public

server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true //tira coisas antigas que estão guardadas

})






// Configurando caminhos da aplicação
//página inical
//req: requisição ou pedido
//res: resposta
server.get("/", (req, res) => {
   return res.render("index.html")
       
   
})
server.get("/create-point", (req, res) => {

   //req.query = nomes das Strings da url
   req.query



   return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
      const query = `
         INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
            ) VALUES (?,?,?,?,?,?,?);
         `
         const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items

      ]

         function afterInsertData(err) {
            if(err){
             console.log(err)
             return res.send("Erro no cadastro :(")
         }

            console.log("Cadastrado com Sucesso")
            console.log(this)

            return res.render("create-point.html", { saved: true })
         }

            db.run(query, values, afterInsertData)


})

server.get("/search", (req, res) => {
   
   const search = req.query.search
   

   if(search == ""){
      return res.render("search-results.html", {total: 0})
   }
    




   // pegando os dados da db

   db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
            if(err){
              return console.log(err)
              
            }
            console.log(rows)
            const total = rows.length
           return res.render("search-results.html", { places: rows, total})
      })
  



    
 })

// Ligar o servidor
server.listen(3000)
