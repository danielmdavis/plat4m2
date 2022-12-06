const { Client } = require("pg");
require('dotenv').config();

const credentials = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: false
}

async function getAllProps() {
  const client = new Client(credentials)
  await client.connect()
  const now = await client.query('SELECT * FROM propositions;')
  await client.end()
  return now
}

async function getOneProp(id) {
  const client = new Client(credentials)
  await client.connect()
  const now = await client.query('SELECT * FROM propositions WHERE propositions.id =\''+id+'\';')
  await client.end()
  return now
}

async function getAddenda() {
  const client = new Client(credentials)
  await client.connect()
  const now = await client.query('SELECT * FROM propositions INNER JOIN addenda ON propositions.id = addenda.prop_id;')
  await client.end()
  return now
}

exports.getAllProps = getAllProps
exports.getOneProp = getOneProp
exports.getAddenda = getAddenda