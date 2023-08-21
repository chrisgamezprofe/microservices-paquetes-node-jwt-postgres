const Sequalize = require("sequelize");
const sequelize = require("../utils/database");

const PaqueteSchema = sequelize.define("paquete", {
  id: {
    type: Sequalize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre_producto: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  codigo_seguimiento: {
    type: Sequalize.STRING,
    unique: true,
    allowNull: false,
  },
  compania_envio: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  direccion_envio: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  fecha_envio: {
    type: Sequalize.DATE,
    allowNull: false,
  },
  estado: {
    type: Sequalize.STRING,
    defaultValue: "CREADO",
  },
  usuarioid: {
    type: Sequalize.INTEGER,
    allowNull: false,
  },
});
module.exports = PaqueteSchema;
