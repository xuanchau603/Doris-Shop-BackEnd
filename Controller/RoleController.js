const { RoleModel } = require("../Model");

const RoleController = {
  getRole: async (req, res) => {
    if (req.params.id) {
      try {
        const Role = await RoleModel.findByPk(req.params.id);
        if (Role) {
          res.status(200).json(Role);
        } else {
          res.status(404).json("Not Found");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      try {
        const listRole = await RoleModel.findAll();
        res.status(200).json(listRole);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  },
  createRole: async (req, res) => {
    try {
      const data = {
        role_Name: req.body.role_Name,
        role_Description: req.body.role_Description,
      };
      //Check Role
      const role = await RoleModel.findOne({
        where: { role_Name: req.body.role_Name },
      });
      if (role) {
        res.status(400).json("This role is already exist");
      } else {
        //Create
        const newRole = await RoleModel.create({
          role_Name: data.role_Name,
          role_Description: data.role_Description,
        });
        res.status(200).json(newRole);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = RoleController;
