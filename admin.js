(() => {
  const homeFields = [
    ["home.heroEyebrow", "Texto pequeño del encabezado"],
    ["home.heroTitle", "Título principal"],
    ["home.heroDescription", "Descripción principal", "wide"],
    ["home.historyTitle", "Título: nuestra historia"],
    ["home.historyText", "Descripción: nuestra historia", "wide"],
    ["home.historyDetail", "Texto adicional: nuestra historia", "wide"],
    ["home.missionTitle", "Título del servicio: misión"],
    ["home.missionText", "Descripción del servicio: misión", "wide"],
    ["home.visionTitle", "Título del servicio: visión"],
    ["home.visionText", "Descripción del servicio: visión", "wide"],
    ["home.servicesTitle", "Título del servicio: la escuelita"],
    ["home.servicesText", "Descripción del servicio: la escuelita", "wide"],
    ["home.contactTitle", "Título de contacto"],
    ["home.contactText", "Descripción de contacto", "wide"],
    ["home.footerYear", "Año del pie de página"]
  ];
  const schoolFields = () => [
    ["school.heroTitle", "Título de portada"],
    ["school.heroText", "Descripción de portada", "wide"],
    ["school.sectionTitle", "Título de sección"],
    ["school.intro", "Presentación de La Escuelita", "wide"],
    ...Array.from({ length: getRecordCount(/^school\.card(\d+)Title$/, 4) }, (_, i) => [
      `school.card${i + 1}Title`, `school.card${i + 1}Text`
    ]).flatMap(([titleKey, textKey], i) => [
      [titleKey, `Actividad ${i + 1}: título`],
      [textKey, `Actividad ${i + 1}: descripción`, "wide"]
    ])
  ];
  const enrollmentFields = [
    ["enrollment.title", "Título de inscripciones"],
    ["enrollment.intro", "Introducción de inscripciones", "wide"],
    ["enrollment.details", "Descripción del formulario", "wide"],
    ["enrollment.followUp", "Mensaje después de enviar", "wide"],
    ["enrollment.requirementsTitle", "Título de requisitos"],
    ["enrollment.requirementOne", "Requisito 1", "wide"],
    ["enrollment.requirementTwo", "Requisito 2", "wide"],
    ["enrollment.formNotice", "Aviso del formulario", "wide"]
  ];
  const athleteFields = () => [
    ["athletes.heroTitle", "Título de portada"],
    ["athletes.heroText", "Descripción de portada", "wide"],
    ["athletes.sectionTitle", "Título del equipo"],
    ["athletes.intro", "Presentación del equipo", "wide"],
    ...Array.from({ length: getRecordCount(/^athletes\.card(\d+)Name$/, 12) }, (_, i) => [
      [`athletes.card${i + 1}Name`, `Deportista ${i + 1}: nombre`],
      [`athletes.card${i + 1}Description`, `Deportista ${i + 1}: descripción`, "wide"]
    ]).flat()
  ];
  const coachFields = () => [
    ["coach.heroTitle", "Título de portada"],
    ["coach.card1Title", "Presentación: título"],
    ["coach.card1Text", "Presentación: descripción", "wide"],
    ["coach.card2Title", "Trabajo en equipo: título"],
    ["coach.card2Text", "Trabajo en equipo: descripción", "wide"],
    ["coach.card2Detail", "Trabajo en equipo: detalle", "wide"],
    ["coach.card2Values", "Valores y formación", "wide"],
    ...Array.from({ length: Math.max(0, getRecordCount(/^coach\.card(\d+)Title$/, 2) - 2) }, (_, i) => [
      [`coach.card${i + 3}Title`, `Sección ${i + 3}: título`],
      [`coach.card${i + 3}Text`, `Sección ${i + 3}: descripción`, "wide"]
    ]).flat()
  ];
  const galleryFields = [
    ["gallery.heroTitle", "Título de portada"],
    ["gallery.heroText", "Descripción de la galería", "wide"]
  ];
  const videoFields = [
    ["videos.heroTitle", "Videos: título de portada"],
    ["videos.heroText", "Videos: descripción", "wide"],
    ["videos.sectionTitle", "Videos: título de sección"],
    ["videos.featuredTitle", "Video destacado: título"],
    ["videos.featuredUrl", "Video destacado: enlace de YouTube", "wide"]
  ];
  const scheduleFields = () => [
    ["schedule.title", "Título de horarios"],
    ["schedule.intro", "Introducción de horarios", "wide"],
    ["schedule.monday", "Horario de lunes y miércoles", "wide"],
    ["schedule.tuesday", "Horario de martes y jueves", "wide"],
    ["schedule.friday", "Horario de viernes", "wide"],
    ["schedule.contact", "Mensaje de contacto para confirmar horarios", "wide"],
    ...Array.from({ length: getRecordCount(/^schedule\.extra(\d+)Day$/, 0) }, (_, i) => [
      [`schedule.extra${i + 1}Day`, `Horario adicional ${i + 1}: día o grupo`],
      [`schedule.extra${i + 1}Time`, `Horario adicional ${i + 1}: horario`]
    ]).flat()
  ];
  const contactFields = [
    ["site.name", "Nombre de la escuela"],
    ["site.email", "Correo electrónico"],
    ["site.phone", "Teléfono visible"],
    ["site.whatsapp", "WhatsApp (código de país y número, solo dígitos)"],
    ["site.address", "Dirección"],
    ["site.instagram", "Enlace de Instagram"],
    ["site.youtube", "Enlace de YouTube"],
    ["site.footer", "Descripción de la escuela"],
    ["site.footerCopyright", "Texto de derechos de autor", "wide"]
  ];
  const locationFields = () => [
    ["contact.title", "Contacto: título de información"],
    ["contact.intro1", "Contacto: introducción", "wide"],
    ["contact.intro2", "Contacto: redes sociales", "wide"],
    ["contact.locationTitle", "Ubicación: título"],
    ["contact.locationText", "Ubicación: descripción", "wide"],
    ...Array.from({ length: getRecordCount(/^contact\.venue(\d+)$/, 3) }, (_, i) => [`contact.venue${i + 1}`, `Dirección ${i + 1}`, "wide"]),
    ["contact.formTitle", "Formulario: título"],
    ["contact.formText", "Formulario: descripción", "wide"]
  ];
  const thanksFields = [
    ["thanks.title", "Título de confirmación"],
    ["thanks.message", "Mensaje de confirmación", "wide"],
    ["thanks.followUp", "Mensaje de contacto", "wide"]
  ];
  const imageFields = () => [
    ["media.logo", "Logotipo"],
    ["media.hero", "Imagen de portada"],
    ["media.about", "Imagen de nuestra historia"],
    ...Array.from({ length: getRecordCount(/^school\.card(\d+)Title$/, 4) }, (_, i) => [`media.school${i + 1}`, `La Escuelita: foto ${i + 1}`]),
    ["media.coach1", "Entrenadora: foto de perfil"],
    ["media.coach2", "Entrenadora: foto de entrenamiento"],
    ...Array.from({ length: Math.max(0, getRecordCount(/^coach\.card(\d+)Title$/, 2) - 2) }, (_, i) => [`media.coach${i + 3}`, `Entrenadora: foto de sección ${i + 3}`]),
    ...Array.from({ length: getRecordCount(/^athletes\.card(\d+)Name$/, 12) }, (_, i) => [`media.athlete${i + 1}`, `Deportista ${i + 1}: foto`]),
    ...Array.from({ length: getRecordCount(/^media\.galleryPhoto(\d+)$/, 19) }, (_, i) => [`media.galleryPhoto${i + 1}`, `Galería: foto ${i + 1}`]),
    ["media.gallery1", "Inicio: foto de galería 1"],
    ["media.gallery2", "Inicio: foto de galería 2"],
    ["media.gallery3", "Inicio: foto de galería 3"],
    ["media.gallery4", "Inicio: foto de galería 4"],
    ...Array.from({ length: getRecordCount(/^media\.homePhoto(\d+)$/, 4) - 4 }, (_, i) => [`media.homePhoto${i + 5}`, `Inicio: foto adicional ${i + 1}`])
  ];

  const loginView = document.querySelector("#login-view");
  const editorView = document.querySelector("#editor-view");
  const loginMessage = document.querySelector("#login-message");
  const editorMessage = document.querySelector("#editor-message");
  const loginForm = document.querySelector("#login-form");
  const contentForm = document.querySelector("#content-form");
  const logoutButton = document.querySelector("#logout");
  const mediaLibrary = document.querySelector("#media-library");
  let csrfToken = "";
  let content = {};

  function getRecordCount(pattern, minimum) {
    const indexes = Object.keys(content).map((key) => key.match(pattern)).filter(Boolean).map((match) => Number(match[1]));
    return Math.max(minimum, ...indexes);
  }

  function getLiveFields() {
    return [
      ["live.heroTitle", "En vivo: título de portada"],
      ["live.heroText", "En vivo: descripción", "wide"],
      ["live.playerTitle", "Reproductor: título"],
      ["live.playerText", "Reproductor: descripción", "wide"],
      ["live.channelId", "Canal de YouTube para la transmisión"],
      ["live.upcomingTitle", "Título de próximos eventos"],
      ...Array.from({ length: getRecordCount(/^live\.event(\d+)Title$/, 3) }, (_, i) => [
        [`live.event${i + 1}Title`, `Evento ${i + 1}: nombre`],
        [`live.event${i + 1}Date`, `Evento ${i + 1}: fecha`],
        [`live.event${i + 1}Time`, `Evento ${i + 1}: hora`]
      ]).flat(),
      ["live.replaysTitle", "Título de repeticiones"],
      ...Array.from({ length: getRecordCount(/^live\.replay(\d+)Title$/, 2) }, (_, i) => [
        [`live.replay${i + 1}Title`, `Repetición ${i + 1}: título`],
        [`live.replay${i + 1}Text`, `Repetición ${i + 1}: descripción`, "wide"],
        [`live.replay${i + 1}Url`, `Repetición ${i + 1}: enlace de YouTube`, "wide"]
      ]).flat()
    ];
  }

  async function request(url, options = {}) {
    const headers = new Headers(options.headers || {});
    if (csrfToken && options.method && options.method !== "GET") headers.set("X-CSRF-Token", csrfToken);
    if (options.body && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
    const response = await fetch(url, { credentials: "same-origin", ...options, headers });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "No se pudo completar la solicitud.");
    return body;
  }

  function showMessage(element, text, isError = false) {
    element.textContent = text;
    if (element === editorMessage) {
      element.className = `toast ${isError ? "error" : "success"}`;
      window.setTimeout(() => {
        if (element.textContent === text) element.className = "toast";
      }, 5000);
    }
  }

  function createTextField([key, label, size]) {
    const wrapper = document.createElement("label");
    if (size === "wide") wrapper.classList.add("wide");
    wrapper.append(document.createTextNode(label));
    const lowerLabel = label.toLowerCase();
    const multiline = ["descripción", "pie", "introducción", "mensaje", "detalle", "texto"].some((word) => lowerLabel.includes(word));
    const field = document.createElement(multiline ? "textarea" : "input");
    field.name = key;
    field.maxLength = 5000;
    if (key === "site.email") field.type = "email";
    if (key === "site.instagram" || key === "site.youtube" || key.endsWith("Url")) field.type = "url";
    if (["site.name", "site.email", "site.whatsapp"].includes(key)) field.required = true;
    if (key === "site.whatsapp") {
      field.inputMode = "numeric";
      field.maxLength = 15;
    }
    field.value = content[key] || "";
    wrapper.append(field);
    return wrapper;
  }

  function renderTextFields() {
    for (const [target, fields] of [
      ["#home-fields", homeFields],
      ["#school-fields", schoolFields()],
      ["#page-fields", enrollmentFields],
      ["#athlete-fields", athleteFields()],
      ["#coach-fields", coachFields()],
      ["#gallery-fields", galleryFields],
      ["#video-fields", videoFields],
      ["#live-fields", getLiveFields()],
      ["#schedule-fields", scheduleFields()],
      ["#contact-fields", contactFields],
      ["#location-fields", locationFields()],
      ["#thanks-fields", thanksFields]
    ]) {
      const container = document.querySelector(target);
      container.replaceChildren(...fields.map(createTextField));
    }
  }

  function renderImages() {
    const container = document.querySelector("#image-fields");
    container.replaceChildren();
    for (const [key, title] of imageFields()) {
      const card = document.createElement("article");
      card.className = "media-card";
      const label = document.createElement("label");
      label.textContent = title;
      const value = document.createElement("input");
      value.type = "hidden";
      value.name = key;
      value.value = content[key] || "";
      const preview = document.createElement("div");
      preview.className = "preview";
      const previewImage = document.createElement("img");
      previewImage.alt = `Vista previa: ${title.toLowerCase()}`;
      previewImage.hidden = !value.value;
      if (value.value) previewImage.src = value.value;
      preview.append(previewImage);
      const placeholder = document.createElement("span");
      placeholder.textContent = value.value ? "" : "Sin imagen";
      preview.append(placeholder);
      const uploadLabel = document.createElement("label");
      uploadLabel.className = "file-button";
      uploadLabel.append(document.createTextNode("Elegir imagen"));
      const file = document.createElement("input");
      file.type = "file";
      file.accept = ".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif";
      file.addEventListener("change", async () => {
        if (!file.files || !file.files[0]) return;
        const localPreview = URL.createObjectURL(file.files[0]);
        previewImage.src = localPreview;
        previewImage.hidden = false;
        placeholder.textContent = "Subiendo archivo…";
        try {
          const uploaded = await uploadFile(file.files[0]);
          value.value = uploaded.url;
          previewImage.src = uploaded.url;
          placeholder.textContent = "";
          showMessage(editorMessage, `${title} lista. Guarda los cambios para publicarla.`);
          await loadMedia();
        } catch (error) {
          previewImage.hidden = !value.value;
          previewImage.src = value.value || "";
          placeholder.textContent = value.value ? "" : "Sin imagen";
          showMessage(editorMessage, error.message, true);
        } finally {
          URL.revokeObjectURL(localPreview);
          file.value = "";
        }
      });
      uploadLabel.append(file);
      const clearButton = document.createElement("button");
      clearButton.className = "delete-button";
      clearButton.type = "button";
      clearButton.textContent = "Quitar imagen";
      clearButton.addEventListener("click", () => {
        value.value = "";
        previewImage.removeAttribute("src");
        previewImage.hidden = true;
        placeholder.textContent = "Sin imagen";
      });
      label.append(value);
      card.append(label, preview, uploadLabel, clearButton);
      container.append(card);
    }
  }

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    return request("/api/admin/media", { method: "POST", body: formData });
  }

  function renderAthleteMusicFields() {
    const container = document.querySelector("#athlete-music-fields");
    container.replaceChildren();
    for (let index = 1; index <= getRecordCount(/^athletes\.card(\d+)Name$/, 12); index += 1) {
      const key = `athletes.card${index}Music`;
      const card = document.createElement("article");
      card.className = "music-card";
      const title = document.createElement("h4");
      const nameInput = contentForm.elements.namedItem(`athletes.card${index}Name`);
      const updateTitle = () => {
        title.textContent = `Deportista ${index}: ${nameInput.value || "sin nombre"}`;
      };
      updateTitle();
      nameInput.addEventListener("input", updateTitle);

      const urlLabel = document.createElement("label");
      urlLabel.textContent = "Enlace de la canción";
      const value = document.createElement("input");
      value.type = "text";
      value.name = key;
      value.maxLength = 5000;
      value.placeholder = "https://… o ruta de una canción del sitio";
      value.value = content[key] || "";
      const preview = document.createElement("audio");
      preview.controls = true;
      preview.hidden = !value.value;
      if (value.value) preview.src = value.value;
      value.addEventListener("input", () => {
        preview.hidden = !value.value.trim();
        if (value.value.trim()) preview.src = value.value.trim();
        else preview.removeAttribute("src");
      });
      urlLabel.append(value);

      const uploadLabel = document.createElement("label");
      uploadLabel.className = "file-button";
      uploadLabel.append(document.createTextNode("Subir o reemplazar canción"));
      const file = document.createElement("input");
      file.type = "file";
      file.accept = ".mp3,.ogg,audio/mpeg,audio/ogg";
      const status = document.createElement("span");
      status.className = "muted";
      status.textContent = value.value ? "Canción asignada" : "Sin canción asignada";
      file.addEventListener("change", async () => {
        if (!file.files || !file.files[0]) return;
        file.disabled = true;
        status.textContent = "Subiendo canción…";
        try {
          const uploaded = await uploadFile(file.files[0]);
          value.value = uploaded.url;
          preview.src = uploaded.url;
          preview.hidden = false;
          status.textContent = `${uploaded.originalName} · guarda los cambios para publicarla`;
          await loadMedia();
        } catch (error) {
          status.textContent = "No se pudo subir la canción.";
          showMessage(editorMessage, error.message, true);
        } finally {
          file.disabled = false;
          file.value = "";
        }
      });
      uploadLabel.append(file);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "delete-button";
      remove.textContent = "Quitar canción";
      remove.addEventListener("click", () => {
        value.value = "";
        preview.removeAttribute("src");
        preview.hidden = true;
        status.textContent = "Sin canción asignada";
      });
      card.append(title, urlLabel, preview, uploadLabel, status, remove);
      container.append(card);
    }
  }

  function renderContent() {
    renderTextFields();
    renderImages();
    renderAthleteMusicFields();
  }

  function syncFormContent() {
    for (const [key, value] of new FormData(contentForm).entries()) content[key] = value;
  }

  function addRecord(type) {
    syncFormContent();
    const definitions = {
      athlete: {
        pattern: /^athletes\.card(\d+)Name$/,
        minimum: 12,
        keys: (index) => ({
          [`athletes.card${index}Name`]: "",
          [`athletes.card${index}Description`]: "",
          [`athletes.card${index}Music`]: "",
          [`media.athlete${index}`]: ""
        }),
        label: "deportista"
      },
      school: {
        pattern: /^school\.card(\d+)Title$/,
        minimum: 4,
        keys: (index) => ({
          [`school.card${index}Title`]: "",
          [`school.card${index}Text`]: "",
          [`media.school${index}`]: ""
        }),
        label: "actividad"
      },
      gallery: {
        pattern: /^media\.galleryPhoto(\d+)$/,
        minimum: 19,
        keys: (index) => ({ [`media.galleryPhoto${index}`]: "" }),
        label: "foto"
      },
      event: {
        pattern: /^live\.event(\d+)Title$/,
        minimum: 3,
        keys: (index) => ({
          [`live.event${index}Title`]: "",
          [`live.event${index}Date`]: "",
          [`live.event${index}Time`]: ""
        }),
        label: "evento"
      },
      coach: {
        pattern: /^coach\.card(\d+)Title$/,
        minimum: 2,
        keys: (index) => ({
          [`coach.card${index}Title`]: "",
          [`coach.card${index}Text`]: "",
          [`media.coach${index}`]: ""
        }),
        label: "sección de entrenadora"
      },
      schedule: {
        pattern: /^schedule\.extra(\d+)Day$/,
        minimum: 0,
        keys: (index) => ({
          [`schedule.extra${index}Day`]: "",
          [`schedule.extra${index}Time`]: ""
        }),
        label: "horario"
      },
      homePhoto: {
        pattern: /^media\.homePhoto(\d+)$/,
        minimum: 4,
        keys: (index) => ({ [`media.homePhoto${index}`]: "" }),
        label: "foto de inicio"
      },
      replay: {
        pattern: /^live\.replay(\d+)Title$/,
        minimum: 2,
        keys: (index) => ({
          [`live.replay${index}Title`]: "",
          [`live.replay${index}Text`]: "",
          [`live.replay${index}Url`]: ""
        }),
        label: "repetición"
      },
      venue: {
        pattern: /^contact\.venue(\d+)$/,
        minimum: 3,
        keys: (index) => ({ [`contact.venue${index}`]: "" }),
        label: "dirección"
      }
    };
    const definition = definitions[type];
    if (!definition) return;
    const currentCount = getRecordCount(definition.pattern, definition.minimum);
    if (currentCount >= 100) {
      showMessage(editorMessage, "Se alcanzó el máximo de 100 elementos por sección.", true);
      return;
    }
    const nextIndex = currentCount + 1;
    Object.assign(content, definition.keys(nextIndex));
    renderContent();
    const newField = type === "athlete"
      ? document.querySelector(`.music-card input[name="athletes.card${nextIndex}Music"]`)
      : contentForm.elements.namedItem(
      type === "school" ? `school.card${nextIndex}Title` :
      type === "event" ? `live.event${nextIndex}Title` :
      type === "replay" ? `live.replay${nextIndex}Title` :
      type === "venue" ? `contact.venue${nextIndex}` :
      type === "coach" ? `coach.card${nextIndex}Title` :
      type === "schedule" ? `schedule.extra${nextIndex}Day` :
      type === "homePhoto" ? `media.homePhoto${nextIndex}` : `media.galleryPhoto${nextIndex}`
      );
    const message = type === "athlete"
      ? `Se agregó la deportista ${nextIndex} y su canción. Asígnale una música en esta tarjeta y completa su nombre y foto en Deportistas.`
      : `Se agregó una nueva ${definition.label}. Completa sus datos y guarda los cambios.`;
    showMessage(editorMessage, message);
    if (newField && newField.scrollIntoView) newField.scrollIntoView({ behavior: "auto", block: "center" });
  }

  document.querySelectorAll("[data-add-record]").forEach((button) => {
    button.addEventListener("click", () => addRecord(button.dataset.addRecord));
  });

  async function loadMedia() {
    const files = await request("/api/admin/media");
    mediaLibrary.replaceChildren();
    if (files.length === 0) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "Aún no has subido archivos.";
      mediaLibrary.append(empty);
      return;
    }
    for (const file of files) {
      const row = document.createElement("div");
      row.className = "library-item";
      const meta = document.createElement("div");
      meta.className = "library-meta";
      if (file.mimeType.startsWith("image/")) {
        const image = document.createElement("img");
        image.src = file.url;
        image.alt = "";
        meta.append(image);
      }
      const name = document.createElement("span");
      name.textContent = file.originalName;
      meta.append(name);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "delete-button";
      remove.textContent = "Eliminar";
      remove.addEventListener("click", async () => {
        if (!window.confirm(`¿Eliminar "${file.originalName}"? Si está asignado al sitio, se quitará de la publicación.`)) return;
        remove.disabled = true;
        try {
          await request(`/api/admin/media/${encodeURIComponent(file.id)}`, { method: "DELETE" });
          content = await request("/api/site").then((result) => result.content);
          renderContent();
          await loadMedia();
          showMessage(editorMessage, "Archivo eliminado.");
        } catch (error) {
          remove.disabled = false;
          showMessage(editorMessage, error.message, true);
        }
      });
      row.append(meta, remove);
      mediaLibrary.append(row);
    }
  }

  async function openEditor() {
    const [sessionInfo, site] = await Promise.all([
      request("/api/admin/session"),
      request("/api/site")
    ]);
    csrfToken = sessionInfo.csrfToken;
    content = site.content;
    loginView.hidden = true;
    editorView.hidden = false;
    logoutButton.hidden = false;
    renderContent();
    await loadMedia();
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = loginForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    showMessage(loginMessage, "");
    try {
      const form = new FormData(loginForm);
      const result = await request("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username: form.get("username"), password: form.get("password") })
      });
      csrfToken = result.csrfToken;
      loginForm.reset();
      await openEditor();
    } catch (error) {
      showMessage(loginMessage, error.message);
    } finally {
      submit.disabled = false;
    }
  });

  contentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = contentForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    const values = Object.fromEntries(new FormData(contentForm).entries());
    try {
      const result = await request("/api/admin/content", {
        method: "PUT",
        body: JSON.stringify({ content: values })
      });
      content = result.content;
      renderContent();
      showMessage(editorMessage, result.message);
    } catch (error) {
      showMessage(editorMessage, error.message, true);
    } finally {
      submit.disabled = false;
    }
  });

  logoutButton.addEventListener("click", async () => {
    try {
      await request("/api/admin/logout", { method: "POST", body: "{}" });
      window.location.reload();
    } catch (error) {
      showMessage(editorMessage, error.message, true);
    }
  });

  async function initialize() {
    try {
      const csrf = await request("/api/admin/csrf");
      csrfToken = csrf.csrfToken;
      await openEditor();
    } catch (error) {
      if (!error.message.includes("Inicia sesión")) showMessage(loginMessage, error.message);
    }
  }

  initialize();
})();
