import test from 'ava';
import supertest from 'supertest';
import app from '../app.js'; // Pfad zu Ihrer Server-App

const request = supertest(app);
let token;
let todoId;

// Benutzerregistrierung
test.serial('Registrierung eines neuen Benutzers', async t => {
  const res = await request.post('/api/auth/register').send({
    username: 'testuser',
    password: 'password'
  });
  t.is(res.status, 201);
});

// Benutzeranmeldung
test.serial('Anmeldung eines Benutzers', async t => {
  const res = await request.post('/api/auth/login').send({
    username: 'testuser',
    password: 'password'
  });
  t.is(res.status, 200);
  token = res.body.token; // Token für nachfolgende Anfragen speichern
});

// Erstellen eines neuen ToDos
test.serial('Erstellen eines neuen ToDos', async t => {
  const res = await request.post('/api/todos')
    .set('Authorization', `Bearer ${token}`)
    .send({ text: 'Test ToDo' });
  t.is(res.status, 201);
  todoId = res.body._id; // ToDo-ID für nachfolgende Tests speichern
});

// Abrufen aller ToDos
test.serial('Abrufen aller ToDos', async t => {
  const res = await request.get('/api/todos')
    .set('Authorization', `Bearer ${token}`);
  t.is(res.status, 200);
  t.true(Array.isArray(res.body));
});

// Aktualisieren eines ToDo
test.serial('Aktualisieren eines ToDo', async t => {
  const res = await request.put(`/api/todos/${todoId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ text: 'Geändertes Test ToDo', completed: true });
  t.is(res.status, 200);
  t.is(res.body.text, 'Geändertes Test ToDo');
});

// Löschen eines ToDo
test.serial('Löschen eines ToDo', async t => {
  const res = await request.delete(`/api/todos/${todoId}`)
    .set('Authorization', `Bearer ${token}`);
  t.is(res.status, 200);
});
