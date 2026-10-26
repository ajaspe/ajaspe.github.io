// What's new in each version, newest first: shown when you click the version number in the menu.
// The first entry is the current version. Only the main changes, in every language;
// CHANGELOG.md has the details. Date and time of the release (local time); the page only shows the
// latest one's.
const CHANGELOG = [
  {
    version: "2.0.4",
    date: "2026-10-26 16:27",
    changes: {
      en: ["Our own icon in the browser tab and on the phone's home screen"],
      es: ["Nuestro propio icono en la pestaña del navegador y en la pantalla de inicio del móvil"],
      it: ["La nostra icona nella scheda del browser e nella schermata home del telefono"],
      de: ["Unser eigenes Symbol im Browser-Tab und auf dem Startbildschirm des Handys"],
    },
  },
  {
    version: "2.0.3",
    date: "2026-10-26 15:41",
    changes: {
      en: ["New How to play: a shooting animation and the power-ups at a glance", "Smaller Settings, no scrolling, and an About button in the menu"],
      es: ["Nuevo Cómo jugar: animación del tiro y power-ups de un vistazo", "Ajustes más compactos, sin scroll, y un botón Quiénes somos en el menú"],
      it: ["Nuovo Come si gioca: animazione del tiro e power-up a colpo d'occhio", "Impostazioni più compatte, senza scroll, e un pulsante Chi siamo nel menu"],
      de: ["Neue Spielanleitung: Schuss-Animation und Power-ups auf einen Blick", "Kompaktere Einstellungen ohne Scrollen und ein Über-uns-Knopf im Menü"],
    },
  },
  {
    version: "2.0.2",
    date: "2026-10-26 14:58",
    changes: {
      en: [
        "Your name on the start screen, your team's name in Settings: «Martín's Red Rockets»",
        "Simpler settings: no commentator choice (the sound switch still mutes it)",
      ],
      es: [
        "Tu nombre en la pantalla de inicio y el de tu equipo en Ajustes: «Cohetes Rojos de Martín»",
        "Ajustes más sencillos: sin elegir comentarista (el sonido lo sigue silenciando)",
      ],
      it: [
        "Il tuo nome nella schermata iniziale, quello della squadra nelle Impostazioni: «Razzi Rossi di Martín»",
        "Impostazioni più semplici: niente scelta del telecronista (l'audio lo silenzia ancora)",
      ],
      de: [
        "Dein Name auf dem Startbildschirm, der Name deines Teams in den Einstellungen: «Rote Raketen von Martín»",
        "Einfachere Einstellungen: keine Kommentator-Auswahl (der Ton schaltet ihn weiter stumm)",
      ],
    },
  },
  {
    version: "2.0.1",
    date: "2026-10-26 11:41",
    changes: {
      en: ["Click the version number to see what's new"],
      es: ["Pulsa el número de versión para ver las novedades"],
      it: ["Tocca il numero di versione per vedere le novità"],
      de: ["Tippe auf die Versionsnummer, um die Neuigkeiten zu sehen"],
    },
  },
  {
    version: "2.0.0",
    date: "2026-10-26 11:13",
    changes: {
      en: [
        "Smarter computer: it looks for its best shot, even off the walls",
        "Type your name: your team carries it",
        "New power-ups: Mega chips, Cannon and Defence wall",
        "Ball Frenzy gauge and the Armageball tie-break",
        "A commentator with feelings",
        "Online matches with a ranking (beta)",
        "Italian and German",
      ],
      es: [
        "Ordenador más listo: busca su mejor tiro, incluso al rebote",
        "Escribe tu nombre: tu equipo lo lleva",
        "Nuevos power-ups: Mega chapas, Cañonazo y Muro de defensa",
        "Balanza en el Ball Frenzy y desempate Armageball",
        "Comentarista con emoción",
        "Partidos online con ranking (beta)",
        "Italiano y alemán",
      ],
      it: [
        "Computer più furbo: cerca il tiro migliore, anche di sponda",
        "Scrivi il tuo nome: la tua squadra lo porta",
        "Nuovi power-up: Mega pedine, Cannonata e Muro di difesa",
        "Bilancia nel Ball Frenzy e spareggio Armageball",
        "Telecronista con emozione",
        "Partite online con classifica (beta)",
        "Italiano e tedesco",
      ],
      de: [
        "Schlauerer Computer: sucht den besten Schuss, auch über die Bande",
        "Schreib deinen Namen: dein Team trägt ihn",
        "Neue Power-ups: Mega-Steine, Kanonenschuss und Abwehrmauer",
        "Waage beim Ball Frenzy und Armageball-Tiebreak",
        "Kommentator mit Gefühl",
        "Online-Spiele mit Rangliste (Beta)",
        "Italienisch und Deutsch",
      ],
    },
  },
  {
    version: "1.1",
    date: "2026-10-17 14:42",
    changes: {
      en: ["No more scrolling: the game fits the screen"],
      es: ["Sin scroll: el juego cabe en la pantalla"],
      it: ["Niente scroll: il gioco sta nello schermo"],
      de: ["Kein Scrollen mehr: das Spiel passt auf den Bildschirm"],
    },
  },
  {
    version: "1.0",
    date: "2026-10-17 14:03",
    changes: {
      en: ["The first version we love, made together step by step"],
      es: ["La primera versión que nos encanta, hecha juntos paso a paso"],
      it: ["La prima versione che amiamo, fatta insieme passo dopo passo"],
      de: ["Die erste Version, die wir lieben, Schritt für Schritt zusammen gemacht"],
    },
  },
];

const GAME_VERSION = CHANGELOG[0].version;
