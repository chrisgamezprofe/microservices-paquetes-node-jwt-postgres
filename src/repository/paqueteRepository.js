
class PaqueteRepository {
  constructor(model) {
    this.paqueteModel = model;
  }

  add(paquete) {
    return this.paqueteModel.create(paquete);
  }

  list(usuario) {
    return this.usuarioModel.findAll();
  }

  getByCodigoSeguimiento(paquete) {
    return this.paqueteModel.findOne({
      where: {
        codigo_seguimiento: paquete.codigo_seguimiento,
      },
    });
  }

  getById(id) {
    return this.paqueteModel.findOne({
      where: {
        id: id,
      },
    });
  }
  getByEstado(estado) {
    return this.paqueteModel.findAll({
      where: {
        estado: estado,
      },
    });
  }

  update(paquete) {
    const { id } = paquete;
    delete paquete.id;
    return this.paqueteModel.update(paquete, {
      where: {
        id: parseInt(id),
      },
    });
  }

  getByUsuario(paquete) {
    return this.paqueteModel.findAll({
      where: {
        usuarioid: paquete.usuarioid,
      },
    });
  }
}

module.exports={
    PaqueteRepository
}