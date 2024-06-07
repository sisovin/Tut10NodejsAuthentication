const express = require('express');
const router = express.Router();
// Nevigate to the controller
const employeesController = require('../../controllers/employeesController');

router.route('/')
    // To retrieve all records, use GET method
    .get(employeesController.getAllEmployees)
    // To add a new record, use POST method
    .post(employeesController.createNewEmployee)
    // To update a record, use PUT method
    .put(employeesController.updateEmployee)
    // To delete a record, use DELETE method
    .delete(employeesController.deleteEmployee);

router.route('/:id')
    // To retrieve a record by id, use GET method
    .get(employeesController.getEmployeeById);

module.exports = router;