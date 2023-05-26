const config = require("./dbConfig"),
    sql = require('mssql');

const getEmployees = async () => {
    try {
        let pool = await sql.connect(config);
        let employees = pool.request().query('SELECT * FROM Employees Order By ID Desc');
        return employees;
    } catch (error) {
        console.error('Error in getEmployees', error);
    }
}

const capFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const createEmployee = async (Employee) => {
    try {
        let pool = await sql.connect(config);
        let query = '';
        if (Employee?.ID > 0) {
            query = `UPDATE Employees SET FirstName = '${Employee.FirstName}', 
            LastName = '${capFirstLetter(Employee.LastName)}', 
            Gender='${capFirstLetter(Employee.Gender)}', 
            Email='${Employee.Email.toLowerCase()}', 
            Counrty='${capFirstLetter(Employee.Counrty)}', 
            Salary = ${Employee.Salary} 
            WHERE Email = ${Employee.ID}`;
        } else {
            query = `Insert INTO Employees 
            (FirstName,LastName,Gender,Email,Salary,Counrty) Values 
            ('${capFirstLetter(Employee.FirstName)}', 
            '${capFirstLetter(Employee.LastName)}', 
            '${capFirstLetter(Employee.Gender)}', 
            '${Employee.Email.toLowerCase()}',
             ${Employee.Salary}, 
            '${capFirstLetter(Employee.Counrty)}')`;
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
};