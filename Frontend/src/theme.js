import { createMuiTheme } from '@material-ui/core/styles';

// Erstellen eines benutzerdefinierten Themes
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',  // Primärfarbe für Ihre Anwendung
    },
    secondary: {
      main: '#19857b',  // Sekundärfarbe für Ihre Anwendung
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    // Hier können Sie benutzerdefinierte Typografie-Optionen definieren
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  // Weitere benutzerdefinierte Optionen können hier hinzugefügt werden
});

export default theme;
