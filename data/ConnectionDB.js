const { Client } = require('pg');

class ConnectionDB {
  constructor() {
    this.client = new Client({
      user: "postgres",
      password: "2122",  
      host: "localhost",
      port: 5432,
      database: "EDUPLANPRO"
    });
  }

  async connect() {
    try {
      // Conexión a la base de datos
      await this.client.connect();
      console.log("Conexión exitosa a la base de datos");
      return this.client; 
    } catch (error) {
      console.error(`Error de conexión: ${error}`);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.client.end(); // Cierra la conexión
      console.log("Conexión cerrada con éxito");
    } catch (error) {
      console.error(`Error al cerrar la conexión: ${error}`);
    }
  }
}

// Exportamos una instancia de la clase ConnectionDB
module.exports = ConnectionDB;
