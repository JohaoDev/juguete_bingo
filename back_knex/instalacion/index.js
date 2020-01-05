;
let entorno = require('./configuracion/entorno'),
  
app = require('./app')

entorno.initVar()

app.listen(process.env.PORT, () => {
  console.log(`El servidor está funcionando en el puerto: ${ process.env.PORT }`)
})