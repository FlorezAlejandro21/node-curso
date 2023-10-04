import fs from "fs";
import axios from "axios";

class Busqueda {
  historial = [];
  dbPath = "./db/data.json";
  constructor() {
    this.leerDB();
  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  get lugarCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras.map((p) => p[0].toUpperCase() + p.substring(1));

      return palabras.join(" ");
    });
  }

  async ciudad(lugar = "") {
    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox,
      });

      const response = await intance.get();
      return response.data.features.map((data) => ({
        id: data.id,
        nombre: data.place_name,
        longitud: data.center[0],
        latitud: data.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const intance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: {
          lat,
          lon,
          ...this.paramsWeather,
        },
      });
      const { weather, main } = (await intance.get()).data;
      return {
        descripcion: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log("El clima de la ciudad no fue encontrado", error);
    }
  }

  async agregarHistorial(lugar) {
    this.historial.includes(lugar.toLocaleLowerCase())
      ? this.historial
      : this.historial.unshift(lugar.toLocaleLowerCase());

    this.historial = this.historial.splice(0, 5);
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (fs.existsSync(this.dbPath)) {
      const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
      const { historial } = JSON.parse(info);
      this.historial = historial;
    }
  }
}

export { Busqueda };
