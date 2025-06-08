const { Client } = require('pg');

class ConnectionDB {
  constructor() {
    this.client = new Client({
      user: "postgres",
      password: "123",  
      host: "postgres",
      port: 5432,
      database: "EDUPLANPRO"
    });
    this.connected = false;
  }

  async connect() {
    if (!this.connected) {
      try {
        await this.client.connect();
        this.connected = true;
        //console.log("Conexión exitosa a la base de datos");
      } catch (error) {
        console.error(`Error de conexión: ${error.message}`);
        throw error;
      }
    }
    return this.client;
  }

  async disconnect() {
    if (this.connected) {
      try {
        await this.client.end();
        this.connected = false;
        //console.log("Conexión cerrada con éxito");
      } catch (error) {
        console.error(`Error al cerrar la conexión: ${error.message}`);
      }
    }
  }
}

module.exports = ConnectionDB;
