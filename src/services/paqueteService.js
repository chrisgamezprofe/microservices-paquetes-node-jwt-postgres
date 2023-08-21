//const bcrypt = require('bcrypt');
const uuid = require('uuid');
const PaqueteDTO = require('./../data/paqueteDTO');

class PaqueteService {
  constructor(paqueteRepository) {
    this.repository = paqueteRepository;
  }

  async updatePaquete(req) {
    const data = new PaqueteDTO(req.body);
    data.id = req.param("id");
    let paquete = await this.repository.update(data);
    return paquete[0];
  }

  async addPaquete(req) {
    const data = new PaqueteDTO(req.body);
    data.codigo_seguimiento = `${uuid.v4()}-${data.usuarioid}`;
    let paquete = await this.repository.add(data);
    paquete = new PaqueteDTO(paquete);
    return paquete;
  }

  async list() {
    let usuarios = await this.repository.list();
    usuarios = usuarios.map((u) => {
      u.password = "***************";
      u = new UsuarioDTO(u);
      return u;
    });
    return usuarios;
  }

  async getByCodigo(req) {
    const data = new PaqueteDTO({ codigo_seguimiento: req.param("codigo") });
    let paquete = await this.repository.getByCodigoSeguimiento(data);

    paquete = new PaqueteDTO(paquete);
    return paquete;
  }

  async getById(id) {
    let paquete = await this.repository.getById(id);

    paquete = new PaqueteDTO(paquete);
    return paquete;
  }

  async getByEstado(estado) {
    let paquete = await this.repository.getByEstado(estado);

    paquete = paquete.map((p) => new PaqueteDTO(p));
    return paquete;
  }

  async getByUsuario(req) {
    const data = new PaqueteDTO({ usuarioid: req.param("usuarioid") });
    let paquete = await this.repository.getByUsuario(data);

    paquete = paquete.map((p) => new PaqueteDTO(p));

    return paquete;
  }
}

;
module.exports = {
  PaqueteService,
};