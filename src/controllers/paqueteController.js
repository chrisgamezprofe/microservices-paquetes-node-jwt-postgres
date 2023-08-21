const { PaqueteService } = require('./../services/paqueteService');
const { PaqueteRepository } = require("./../repository/paqueteRepository");

const PaqueteModel = require("./../schemas/paquete");

const paqueteRepository = new PaqueteRepository(PaqueteModel);
const paqueteService = new PaqueteService(paqueteRepository);

//const jwt = require('jsonwebtoken');
//const bcrypt = require("bcrypt");
const PaqueteDTO = require('./../data/paqueteDTO');
const axios = require("axios")
const { CREADO,ENTREGADO,FINAL_ROAD,ENVIADO } = require('./../utils/constants')

exports.add = async (req, res, next) => {
  try {
    //verificar usuario
    const header = req.headers["authorization"];
    if (header) {
      const token = header.split(" ")[1];
      //http://localhost:3000/api/v1/usuario/1
      const URL = process.env.AUTH_URL;
      const usuario = await axios.get(`${URL}/usuario/${req.body.usuarioid}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(usuario);
      if (usuario) {
        const response = await paqueteService.addPaquete(req);

        return res.json(response);
      } else {
        return res.status(403).json();
      }
    } else {
      return res.status(403).json();
    }
  } catch (error) {
    if (error.parent) {
      return res.status(400).json({ menssage: error?.parent.detail });
    } else {
      const miError = JSON.stringify(error);
      const { status, message } = JSON.parse(miError);
      return res.status(status ?? 400).json({ message });
    }
  }
};

exports.update = async (req, res, next) => {
  
  try {
    
    //verificar usuario
    const header = req.headers["authorization"];
    
    if (header) {
      
      const token = header.split(" ")[1];
      //http://localhost:3000/api/v1/usuario/1
      const URL = process.env.AUTH_URL;
      
      let usuario = await axios.get(`${URL}/usuario/${req.body.usuarioid}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      usuario = usuario.data
      if (usuario) {
        //CREADO - ENVIADO - FINAL_ROAD - ENTREGADO
        const existe = await paqueteService.getById(req.param("id"));
        const estadoNuevo = req.body?.estado
        if (existe) {
          const { estado } = existe
          switch (estado) {
            case CREADO:
              if (estadoNuevo !== "ENVIADO" && estadoNuevo !== "CREADO")
                return res
                  .status(400)
                  .json({ message: "El estado debe ser ENVIADO" });
              break;
            case ENVIADO:
              if (estadoNuevo !== "FINAL_ROAD")
                return res
                  .status(400)
                  .json({ message: "El estado debe ser FINAL_ROAD" });
              break;
            case FINAL_ROAD:
              if (estadoNuevo !== "ENTREGADO")
                return res
                  .status(400)
                  .json({ message: "El estado debe ser ENTREGADO" });
              break;

            case ENTREGADO:
                return res
                  .status(400)
                  .json({
                    message:
                      "El paquete Ya no se puede modificar en  estado ENTREGADO",
                  });
              break;
          }
        }
        const response = await paqueteService.updatePaquete(req);
        if (response) {
          return res.json({ message: "Paquete actualizado" });
        } else {
          return res.status(400).json({ message: "No existe el Paquete" });
        }
      } else {
        return res.status(403).json();
      }
    } else {
      return res.status(403).json();
    }
  } catch (error) {
    if (error.parent) {
      return res.status(400).json({ menssage: error?.parent.detail });
    } else {
      const miError = JSON.stringify(error);
      const { status, message } = JSON.parse(miError);
      return res.status(status ?? 400).json({ message });
    }
  }
};


exports.list = async (req, res, next) => {
    try {

      const response = await usuarioService.list();
        res.json(response);
  } catch (error) {
    return res.status(400).json({ menssage: error.parent.detail });
  }
};

exports.getByCodigo = async (req, res, next) => {
  try {
    let response = await paqueteService.getByCodigo(req);
    if (response) {
      return res.json(response);
    } else {
      return res.status(400).json();
    }
  } catch (error) {
    return res.status(400).json({ menssage: error.parent.detail });
  }
};

exports.getByUsuario = async (req, res, next) => {
  try {
    let response = await paqueteService.getByUsuario(req);
    if (response) {
      return res.json(response);
    } else {
      return res.status(400).json();
    }
  } catch (error) {
    return res.status(400).json({ menssage: error.parent.detail });
  }
};

exports.getByEstado = async (req, res, next) => {
  const myEstado = req.body?.estado;
  if (
    myEstado != CREADO &&
    myEstado != ENTREGADO &&
    myEstado != FINAL_ROAD &&
    myEstado != ENVIADO
  ) {
    return res.status(400).json({ menssage: "Estado no válido" });
  }
    try {
      let response = await paqueteService.getByEstado(myEstado);
      if (response) {
        return res.json(response);
      } else {
        return res.status(400).json();
      }
    } catch (error) {
      return res.status(400).json({ menssage: error.parent.detail });
    }
};