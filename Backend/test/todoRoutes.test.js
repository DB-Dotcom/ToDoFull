import test from 'ava';
import supertest from 'supertest';
import app from '../app.js'; 

const request = supertest(app);
let token;

test.before(async t => {
  // Anmelden und Token für Authentifizierung abrufen
  const res = await request.post('/api/auth/login').send({
    username: 'testuser',
    password: 'password'
  });
  token = res.body.token;
});

test('Erstellen eines ToDo-Eintrags', async t => {
  const res = await request.post('/api/todos')
    .set('Authorization', `Bearer ${token}`)
    .send({ text: 'Test ToDo' });
  t.is(res.status, 201);
  t.truthy(res.body._id); // Stellen Sie sicher, dass eine ID zurückgegeben wird
});

test('Abrufen aller ToDo-Einträge', async t => {
  const res = await request.get('/api/todos')
    .set('Authorization', `Bearer ${token}`);
  t.is(res.status, 200);
  t.true(Array.isArray(res.body)); // Sollte ein Array sein
});

test('Aktualisieren eines ToDo-Eintrags', async t => {
  // Sie müssen zuerst ein ToDo erstellen oder eine bestehende ID verwenden
  const todoRes = await request.post('/api/todos')
    .set('Authorization', `Bearer ${token}`)
    .send({ text: 'Test ToDo' });
  const todoId = todoRes.body._id;

  const updateRes = await request.put(`/api/todos/${todoId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ text: 'Geändertes ToDo', completed: true });
  t.is(updateRes.status, 200);
  t.is(updateRes.body.text, 'Geändertes ToDo');
  t.true(updateRes.body.completed);
});

test('Löschen eines ToDo-Eintrags', async t => {
  // Sie müssen zuerst ein ToDo erstellen oder eine bestehende ID verwenden
  const todoRes = await request.post('/api/todos')
    .set('Authorization', `Bearer ${token}`)
    .send({ text: 'Zu löschendes ToDo' });
  const todoId = todoRes.body._id;

  const deleteRes = await request.delete(`/api/todos/${todoId}`)
    .set('Authorization', `Bearer ${token}`);
  t.is(deleteRes.status, 200);
});
