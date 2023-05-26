const config = require("./dbConfig"),
    sql = require('mssql');


const getEmployees = async () => {
    try {
        let pool = await sql.connect(config);
        let employees = pool.request().query('SELECT * FROM Employees Order By ID Desc');
        return employees
    } catch (error) {
        console.error('Error in getEmployees', error)
    }
}

const createEmployee = async (Employee) => {
    try {
        let pool = await sql.connect(config);
        let query = '';
        if (Employee?.ID > 0) {
            query = `UPDATE Employees SET FirstName = '${Employee.FirstName}', LastName = '${Employee.LastName}', Gender='${Employee.Gender}', Email='${Employee.Email}', Counrty='${Employee.Counrty}', Salary = ${Employee.Salary} WHERE ID = ${Employee.ID}`;
        } else {
            query = `Insert INTO Employees (FirstName,LastName,Gender,Email,Salary,Counrty) Values ('${Employee.FirstName}', '${Employee.LastName}', '${Employee.Gender}', '${Employee.Email}',${Employee.Salary}, '${Employee.Counrty}')`;
        }
        let employees = pool.request().query(query);
        return employees;
    } catch (error) {
        console.error('error in createEmployee -> ', error)
    }
}

const deleteEmployee = async (Employee) => {
    try {
        let pool = await sql.connect(config);
        console.log(Employee)
        let response = pool.request().query(`DELETE from Employees Where ID = ${Employee.ID}`);
        return response
    } catch (error) {
        console.error('Error in Deleting Employees', error)
    }
}


module.exports = {
    getEmployees,
    createEmployee,
    deleteEmployee
}