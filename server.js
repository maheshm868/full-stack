const express = require('express'),
    dbOperations = require('./dbFiles/dbOperations'),
    cors = require('cors')

const API_PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.post('/api/employees', async (req, res) => {
    const response = await dbOperations
        .getEmployees()
        .then(({ recordset }) => recordset)
        .catch(er => console.error(er));
    res.send({ response });
});

app.post('/api/employee', async (req, res) => {
    const response = await dbOperations
        .createEmployee(req.body)
        .then(r => r)
        .catch(e => console.error(e))

    res.send({ response });
});

app.post('/api/deleteEmployee', async (req, res) => {
    const response = await dbOperations
        .deleteEmployee(req.body)
        .then(r => r)
        .catch(e => console.error(e))

    res.send({ response });
});

app.listen(API_PORT, () => console.info(`Listening on port ${API_PORT}`));