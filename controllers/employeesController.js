// The routes for employees data
const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

// API endpoints for employees
// GET /api/employees - Retrieve all employees
const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

// POST /api/employees - Add/create a new employee
const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

// PUT /api/employees - Update an employee
const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
   if (!employee) {
       return res.status(404).json({
           "message": `Employee ID ${req.body.id} not found.`
       });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unSortedArray = [...filteredArray, employee];
    data.setEmployees(unSortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.status(200).json(data.employees);
}

// DELETE /api/employees - Delete an employee
const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({
            "message": `Employee ID ${req.body.id} not found`
        });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.status(200).json(data.employees);    
}

// GET /api/employees/:id - Retrieve an employee by id
const getEmployeeById = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({
            "message": `Employee ID ${req.params.id} not found.`
        });
    }
    res.status(200).json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
}
