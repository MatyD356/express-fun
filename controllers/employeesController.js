import EmployeeSchema from "../model/Employee.js";

const getAllEmployees = async (req, res) => {
  const employees = await EmployeeSchema.find();
  if (!employees) {
    return res.status(204).json({ message: "No employeess found" });
  }
  res.json(employees);
};

const getEmployee = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const employee = await EmployeeSchema.findById(req.params.id);
  return employee
    ? res.json(employee)
    : res.status(404).json({ error: "Employee not found" });
};

const createEmployee = async (req, res) => {
  if (!req.body?.firstName || !req.body?.lastName) {
    return res
      .status(400)
      .json({ error: "Please provide first name and last name" });
  }
  try {
    const result = await EmployeeSchema.create({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req.body?.id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const employee = await EmployeeSchema.findById(req.body.id);
  if (!employee) {
    return res.status(400).json({ error: "Employee not found" });
  }
  if (req.body?.firstName) {
    employee.firstname = req.body.firstName;
  }
  if (req.body?.lastName) {
    employee.lastname = req.body.lastName;
  }
  try {
    const result = await employee.save();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteEmployee = async (req, res) => {
  if (!req.body?.id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const employee = await EmployeeSchema.findById(req.body.id);
  if (!employee) {
    return res.status(400).json({ error: "Employee not found" });
  }
  const result = await employee.deleteOne({ _id: req.body.id });

  res.json(result);
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
