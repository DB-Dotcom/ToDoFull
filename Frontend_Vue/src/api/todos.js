const API_BASE_URL = 'http://localhost:3000/todos'; // Ändern Sie dies entsprechend Ihrer Backend-URL

// Funktion zum Abrufen aller ToDos
export const fetchTodos = async (token) => {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

// Funktion zum Hinzufügen eines neuen ToDo
export const addTodo = async (token, todoText) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: todoText })
  });
  return response.json();
};

// Funktion zum Aktualisieren eines ToDo
export const updateTodo = async (token, todoId, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/${todoId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  });
  return response.json();
};

// Funktion zum Löschen eines ToDo
export const deleteTodo = async (token, todoId) => {
  const response = await fetch(`${API_BASE_URL}/${todoId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};
