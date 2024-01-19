# ToDo-App API-Dokumentation

## Übersicht

Die ToDo-App API ermöglicht es Benutzern, Aufgaben (ToDos) zu verwalten. Die API unterstützt Operationen zum Erstellen, Abrufen, Aktualisieren und Löschen von ToDos sowie Benutzerregistrierung und -authentifizierung.

## Basis-URL



## Authentifizierung

Die meisten Endpunkte benötigen eine Authentifizierung. Ein gültiges JWT (JSON Web Token) muss im `Authorization`-Header als Bearer-Token gesendet werden.

---

## Endpunkte

### Benutzerregistrierung

- **URL:** `/auth/register`
- **Methode:** `POST`
- **Body:**
  - `username`: String (erforderlich)
  - `password`: String (erforderlich)
- **Erfolgsantwort:** `Status: 201`
- **Fehlerantwort:** `Status: 400` (Ungültige Anfrage), `Status: 500` (Serverfehler)

### Benutzeranmeldung

- **URL:** `/auth/login`
- **Methode:** `POST`
- **Body:**
  - `username`: String (erforderlich)
  - `password`: String (erforderlich)
- **Erfolgsantwort:** `Status: 200` und JWT im Body
- **Fehlerantwort:** `Status: 400` (Ungültige Anfrage), `Status: 500` (Serverfehler)

### ToDo erstellen

- **URL:** `/todos`
- **Methode:** `POST`
- **Header:** `Authorization: Bearer <Token>`
- **Body:**
  - `text`: String (erforderlich)
- **Erfolgsantwort:** `Status: 201` und erstelltes ToDo im Body
- **Fehlerantwort:** `Status: 400` (Ungültige Anfrage), `Status: 401` (Nicht autorisiert), `Status: 500` (Serverfehler)

### Alle ToDos abrufen

- **URL:** `/todos`
- **Methode:** `GET`
- **Header:** `Authorization: Bearer <Token>`
- **Erfolgsantwort:** `Status: 200` und Liste von ToDos im Body
- **Fehlerantwort:** `Status: 401` (Nicht autorisiert), `Status: 500` (Serverfehler)

### ToDo aktualisieren

- **URL:** `/todos/:id`
- **Methode:** `PUT`
- **Header:** `Authorization: Bearer <Token>`
- **Body:**
  - `text`: String
  - `completed`: Boolean
- **Erfolgsantwort:** `Status: 200` und aktualisiertes ToDo im Body
- **Fehlerantwort:** `Status: 400` (Ungültige Anfrage), `Status: 401` (Nicht autorisiert), `Status: 404` (Nicht gefunden), `Status: 500` (Serverfehler)

### ToDo löschen

- **URL:** `/todos/:id`
- **Methode:** `DELETE`
- **Header:** `Authorization: Bearer <Token>`
- **Erfolgsantwort:** `Status: 200`
- **Fehlerantwort:** `Status: 401` (Nicht autorisiert), `Status: 404` (Nicht gefunden), `Status: 500` (Serverfehler)

---

## Fehlercodes

Die API verwendet folgende Statuscodes:

- `200 OK`: Die Anfrage war erfolgreich.
- `201 Created`: Ein neues Ressource wurde erfolgreich erstellt.
- `400 Bad Request`: Die Anfrage war ungültig oder unvollständig.
- `401 Unauthorized`: Authentifizierung fehlgeschlagen oder nicht vorhanden.
- `404 Not Found`: Die angeforderte Ressource wurde nicht gefunden.
- `500 Internal Server Error`: Ein allgemeiner Serverfehler ist aufgetreten.
