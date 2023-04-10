import express from 'express';

const app = express()

app.use((req, res, next) => {
  console.log('Requête reçue')
  next()
})

app.use((req, res) => {
  console.log('Réponse envoyée avec succès')
})

export default app