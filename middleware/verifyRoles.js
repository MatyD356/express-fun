const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const rolesArray = [...allowedRoles];
    const { roles } = req;
    console.log(rolesArray, roles);
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val);
    if (!result) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

export default verifyRoles;
