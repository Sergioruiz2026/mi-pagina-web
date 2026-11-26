require("dotenv").config();

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const multer = require("multer");
const { rateLimit } = require("express-rate-limit");

const ROOT = __dirname;
const DATA_DIR = path.resolve(process.env.CMS_DATA_DIR || path.join(ROOT, "data"));
const UPLOAD_DIR = path.resolve(process.env.CMS_UPLOAD_DIR || path.join(ROOT, "uploads"));
const PORT = Number(process.env.PORT) || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const DEFAULT_CONTENT = {
  "site.name": "Ayekantún",
  "site.email": "ayekantunescuelapatinaje@gmail.com",
  "site.phone": "+56 9 9713 1557",
  "site.whatsapp": "56997131557",
  "site.address": "Quilpué, Región de Valparaíso, Chile",
  "site.instagram": "https://www.instagram.com/patinaje.ayekantun",
  "site.youtube": "https://www.youtube.com/channel/UCs8JTNBykzcqsRhGCOMl6Gg",
  "site.footer": "Escuela de Patinaje Artístico",
  "site.footerCopyright": "© 2017 Ayekantún - Escuela de Patinaje Artístico. Todos los derechos reservados.",
  "home.heroEyebrow": "Quilpué · Desde 2017",
  "home.heroTitle": "Ayekantún",
  "home.heroDescription": "Escuela de patinaje artístico: un club formativo y competitivo donde las niñas y niños crecen con disciplina, respeto y pasión.",
  "home.historyTitle": "Nacimos en Quilpué, patinando",
  "home.historyText": "El Club de Patinaje Artístico Ayekantún nació en enero de 2017. Desde entonces nos hemos consolidado como un referente formativo, participando en campeonatos nacionales con importantes resultados.",
  "home.historyDetail": "Somos un espacio seguro, inclusivo y formativo, donde se desarrollan habilidades deportivas y valores como el respeto, el trabajo en equipo y la perseverancia.",
  "home.missionTitle": "Misión",
  "home.missionText": "Formar deportistas y personas íntegras a través del patinaje artístico, en un ambiente de respeto, disciplina, compañerismo y pasión.",
  "home.visionTitle": "Visión",
  "home.visionText": "Ser un club reconocido por la excelencia en la formación de deportistas y contribuir al crecimiento del patinaje en la Región de Valparaíso.",
  "home.servicesTitle": "La Escuelita",
  "home.servicesText": "Un espacio de aprendizaje, alegría y crecimiento para niñas y niños que dan sus primeros pasos sobre ruedas.",
  "home.contactTitle": "¿Lista para patinar con nosotras?",
  "home.contactText": "Escríbenos y te contamos horarios, inscripciones y todo lo que necesitas saber. También publicamos novedades en nuestras redes.",
  "home.footerYear": "2026",
  "school.heroTitle": "La Escuelita",
  "school.heroText": "Un espacio de formación, alegría y crecimiento para niñas y niños.",
  "school.sectionTitle": "¿Qué es La Escuelita?",
  "school.intro": "La Escuelita es un espacio cercano donde las niñas y niños pueden aprender, moverse, expresarse y crecer con seguridad. Aquí se combina la disciplina del patinaje con la diversión, el compañerismo y el desarrollo personal.",
  "school.card1Title": "Aprendizaje divertido",
  "school.card1Text": "Cada clase está pensada para que los más pequeños aprendan con entusiasmo y confianza.",
  "school.card2Title": "Valores y compañerismo",
  "school.card2Text": "Promovemos el respeto, la disciplina y el trabajo en equipo desde el inicio.",
  "school.card3Title": "Crecimiento integral",
  "school.card3Text": "Fomentamos el desarrollo físico, emocional y social de cada niño y niña.",
  "school.card4Title": "Actividades recreativas",
  "school.card4Text": "Ofrecemos diversas actividades que permiten a los niños y niñas disfrutar y socializar.",
  "coach.heroTitle": "Nuestra Entrenadora",
  "coach.card1Title": "Profesional y Apasionada",
  "coach.card1Text": "Formadora de nuevas generaciones de patinadores y patinadoras.",
  "coach.card2Title": "Trabajo en Equipo",
  "coach.card2Text": "Cada entrenamiento está diseñado para crecer en técnica y confianza.",
  "coach.card2Detail": "La entrenadora guía a cada patinador y patinadora en su desarrollo personal y deportivo.",
  "coach.card2Values": "Su enfoque es fomentar la disciplina, la perseverancia y el amor por el patinaje.",
  "athletes.heroTitle": "Nuestras Deportistas",
  "athletes.heroText": "Conoce a las deportistas de Ayekantún y su pasión por el patinaje.",
  "athletes.sectionTitle": "Nuestro Equipo",
  "athletes.intro": "En Ayekantún creemos que cada deportista representa el esfuerzo, la disciplina, el respeto y el compañerismo. Cada entrenamiento y competencia es una oportunidad para crecer tanto en lo deportivo como en lo personal.",
  "gallery.heroTitle": "Galería de Ayekantún",
  "gallery.heroText": "Explora nuestros mejores momentos en pista y competencia.",
  "videos.heroTitle": "Videos del Club",
  "videos.heroText": "Observa los mejores momentos de nuestros entrenamientos y presentaciones.",
  "videos.sectionTitle": "Nuestros Videos",
  "videos.featuredTitle": "Video Destacado",
  "videos.featuredUrl": "https://www.youtube.com/embed/m3SA0aKc-Os",
  "live.heroTitle": "Transmisiones en Vivo",
  "live.heroText": "Disfruta de nuestras competencias y eventos destacados en tiempo real, desde cualquier dispositivo.",
  "live.playerTitle": "Competencia en directo",
  "live.playerText": "Sigue la acción en tiempo real y acompaña a nuestros deportistas.",
  "live.channelId": "UCs8JTNBykzcqsRhGCOMl6Gg",
  "live.upcomingTitle": "Próximas Transmisiones",
  "live.event1Title": "Open Internacional de Patinaje",
  "live.event1Date": "18 de agosto de 2026",
  "live.event1Time": "18:30 hrs",
  "live.event2Title": "Competencia Juvenil",
  "live.event2Date": "25 de agosto de 2026",
  "live.event2Time": "17:00 hrs",
  "live.event3Title": "Clínica de Patinaje Artístico",
  "live.event3Date": "01 de septiembre de 2026",
  "live.event3Time": "16:00 hrs",
  "live.replaysTitle": "Transmisiones Anteriores",
  "live.replay1Title": "Final de la semana",
  "live.replay1Text": "Competencia destacada del mes pasado.",
  "live.replay1Url": "https://www.youtube.com/",
  "live.replay2Title": "Reto de técnica",
  "live.replay2Text": "Momento clave del entrenamiento y evaluación.",
  "live.replay2Url": "https://www.youtube.com/",
  "contact.title": "Información de contacto",
  "contact.intro1": "Si deseas más información sobre nuestras clases, inscripciones o actividades, escríbenos y te responderemos pronto.",
  "contact.intro2": "También puedes seguirnos en nuestras redes sociales para mantenerte al día con nuestras últimas novedades.",
  "contact.locationTitle": "Ubicación",
  "contact.locationText": "Puedes encontrarnos en los siguientes lugares:",
  "contact.venue1": "Liceo Politecnico Marga Marga, Calle Cuatro Pinos 2159, Quilpué, Región de Valparaíso",
  "contact.venue2": "Estadio Municipal Villa Olímpica - Paicaví 0127, Quilpué, Región de Valparaíso",
  "contact.venue3": "Multicancha La Perlina, Del Nogal 1700, Quilpué, Región de Valparaíso",
  "contact.formTitle": "Formulario de Contacto",
  "contact.formText": "Completa el siguiente formulario y nos pondremos en contacto contigo pronto:",
  "thanks.title": "¡Gracias! — Inscripción recibida",
  "thanks.message": "Hemos recibido tu solicitud de inscripción en Ayekantún. Revisa tu correo electrónico; te contactaremos en un plazo máximo de 48 horas para confirmar la inscripción y los horarios.",
  "thanks.followUp": "Si no recibes respuesta, escríbenos a",
  ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [
    `athletes.card${i + 1}Name`,
    `athletes.card${i + 1}Description`,
    `media.athlete${i + 1}`
  ]).flatMap(([nameKey, descriptionKey, imageKey], i) => {
    const names = ["Leo", "Fio", "Mya", "Domi", "Pia", "Florencia", "Seli", "Isi", "Colomba", "Jose", "Anto", "Elo"];
    const descriptions = [
      "es una apasionada del patinaje artístico, destacando por su creatividad y precisión en cada presentación.",
      "Con una técnica impecable y un espíritu competitivo, inspira a sus compañeras a dar lo mejor de sí.",
      "es conocida por su dedicación y pasión por el patinaje, y por sus logros en competencia.",
      "es conocida por su elegancia y gracia en la pista, combinando técnica y expresión artística.",
      "se enfoca en la mejora continua, esforzándose por alcanzar nuevas metas en el patinaje.",
      "combina su amor por el patinaje con la disciplina y el trabajo en equipo.",
      "es una joven promesa del patinaje artístico, destacando por su creatividad y pasión.",
      "se esfuerza por superar sus límites y alcanzar nuevas metas en el patinaje.",
      "combina técnica y expresión artística con elegancia y gracia en la pista.",
      "combina su amor por el patinaje con la disciplina y el trabajo en equipo.",
      "es reconocida por su dedicación y constancia, comprometida con la excelencia.",
      "es reconocida por su dedicación y constancia, comprometida con la excelencia."
    ];
    const imageNames = ["leo (1).jpeg", "fio.jpg", "mya (1).jpeg", "domi.jpg", "pia (1).jpeg", "florencia.jpg", "seli (1).jpeg", "isi.jpg", "colo (1).jpeg", "jose.jpg", "anto.jpg", "elo (1).jpeg"];
    return [
      [nameKey, names[i]],
      [descriptionKey, `${names[i]} ${descriptions[i]}`],
      [imageKey, `fotos para pagina web/${imageNames[i]}`],
      [`athletes.card${i + 1}Music`, i === 2 ? "audio/mya.mpeg" : "audio/track.wav"]
    ];
  })),
  ...Object.fromEntries(Array.from({ length: 4 }, (_, i) => [
    `media.school${i + 1}`,
    `fotos para pagina web/escuelita${i + 1}.jpg`
  ])),
  ...Object.fromEntries(Array.from({ length: 2 }, (_, i) => [
    `media.coach${i + 1}`,
    `fotos para pagina web/${i === 0 ? "entrenadora.jpeg" : "entrenamiento.jpg"}`
  ])),
  ...Object.fromEntries([1, 2, 3, 4, 5, 20, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((photoNumber, i) => [
    `media.galleryPhoto${i + 1}`,
    `fotos para pagina web/gala2026 (${photoNumber}).jpg`
  ])),
  "enrollment.title": "Inscripciones",
  "enrollment.intro": "Las inscripciones están abiertas para quienes quieran formar parte de nuestra escuela de patinaje.",
  "enrollment.details": "La motivación de este formulario es recopilar información básica de contacto y detalles sobre la edad y nivel de interés de los aspirantes. Esto nos permitirá organizar mejor las clases y asegurarnos de que cada participante reciba la atención adecuada según su nivel y necesidades.",
  "enrollment.followUp": "Al enviar este formulario, nos pondremos en contacto contigo para confirmar tu inscripción y proporcionarte más detalles sobre los horarios y requisitos.",
  "enrollment.requirementsTitle": "¿Qué necesitas?",
  "enrollment.requirementOne": "Completar tus datos de contacto.",
  "enrollment.requirementTwo": "Indicar edad y nivel de interés.",
  "enrollment.formNotice": "Esta solicitud se enviará directamente mediante un servicio seguro.",
  "schedule.title": "Horarios",
  "schedule.intro": "Estos son nuestros horarios habituales para las clases de la escuelita.",
  "schedule.monday": "Lunes y miércoles: 4:00 PM - 6:00 PM",
  "schedule.tuesday": "Martes y jueves: 6:00 PM - 8:00 PM",
  "schedule.friday": "Viernes: 4:00 PM - 6:00 PM",
  "schedule.contact": "Si quieres confirmar un turno o consultar disponibilidad, contáctanos directamente.",
  "media.logo": "https://sergioruiz2026.github.io/mi-pagina-web/fotos%20para%20pagina%20web/logo.jpeg",
  "media.hero": "https://sergioruiz2026.github.io/mi-pagina-web/fotos%20para%20pagina%20web/grupo.jpeg",
  "media.about": "https://sergioruiz2026.github.io/mi-pagina-web/fotos%20para%20pagina%20web/gala2026%20(1).jpg",
  "media.gallery1": "https://sergioruiz2026.github.io/mi-pagina-web/fotos%20para%20pagina%20web/grupo.jpeg",
  "media.gallery2": "https://sergioruiz2026.github.io/mi-pagina-web/fotos%20para%20pagina%20web/grupo2.jpeg",
  "media.gallery3": "https://sergioruiz2026.github.io/mi-pagina-web/fotos%20para%20pagina%20web/grupo3.jpg",
  "media.gallery4": "https://sergioruiz2026.github.io/mi-pagina-web/fotos%20para%20pagina%20web/logo.jpeg",
};

if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
  throw new Error("Configura SESSION_SECRET con al menos 32 caracteres en el archivo .env.");
}

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, "site.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL UNIQUE,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS sessions (
    sid TEXT PRIMARY KEY,
    sess TEXT NOT NULL,
    expired INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS sessions_expired_idx ON sessions(expired);
`);

const addDefault = db.prepare("INSERT OR IGNORE INTO content (key, value) VALUES (?, ?)");
const addDefaults = db.transaction(() => {
  for (const [key, value] of Object.entries(DEFAULT_CONTENT)) addDefault.run(key, value);
});
addDefaults();

class SQLiteSessionStore extends session.Store {
  constructor(database) {
    super();
    this.selectSession = database.prepare("SELECT sess, expired FROM sessions WHERE sid = ?");
    this.saveSession = database.prepare(`
      INSERT INTO sessions (sid, sess, expired) VALUES (?, ?, ?)
      ON CONFLICT(sid) DO UPDATE SET sess = excluded.sess, expired = excluded.expired
    `);
    this.deleteSession = database.prepare("DELETE FROM sessions WHERE sid = ?");
    this.updateExpiry = database.prepare("UPDATE sessions SET expired = ? WHERE sid = ?");
  }

  get(sid, callback) {
    try {
      const row = this.selectSession.get(sid);
      if (!row || row.expired <= Date.now()) {
        if (row) this.deleteSession.run(sid);
        return callback(null, null);
      }
      callback(null, JSON.parse(row.sess));
    } catch (error) {
      callback(error);
    }
  }

  set(sid, value, callback = () => {}) {
    try {
      const expiry = value.cookie && value.cookie.expires
        ? new Date(value.cookie.expires).getTime()
        : Date.now() + (Number(value.cookie && value.cookie.maxAge) || 24 * 60 * 60 * 1000);
      this.saveSession.run(sid, JSON.stringify(value), expiry);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  destroy(sid, callback = () => {}) {
    try {
      this.deleteSession.run(sid);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  touch(sid, value, callback = () => {}) {
    try {
      const expiry = value.cookie && value.cookie.expires
        ? new Date(value.cookie.expires).getTime()
        : Date.now() + (Number(value.cookie && value.cookie.maxAge) || 24 * 60 * 60 * 1000);
      this.updateExpiry.run(expiry, sid);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}

const app = express();
if (process.env.TRUST_PROXY === "1") app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      mediaSrc: ["'self'", "blob:", "https:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      connectSrc: ["'self'", "https://www.googleapis.com", "https://www.youtube.com"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://www.youtube-nocookie.com"],
      formAction: ["'self'", "https://formsubmit.co"]
    }
  },
  crossOriginEmbedderPolicy: false
}));
app.use(express.json({ limit: "100kb" }));
app.use(session({
  store: new SQLiteSessionStore(db),
  name: "ayekantun.sid",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 8 * 60 * 60 * 1000
  }
}));

app.get("/admin", (req, res) => res.sendFile(path.join(ROOT, "admin.html")));

const readAllContent = () => Object.fromEntries(
  db.prepare("SELECT key, value FROM content").all().map(({ key, value }) => [key, value])
);
const isDynamicContentKey = (key) => {
  const match = key.match(/^(?:athletes\.card\d+(?:Name|Description|Music)|school\.card\d+(?:Title|Text)|coach\.card\d+(?:Title|Text)|schedule\.extra\d+(?:Day|Time)|media\.(?:athlete\d+|school\d+|coach\d+|galleryPhoto\d+|homePhoto\d+)|live\.(?:event\d+(?:Title|Date|Time)|replay\d+(?:Title|Text|Url))|contact\.venue\d+)$/);
  if (!match) return false;
  return [...key.matchAll(/\d+/g)].every(([index]) => Number(index) >= 1 && Number(index) <= 100);
};
const requireAdmin = (req, res, next) => {
  if (!req.session.adminId) return res.status(401).json({ error: "Inicia sesión para continuar." });
  next();
};
const requireCsrf = (req, res, next) => {
  if (!req.session.csrfToken || req.get("X-CSRF-Token") !== req.session.csrfToken) {
    return res.status(403).json({ error: "La sesión expiró o la solicitud no es válida. Recarga la página." });
  }
  next();
};
const localRequestOnly = (req, res, next) => {
  const origin = req.get("Origin");
  if (origin && origin !== `${req.protocol}://${req.get("host")}`) {
    return res.status(403).json({ error: "Origen de solicitud no permitido." });
  }
  next();
};
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Demasiados intentos. Espera 15 minutos e inténtalo nuevamente." }
});

app.get("/api/site", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ content: readAllContent() });
});

app.get("/api/admin/csrf", (req, res) => {
  req.session.csrfToken ||= crypto.randomBytes(32).toString("hex");
  res.json({ csrfToken: req.session.csrfToken });
});

app.post("/api/admin/login", localRequestOnly, loginLimiter, requireCsrf, async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (typeof username !== "string" || typeof password !== "string" || username.length > 100 || password.length > 200) {
      return res.status(400).json({ error: "Ingresa tu usuario y contraseña." });
    }
    const user = db.prepare("SELECT id, password_hash FROM admin_users WHERE username = ?").get(username.trim());
    const valid = user ? await bcrypt.compare(password, user.password_hash) : false;
    if (!valid) return res.status(401).json({ error: "Usuario o contraseña incorrectos." });
    req.session.regenerate((error) => {
      if (error) return next(error);
      req.session.adminId = user.id;
      req.session.csrfToken = crypto.randomBytes(32).toString("hex");
      req.session.save((saveError) => {
        if (saveError) return next(saveError);
        res.json({ csrfToken: req.session.csrfToken, username: username.trim() });
      });
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/session", requireAdmin, (req, res) => {
  const user = db.prepare("SELECT username FROM admin_users WHERE id = ?").get(req.session.adminId);
  if (!user) {
    return req.session.destroy((error) => {
      if (error) return res.status(500).json({ error: "No se pudo validar la sesión." });
      res.status(401).json({ error: "Inicia sesión para continuar." });
    });
  }
  res.json({ username: user.username, csrfToken: req.session.csrfToken });
});

app.post("/api/admin/logout", localRequestOnly, requireAdmin, requireCsrf, (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("ayekantun.sid", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });
    res.json({ message: "Sesión cerrada." });
  });
});

app.put("/api/admin/content", localRequestOnly, requireAdmin, requireCsrf, (req, res) => {
  const values = req.body && req.body.content;
  if (!values || typeof values !== "object" || Array.isArray(values)) {
    return res.status(400).json({ error: "El contenido enviado no es válido." });
  }
  const permitted = new Set(Object.keys(DEFAULT_CONTENT));
  const save = db.prepare(`
    INSERT INTO content (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);
  try {
    const update = db.transaction(() => {
      for (const [key, value] of Object.entries(values)) {
        if ((!permitted.has(key) && !isDynamicContentKey(key)) || typeof value !== "string" || value.length > 5000) {
          throw new Error(`Campo no válido: ${key}`);
        }
        const cleaned = value.trim();
        if (["site.name", "site.email", "site.whatsapp"].includes(key) && !cleaned) {
          throw new Error("Completa el nombre, correo y WhatsApp para mantener activos los datos de contacto.");
        }
        if ((key.startsWith("media.") || key.endsWith("Music")) && cleaned &&
          !(/^https:\/\//i.test(cleaned) || /^\/uploads\/[a-f0-9-]+\.(jpg|jpeg|png|webp|gif|mp3|ogg)$/i.test(cleaned) ||
            /^fotos para pagina web\/[\w ().-]+\.(jpg|jpeg|png|webp|gif)$/i.test(cleaned) ||
            /^audio\/[\w ().-]+\.(mp3|ogg|mpeg|wav)$/i.test(cleaned))) {
          throw new Error("Usa un archivo de audio del sitio, un enlace HTTPS o un archivo subido aquí.");
        }
        if (key.endsWith("Url") && cleaned && !/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(cleaned)) {
          throw new Error("Los videos y las repeticiones deben usar un enlace válido de YouTube.");
        }
        if (["site.instagram", "site.youtube"].includes(key) && cleaned && !/^https:\/\//i.test(cleaned)) {
          throw new Error("Los enlaces de redes sociales deben comenzar con https://.");
        }
        if (key === "site.email" && cleaned && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
          throw new Error("Ingresa un correo electrónico válido.");
        }
        if (key === "site.whatsapp" && cleaned && !/^\d{8,15}$/.test(cleaned)) {
          throw new Error("WhatsApp debe tener entre 8 y 15 dígitos, incluido el código de país.");
        }
        save.run(key, cleaned);
      }
    });
    update();
    res.json({ content: readAllContent(), message: "Cambios guardados exitosamente." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const allowedUploads = new Map([
  [".jpg", "image/jpeg"], [".jpeg", "image/jpeg"], [".png", "image/png"],
  [".webp", "image/webp"], [".gif", "image/gif"],
  [".mp3", "audio/mpeg"], [".ogg", "audio/ogg"]
]);
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, callback) => callback(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`)
  }),
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
  fileFilter: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (allowedUploads.get(extension) !== file.mimetype) {
      return callback(new Error("Tipo de archivo no permitido. Usa JPG, PNG, WEBP, GIF, MP3 u OGG."));
    }
    callback(null, true);
  }
});

app.get("/api/admin/media", requireAdmin, (req, res) => {
  res.json(db.prepare("SELECT id, original_name AS originalName, mime_type AS mimeType, created_at AS createdAt, '/uploads/' || filename AS url FROM media ORDER BY created_at DESC").all());
});

app.post("/api/admin/media", localRequestOnly, requireAdmin, requireCsrf, (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      const status = error instanceof multer.MulterError ? 400 : 400;
      return res.status(status).json({ error: error.message });
    }
    if (!req.file) return res.status(400).json({ error: "Selecciona un archivo para subir." });
    const id = crypto.randomUUID();
    db.prepare("INSERT INTO media (id, filename, original_name, mime_type) VALUES (?, ?, ?, ?)")
      .run(id, req.file.filename, path.basename(req.file.originalname), req.file.mimetype);
    res.status(201).json({
      id,
      originalName: path.basename(req.file.originalname),
      mimeType: req.file.mimetype,
      url: `/uploads/${req.file.filename}`
    });
  });
});

app.delete("/api/admin/media/:id", localRequestOnly, requireAdmin, requireCsrf, (req, res) => {
  const media = db.prepare("SELECT filename FROM media WHERE id = ?").get(req.params.id);
  if (!media) return res.status(404).json({ error: "El archivo ya no existe." });
  try {
    fs.unlinkSync(path.join(UPLOAD_DIR, media.filename));
  } catch (error) {
    if (error.code !== "ENOENT") return res.status(500).json({ error: "No se pudo borrar el archivo. Inténtalo nuevamente." });
  }
  const remove = db.transaction(() => {
    db.prepare("UPDATE content SET value = '', updated_at = CURRENT_TIMESTAMP WHERE value = ?").run(`/uploads/${media.filename}`);
    db.prepare("DELETE FROM media WHERE id = ?").run(req.params.id);
  });
  remove();
  res.json({ message: "Archivo eliminado." });
});

app.use("/uploads", express.static(UPLOAD_DIR, {
  dotfiles: "deny",
  index: false,
  fallthrough: false,
  setHeaders: (res) => res.set("X-Content-Type-Options", "nosniff")
}));

const publicJs = new Set(["main.js", "script.js", "cms-client.js", "admin.js", "back-to-top.js"]);
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  const relative = decodeURIComponent(req.path).replace(/^\/+/, "");
  const parts = relative.split(/[\\/]+/);
  const extension = path.extname(relative).toLowerCase();
  const isSitePage = parts.length === 1 && (extension === ".html" || extension === ".css");
  const isAllowedScript = parts.length === 1 && extension === ".js" && publicJs.has(parts[0]);
  const isSiteAsset = parts.length > 1 &&
    (parts[0] === "fotos para pagina web" || parts[0] === "audio") &&
    [".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp3", ".mpeg", ".wav", ".ogg"].includes(extension);
  if (relative && !isSitePage && !isAllowedScript && !isSiteAsset) {
    return res.status(404).send("No encontrado");
  }
  express.static(ROOT, { dotfiles: "deny", index: "index.html", fallthrough: true })(req, res, next);
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(error.status || 500).json({
    error: error.status && error.status < 500 ? error.message : "Ocurrió un error interno. Inténtalo nuevamente."
  });
});

app.listen(PORT, () => {
  console.log(`Ayekantún CMS disponible en http://localhost:${PORT}`);
});

setInterval(() => {
  db.prepare("DELETE FROM sessions WHERE expired <= ?").run(Date.now());
}, 60 * 60 * 1000).unref();
