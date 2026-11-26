(() => {
  const api = "/api/site";

  function getIndexedCount(content, pattern, minimum) {
    const indexes = Object.keys(content).map((key) => key.match(pattern)).filter(Boolean).map((match) => Number(match[1]));
    return Math.max(minimum, ...indexes);
  }

  function renderAdditionalEntries(content) {
    const coachGrid = document.querySelector(".page-entrenadora .contenido .galeria");
    if (coachGrid) {
      for (let index = 3; index <= getIndexedCount(content, /^coach\.card(\d+)Title$/, 2); index += 1) {
        const title = content[`coach.card${index}Title`] || "";
        const description = content[`coach.card${index}Text`] || "";
        const imageUrl = content[`media.coach${index}`] || "";
        if (!title && !description && !imageUrl) continue;
        const card = document.createElement("div");
        card.className = "foto";
        const image = document.createElement("img");
        image.dataset.cmsImage = `media.coach${index}`;
        image.alt = title;
        image.addEventListener("click", () => {
          if (typeof window.abrirImagen === "function") window.abrirImagen(image.src, image.alt);
        });
        const text = document.createElement("div");
        text.className = "foto-texto";
        const heading = document.createElement("h3");
        heading.dataset.cms = `coach.card${index}Title`;
        const paragraph = document.createElement("p");
        paragraph.dataset.cms = `coach.card${index}Text`;
        text.append(heading, paragraph);
        card.append(image, text);
        coachGrid.append(card);
      }
    }

    const homeGallery = document.querySelector("#home-gallery");
    if (homeGallery) {
      for (let index = 5; index <= getIndexedCount(content, /^media\.homePhoto(\d+)$/, 4); index += 1) {
        const imageUrl = content[`media.homePhoto${index}`];
        if (!imageUrl) continue;
        const frame = document.createElement("div");
        frame.className = "ph";
        const image = document.createElement("img");
        image.dataset.cmsImage = `media.homePhoto${index}`;
        image.alt = `Foto de Ayekantún ${index}`;
        frame.append(image);
        homeGallery.append(frame);
      }
    }

    const scheduleList = document.querySelector("#schedule-list");
    if (scheduleList) {
      for (let index = 1; index <= getIndexedCount(content, /^schedule\.extra(\d+)Day$/, 0); index += 1) {
        const day = content[`schedule.extra${index}Day`] || "";
        const time = content[`schedule.extra${index}Time`] || "";
        if (!day && !time) continue;
        const item = document.createElement("li");
        const dayText = document.createElement("span");
        dayText.dataset.cms = `schedule.extra${index}Day`;
        dayText.textContent = day;
        const timeText = document.createElement("span");
        timeText.dataset.cms = `schedule.extra${index}Time`;
        timeText.textContent = time;
        item.append(dayText);
        if (day && time) item.append(document.createTextNode(": "));
        item.append(timeText);
        scheduleList.append(item);
      }
    }

    const athleteGrid = document.querySelector(".page-deportistas .contenido .galeria");
    if (athleteGrid) {
      for (let index = 13; index <= getIndexedCount(content, /^athletes\.card(\d+)Name$/, 12); index += 1) {
        const name = content[`athletes.card${index}Name`] || "";
        const description = content[`athletes.card${index}Description`] || "";
        const imageUrl = content[`media.athlete${index}`] || "";
        const song = content[`athletes.card${index}Music`] || "";
        if (!name && !description && !imageUrl && !song) continue;
        const card = document.createElement("div");
        card.className = "tarjeta";
        card.dataset.athleteIndex = String(index);
        const image = document.createElement("img");
        image.className = "responsive-image clickable-image";
        image.dataset.cmsImage = `media.athlete${index}`;
        image.alt = name;
        image.addEventListener("click", () => {
          if (typeof window.abrirImagen === "function") window.abrirImagen(image.src, image.alt);
        });
        const text = document.createElement("div");
        text.className = "tarjeta-texto";
        const heading = document.createElement("h3");
        heading.dataset.cms = `athletes.card${index}Name`;
        heading.textContent = name;
        const paragraph = document.createElement("p");
        paragraph.dataset.cms = `athletes.card${index}Description`;
        paragraph.textContent = description;
        text.append(heading, paragraph);
        card.append(image, text);
        athleteGrid.append(card);
      }
    }

    const schoolGrid = document.querySelector("#school-activities");
    if (schoolGrid) {
      for (let index = 5; index <= getIndexedCount(content, /^school\.card(\d+)Title$/, 4); index += 1) {
        if (!content[`school.card${index}Title`] && !content[`school.card${index}Text`] && !content[`media.school${index}`]) continue;
        const card = document.createElement("div");
        card.className = "foto";
        const image = document.createElement("img");
        image.dataset.cmsImage = `media.school${index}`;
        image.alt = content[`school.card${index}Title`] || "";
        image.addEventListener("click", () => {
          if (typeof window.abrirImagen === "function") window.abrirImagen(image.src, image.alt);
        });
        const text = document.createElement("div");
        text.className = "foto-texto";
        const heading = document.createElement("h3");
        heading.dataset.cms = `school.card${index}Title`;
        const paragraph = document.createElement("p");
        paragraph.dataset.cms = `school.card${index}Text`;
        text.append(heading, paragraph);
        card.append(image, text);
        schoolGrid.append(card);
      }
    }

    const galleryGrid = document.querySelector("#gallery-content");
    if (galleryGrid) {
      for (let index = 20; index <= getIndexedCount(content, /^media\.galleryPhoto(\d+)$/, 19); index += 1) {
        const imageUrl = content[`media.galleryPhoto${index}`];
        if (!imageUrl) continue;
        const card = document.createElement("div");
        card.className = "foto";
        const image = document.createElement("img");
        image.dataset.cmsImage = `media.galleryPhoto${index}`;
        image.alt = `Momento de patinaje ${index}`;
        image.addEventListener("click", () => {
          if (typeof window.abrirImagen === "function") window.abrirImagen(image.src, image.alt);
        });
        const like = document.createElement("button");
        like.className = "like-btn";
        like.type = "button";
        like.setAttribute("aria-label", "Dar like");
        like.textContent = "❤️ ";
        const likes = document.createElement("span");
        likes.textContent = "0";
        like.append(likes);
        like.addEventListener("click", () => {
          if (typeof window.darLike === "function") window.darLike(like);
        });
        card.append(image, like);
        galleryGrid.append(card);
      }
    }

    const events = document.querySelector("#upcoming-events");
    if (events) {
      for (let index = 4; index <= getIndexedCount(content, /^live\.event(\d+)Title$/, 3); index += 1) {
        const title = content[`live.event${index}Title`] || "";
        const date = content[`live.event${index}Date`] || "";
        const time = content[`live.event${index}Time`] || "";
        if (!title && !date && !time) continue;
        const card = document.createElement("div");
        card.className = "transmision-card";
        const heading = document.createElement("h4");
        heading.dataset.cms = `live.event${index}Title`;
        const dateLine = document.createElement("p");
        dateLine.append(document.createElement("strong"), document.createElement("span"));
        dateLine.firstChild.textContent = "Fecha: ";
        dateLine.lastChild.dataset.cms = `live.event${index}Date`;
        const timeLine = document.createElement("p");
        timeLine.append(document.createElement("strong"), document.createElement("span"));
        timeLine.firstChild.textContent = "Hora: ";
        timeLine.lastChild.dataset.cms = `live.event${index}Time`;
        card.append(heading, dateLine, timeLine);
        events.append(card);
      }
    }

    const replays = document.querySelector("#past-events");
    if (replays) {
      for (let index = 3; index <= getIndexedCount(content, /^live\.replay(\d+)Title$/, 2); index += 1) {
        const title = content[`live.replay${index}Title`] || "";
        const description = content[`live.replay${index}Text`] || "";
        const url = content[`live.replay${index}Url`] || "";
        if (!title && !description && !url) continue;
        const card = document.createElement("div");
        card.className = "repeticion-item";
        const thumb = document.createElement("div");
        thumb.className = "repeticion-thumb";
        const copy = document.createElement("div");
        copy.className = "repeticion-copy";
        const heading = document.createElement("h4");
        heading.dataset.cms = `live.replay${index}Title`;
        const paragraph = document.createElement("p");
        paragraph.dataset.cms = `live.replay${index}Text`;
        const link = document.createElement("a");
        link.dataset.cmsHref = `live.replay${index}Url`;
        link.href = url || "https://www.youtube.com";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Ver repetición";
        copy.append(heading, paragraph, link);
        card.append(thumb, copy);
        replays.append(card);
      }
    }

    const venues = document.querySelector("#direcciones-lista");
    if (venues) {
      for (let index = 4; index <= getIndexedCount(content, /^contact\.venue(\d+)$/, 3); index += 1) {
        const address = content[`contact.venue${index}`];
        if (!address) continue;
        const item = document.createElement("li");
        item.className = "direccion-item";
        const label = document.createElement("strong");
        label.textContent = "Dirección: ";
        const link = document.createElement("a");
        link.dataset.cms = `contact.venue${index}`;
        link.textContent = address;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        item.append(label, link);
        venues.append(item);
      }
    }
  }

  function applyContent(content) {
    renderAdditionalEntries(content);
    document.querySelectorAll("[data-cms]").forEach((element) => {
      const value = content[element.dataset.cms];
      if (typeof value === "string") element.textContent = value;
    });

    document.querySelectorAll("[data-cms-image]").forEach((image) => {
      const value = content[image.dataset.cmsImage];
      if (typeof value === "string") {
        image.hidden = !value;
        const card = image.closest(".tarjeta, .foto, .ph");
        if (card && card !== image) card.hidden = !value;
        if (value) image.src = value;
        else image.removeAttribute("src");
      }
    });

    if (location.pathname.toLowerCase().endsWith("/galeria.html")) {
      document.querySelectorAll(".galeria .foto img").forEach((image, index) => {
        const value = content[`media.galleryPhoto${index + 1}`];
        if (typeof value === "string") {
          image.hidden = !value;
          image.closest(".foto").hidden = !value;
          if (value) image.src = value;
          else image.removeAttribute("src");
        }
      });
    }

    document.querySelectorAll("[data-cms-src]").forEach((element) => {
      const value = content[element.dataset.cmsSrc];
      if (typeof value !== "string" || !value) return;
      if (element.dataset.cmsSrc === "videos.featuredUrl") {
        try {
          const videoUrl = new URL(value);
          const host = videoUrl.hostname.toLowerCase();
          const id = host === "youtu.be"
            ? videoUrl.pathname.split("/").filter(Boolean)[0]
            : videoUrl.searchParams.get("v") || videoUrl.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
          if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) element.src = `https://www.youtube.com/embed/${id}`;
        } catch (error) {
          console.warn("El enlace del video destacado no es válido:", error.message);
        }
      } else {
        element.src = value;
      }
    });

    document.querySelectorAll("[data-cms-channel]").forEach((element) => {
      const channel = (content[element.dataset.cmsChannel] || "").trim();
      if (/^[A-Za-z0-9_-]{10,40}$/.test(channel)) {
        element.src = `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channel)}`;
      }
    });

    document.querySelectorAll("[data-cms-href]").forEach((element) => {
      const value = content[element.dataset.cmsHref];
      if (typeof value === "string" && value) element.href = value;
    });

    document.querySelectorAll("[data-cms-audio]").forEach((audio) => {
      const value = content[audio.dataset.cmsAudio];
      const player = audio.closest(".tarjeta-player");
      if (typeof value !== "string" || !value) {
        audio.removeAttribute("src");
        audio.load();
        if (player) player.hidden = true;
        return;
      }
      audio.src = value;
      if (player) player.hidden = false;
    });

    for (let index = 1; index <= 12; index += 1) {
      const name = content[`athletes.card${index}Name`];
      const image = document.querySelector(`[data-cms-image="media.athlete${index}"]`);
      if (name && image) image.alt = name;
    }

    for (let index = 1; index <= 4; index += 1) {
      const title = content[`school.card${index}Title`];
      const image = document.querySelector(`[data-cms-image="media.school${index}"]`);
      if (title && image) image.alt = title;
    }

    document.querySelectorAll("#direcciones-lista [data-cms^='contact.venue']").forEach((link) => {
      link.href = `https://www.google.com/maps?q=${encodeURIComponent(link.textContent)}`;
    });

    document.querySelectorAll(".footer-copy [data-i18n='footer.copyright']").forEach((element) => {
      if (content["site.footerCopyright"]) element.textContent = content["site.footerCopyright"];
    });
    document.querySelectorAll(".footer-copy [data-i18n='footer.location']").forEach((element) => {
      if (content["site.address"]) element.textContent = content["site.address"];
    });

    const email = content["site.email"];
    if (email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
        link.href = `mailto:${email}`;
        if (link.textContent.includes("@")) link.textContent = email;
      });
      document.querySelectorAll('form[action^="https://formsubmit.co/"]').forEach((form) => {
        form.action = `https://formsubmit.co/${encodeURIComponent(email)}`;
      });
      document.querySelectorAll('input[name="_autoresponse"]').forEach((field) => {
        field.value = field.value.replace(/[^\s@]+@[^\s@]+\.[^\s@]+/, email);
      });
    }

    const whatsapp = (content["site.whatsapp"] || "").replace(/\D/g, "");
    if (whatsapp) {
      document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
        link.href = `https://wa.me/${whatsapp}`;
        if (/\+?[\d\s()-]{8,}/.test(link.textContent)) link.textContent = content["site.phone"] || link.textContent;
      });
      document.querySelectorAll('[onclick*="wa.me"]').forEach((button) => {
        if (button.dataset.whatsappWired) return;
        button.removeAttribute("onclick");
        button.dataset.whatsappWired = "true";
        button.addEventListener("click", () => {
          window.open(`https://wa.me/${whatsapp}`, "_blank", "noopener,noreferrer");
        });
      });
    }

    const socialLinks = [
      ["instagram.com", "site.instagram"],
      ["youtube.com", "site.youtube"]
    ];
    for (const [domain, key] of socialLinks) {
      if (!content[key]) continue;
      document.querySelectorAll(`a[href*="${domain}"]`).forEach((link) => {
        link.href = content[key];
      });
    }

    if (content["site.address"]) {
      document.querySelectorAll("[data-cms-address]").forEach((element) => {
        element.textContent = content["site.address"];
      });
      if (typeof window.initMusicPlayers === "function") window.initMusicPlayers();
    }
  }

  fetch(api, { headers: { Accept: "application/json" } })
    .then((response) => {
      if (!response.ok) throw new Error(`El servidor respondió ${response.status}`);
      return response.json();
    })
    .then(({ content }) => {
      if (!content || typeof content !== "object") throw new Error("El servidor entregó contenido no válido.");
      applyContent(content);
    })
    .catch((error) => console.warn("No se pudo cargar el contenido dinámico del sitio:", error.message));
})();
