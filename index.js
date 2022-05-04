const express = require("express")
const MercadoPago = require("mercadopago")
const app = express()

const port = process.env.PORT || 3000

MercadoPago.configure({
  sandbox: true,
  access_token: "TEST-1359976839163755-050321-68c10f5e932d6b0ebddcb6a3fb52f466-326201614"
})

app.get("/", (req, res) => {
  res.send("Olá mundo!")
})

app.get("/pagar", async (req, res) => {

  var id = "" + Date.now()
  var emailDoPagador = "gustavo.top@gmail.com"
  var dados = {
    items: [
      item = {
        id: id,
        title: "2x video games; 3x camisas",
        quantity: 1,
        currency_id: 'BRL',
        unit_price: parseFloat(1)
      }
    ],
    payer: {
      email: emailDoPagador
    },
    external_reference: id,
  }

  try {
    var pagamento = await MercadoPago.preferences.create(dados)
    console.log(pagamento)
    console.log("sucess")
    //Salvar pagamento, passando id da compra, e email do pagador 
    return res.redirect(pagamento.body.init_point)
  } catch (err) {
    return res.send(err.message)
  }

})

app.post("/not", (req, res) => {
  console.log(req.query)
  res.send("Ok")
})

app.listen(port, (req, res) => {
  console.log("Servidor rodando")
})