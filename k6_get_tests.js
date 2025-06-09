import http from 'k6/http';
import { check, group } from 'k6';

export let options = {
  vus: 150,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
  },
};

const BASE_URL = 'http://localhost:3001';
const CREDENTIALS = {
  idcard: 'root',
  password: 'root',
};

export default function () {
  group('Iniciar sesión', function () {
    let loginRes = http.post(`${BASE_URL}/session`, JSON.stringify(CREDENTIALS), {
      headers: { 'Content-Type': 'application/json' },
    });

    check(loginRes, {
      'Inicio de sesión exitoso': (r) => r.status === 200 && r.json('code') === '200',
    });

    let cookie = loginRes.headers['Set-Cookie'];

    let headers = {
      headers: {
        'Cookie': cookie,
      },
    };

    //pruebas de rendimiento de kendall
    group('GET /session kendall', function () {
      let res = http.get(`${BASE_URL}/session`, headers);
      check(res, {
        'GET /session responde 200': (r) => r.status === 200 && r.json('code') === '200',
      });
    });

    //pruebas de rendimiento de brayan
    group('GET /faculty brayan', function () {
      let res = http.get(`${BASE_URL}/faculty`, headers);
      check(res, {
        'GET /faculty responde 200': (r) => r.status === 200 && r.json('code') === '200',
      });
    });

    //prueba de rendimineto de ceasar
    group('GET /school ceasar', function () {
      let res = http.get(`${BASE_URL}/school`, headers);
      check(res, {
        'GET /school responde 200': (r) => r.status === 200 && r.json('code') === '200',
      });
    });

    //pruebas de rendimineto de carlos
    group('GET /rol carlos', function () {
      let res = http.get(`${BASE_URL}/rol`, headers);
      check(res, {
        'GET /rol responde 200': (r) => r.status === 200 && r.json('code') === '200',
      });
    });

    //pruebas de rendimiento de david
    group('GET /preferences david', function () {
      let res = http.get(`${BASE_URL}/preferences`, headers);
      check(res, {
        'GET /preferences responde 200': (r) => r.status === 200 && r.json('code') === '200',
      });
    });
  });
}