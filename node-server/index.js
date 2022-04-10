const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path')
require('dotenv').config()

const app = express()

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.TRANSPORTER_USER, // generated ethereal user
    pass: process.env.TRANSPORTER_PASSWORD // generated ethereal password
  }
})

transporter.verify().then(() => {
  console.log('Ready to send email')
})

app.post('/', async (req, res) => {
  try {
    const { body } = req
    const { subject, message } = body

    const content = `
      <h2>${message}</h2>
    `

    let info = await transporter.sendMail({
      from: 'Mensaje deseado <jona03g97@gmail.com>', //Mensaje deseado para que no aparezca la direccion del remitente
      to: 'megabyte9703@gmail.com', //`megabyte9703@gmail.com, ...`
      subject: subject,
      html: content
    })

    if (!info.error) {
      res.send('Mensaje enviado')
    } else {
      console.log(error)
      res.send('Error al enviar el mensaje: ', info.error)
    }
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
})

app.listen(3000, () => console.log('Listen on http://localhost:3000'))
