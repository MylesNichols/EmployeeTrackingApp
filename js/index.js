// Import the necessary modules
const inquirer = require('inquirer');
const sequelize = require('sequelize');
const connection = require('../config/connection');

const mainMenu = async () => {
    // Prompt the user with a list of choices
    const answer = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all roles',
        'View all departments',
        'Add employee',
        'Add role',
        'Add department',
        'Update employee role',
        'Quit'
      ]
    });
  
    // When the user selects a choice, call the corresponding function
    switch (answer.action) {
      case 'View all employees':
        viewEmployees();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all departments':
        viewDepartments();
        break;
      case 'Add employee':
        addEmployee();
        break;
      case 'Add role':
        addRole();
        break;
      case 'Add department':
        addDepartment();
        break;
      case 'Update employee role':
        updateEmployeeRole();
        break;
      case 'Quit':
        // End the database connection
        connection.end();
        break;
      default:
        console.log('Invalid selection.');
        mainMenu();
        break;
    }
  };
  
// Define the function to show all employees
const viewEmployees = () => {
  // Query the database for all employees
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    // Display the results in a table
    consoleTable(res);
    // Return to the main menu
    mainMenu();
  });
};

// Define the function to show all roles
const viewRoles = () => {
  // Query the database for all roles
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    // Display the results in a table
    consoleTable(res);
    // Return to the main menu
    mainMenu();
  });
};

// Define the function to show all departments
const viewDepartments = () => {
  // Query the database for all departments
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    // Display the results in a table
    consoleTable(res);
    // Return to the main menu
    mainMenu();
  });
};

// Define the function to add a new employee
const addEmployee = () => {
  // Prompt the user for information about the new employee
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: "What is the employee's first name?"
    },
    {
      name: 'last_name',
      type: 'input',
      message: "What is the employee's last name?"
    },
    {
      name: 'role_id',
      type: 'input',
      message: "What is the employee's role id?"
    },
    {
      name: 'manager_id',
      type: 'input',
      message: "What is the employee's manager id?"
    }
  ])
  // Insert the new employee into the database
  .then((answer) => {
    connection.query('INSERT INTO employee SET ?', answer, (err) => {
      if (err) throw err;
      console.log('Employee added successfully!');
    });
});
};

const updateEmployeeRole = () => {
    try {
      const answer = inquirer.prompt([
        {
          name: 'employee_id',
          type: 'input',
          message: 'What is the id of the employee whose role you would like to update?'
        },
        {
          name: 'new_role_id',
          type: 'input',
          message: 'What is the new role id for this employee?'
        }
      ]);

    connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.new_role_id, answer.employee_id]);
      console.log('Employee role updated successfully!');
      mainMenu();
    } catch (err) {
      console.error(err);
    }
  };
  
mainMenu();
  
