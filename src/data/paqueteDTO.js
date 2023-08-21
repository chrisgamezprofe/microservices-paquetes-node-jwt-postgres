class PaqueteDTO {
  id;
  nombre_producto;
  codigo_seguimiento;
  compania_envio;
  direccion_envio;
  fecha_envio;
  estado;
  usuarioid;

  constructor(data) {
    this.id = data?.id;
    this.nombre_producto = data.nombre_producto;
    this.codigo_seguimiento = data.codigo_seguimiento;
    this.compania_envio = data.compania_envio;
    this.direccion_envio = data.direccion_envio;
    this.fecha_envio = data.fecha_envio;
    this.estado = data?.estado;
    this.usuarioid = data.usuarioid;
  }
}
module.exports = PaqueteDTO;
