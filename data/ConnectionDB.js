const { Client } = require('pg');

class ConnectionDB {
  constructor() {
    this.client = new Client({
      user: "postgres",
      password: "123",
      host: "localhost",
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
      } catch (error1) {
        console.error(`Primer intento fallido: ${error1.message}`);

        try {
          this.client.host = "postgres";
          console.warn("Intentando conexión con host 'postgres'...");
          await this.client.connect();
          this.connected = true;
        } catch (error2) {
          console.error(`Segundo intento fallido: ${error2.message}`);
          throw new Error("No se pudo conectar a la base de datos.");
        }
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
