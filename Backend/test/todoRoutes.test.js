// test/todoRoutes.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js'; // Pfad zur Hauptdatei Ihrer App

const { expect } = chai;
chai.use(chaiHttp);

let token, todoId;

describe('ToDo-Routen', () => {
  // Einloggen und Token holen
  before((done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  // Test für das Erstellen eines ToDo-Eintrags
  it('sollte ein neues ToDo erstellen', (done) => {
    chai.request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Test ToDo' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        todoId = res.body._id; // Speichere die ID für spätere Tests
        done();
      });
  });

  // Test für das Abrufen aller ToDos
  it('sollte alle ToDos abrufen', (done) => {
    chai.request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test für das Aktualisieren eines ToDo-Eintrags
  it('sollte ein ToDo aktualisieren', (done) => {
    chai.request(app)
      .put(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Geändertes Test ToDo', completed: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test für das Löschen eines ToDo-Eintrags
  it('sollte ein ToDo löschen', (done) => {
    chai.request(app)
      .delete(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
