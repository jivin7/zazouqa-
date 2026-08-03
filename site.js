/* Zaqzouqa Marketing City - shared script for every page.
   Every feature is guarded, so this single file is safe to load anywhere. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var byId = function (id) { return document.getElementById(id); };
  var page = (document.body && document.body.dataset.page) || "home";

  var icon = function (paths) {
    return '<svg class="icon icon-lg" viewBox="0 0 24 24">' + paths + "</svg>";
  };
  var arrowIcon = '<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  /* ------------------------------------------------------------------ */
  /* Reveal on scroll (shared observer, also drives count-up animations) */
  /* ------------------------------------------------------------------ */
  var revealObserver = null;
  if (!reduceMotion && "IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll("[data-count]").forEach(animateCount);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -48px 0px" });
  }

  function observeReveals(root) {
    var scope = root || document;
    scope.querySelectorAll(".reveal").forEach(function (el) {
      if (revealObserver) {
        revealObserver.observe(el);
      } else {
        el.classList.add("is-visible");
        el.querySelectorAll("[data-count]").forEach(showCountInstantly);
      }
    });
  }

  function showCountInstantly(el) {
    el.textContent = "$" + Number(el.dataset.count).toLocaleString("en-US");
  }

  function animateCount(el) {
    var value = Number(el.dataset.count);
    if (reduceMotion) { showCountInstantly(el); return; }
    var start = performance.now();
    var dur = 2200;
    var step = function (now) {
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = "$" + Math.round(value * eased).toLocaleString("en-US");
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  observeReveals(document);

  /* ------------------------------------------------------------------ */
  /* Year                                                                */
  /* ------------------------------------------------------------------ */
  var yearEl = byId("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------ */
  /* Scroll progress + sticky header + scroll hint                       */
  /* ------------------------------------------------------------------ */
  var progress = byId("scrollProgress");
  var header = byId("header");
  var scrollHint = byId("scrollHint");
  if (progress || header || scrollHint) {
    var onScroll = function () {
      if (progress) {
        var max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var p = max > 0 ? window.scrollY / max : 0;
        progress.style.transform = "scaleX(" + p + ")";
      }
      if (header) header.classList.toggle("scrolled", window.scrollY > 12);
      if (scrollHint) scrollHint.classList.toggle("hide", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------ */
  /* Mobile menu                                                         */
  /* ------------------------------------------------------------------ */
  var menuToggle = byId("menuToggle");
  var mobileNav = byId("mobileNav");
  if (menuToggle && mobileNav) {
    var closeMenu = function () {
      mobileNav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
    };
    menuToggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) closeMenu();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Button soft spotlight                                               */
  /* ------------------------------------------------------------------ */
  document.addEventListener("pointermove", function (e) {
    var btn = e.target.closest && e.target.closest(".btn");
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    btn.style.setProperty("--rx", ((e.clientX - r.left) / r.width) * 100 + "%");
    btn.style.setProperty("--ry", ((e.clientY - r.top) / r.height) * 100 + "%");
  });

  /* ------------------------------------------------------------------ */
  /* Newsletter                                                          */
  /* ------------------------------------------------------------------ */
  var newsletterForm = byId("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      newsletterForm.reset();
      var ok = byId("newsletterOk");
      if (!ok) return;
      ok.classList.add("show", "animate-slide-in");
      setTimeout(function () { ok.classList.remove("show"); }, 3600);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Animated headline letters + hero ready state (home)                 */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll("[data-animate-text]").forEach(function (el) {
    var text = el.getAttribute("data-animate-text");
    var baseDelay = Number(el.getAttribute("data-delay") || 120);
    el.textContent = "";
    [].slice.call(text).forEach(function (ch, i) {
      var span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      span.style.transitionDelay = baseDelay + i * 55 + "ms";
      el.appendChild(span);
    });
    requestAnimationFrame(function () {
      var show = function () {
        el.querySelectorAll(".char").forEach(function (c) { c.classList.add("is-visible"); });
      };
      if (reduceMotion) show();
      else setTimeout(show, 120);
    });
  });

  var heroEl = document.querySelector(".hero");
  if (heroEl) {
    setTimeout(function () { heroEl.classList.add("ready"); }, reduceMotion ? 0 : 200);
  }

  /* ------------------------------------------------------------------ */
  /* Hero particles (home)                                               */
  /* ------------------------------------------------------------------ */
  var particleWrap = byId("heroParticles");
  if (particleWrap && !reduceMotion) {
    for (var i = 0; i < 18; i++) {
      var p = document.createElement("span");
      p.className = "particle" + (i % 3 === 0 ? " gold" : "");
      p.style.left = 6 + Math.random() * 88 + "%";
      p.style.bottom = Math.random() * 30 + "%";
      p.style.animationDuration = 7 + Math.random() * 6 + "s";
      p.style.animationDelay = Math.random() * 8 + "s";
      particleWrap.appendChild(p);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Typewriter (home)                                                   */
  /* ------------------------------------------------------------------ */
  var tw = byId("typewriter");
  if (tw) {
    var phrases = ["smart ideas", "bold brands", "real growth", "fun marketing"];
    var pi = 0, typed = "", deleting = false;
    var tickType = function () {
      if (reduceMotion) { tw.textContent = phrases[0]; return; }
      var current = phrases[pi];
      var pause = deleting && typed === "" ? 700
        : !deleting && typed === current ? 2400
        : deleting ? 55 : 90;
      setTimeout(function () {
        if (!deleting && typed === current) { deleting = true; tickType(); return; }
        if (deleting && typed === "") { deleting = false; pi = (pi + 1) % phrases.length; tickType(); return; }
        typed = current.slice(0, typed.length + (deleting ? -1 : 1));
        tw.textContent = typed;
        tickType();
      }, pause);
    };
    tickType();
  }

  /* ------------------------------------------------------------------ */
  /* Hero parallax (home)                                                */
  /* ------------------------------------------------------------------ */
  var frame = byId("heroFrame");
  if (heroEl && frame && !reduceMotion) {
    var speech = byId("speechBubble");
    var orbit = byId("orbit");
    var px = 0, py = 0, tx = 0, ty = 0;
    heroEl.addEventListener("mousemove", function (e) {
      var rect = heroEl.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    });
    var lerpParallax = function () {
      px += (tx - px) * 0.06;
      py += (ty - py) * 0.06;
      frame.style.transform = "translate3d(" + px * 0.35 + "px," + py * 0.35 + "px,0) rotate(" + px * 0.04 + "deg)";
      if (speech) speech.style.transform = "translate3d(" + px * -0.5 + "px," + py * -0.4 + "px,0)";
      if (orbit) orbit.style.transform = "translate3d(" + px * 0.7 + "px," + py * 0.7 + "px,0)";
      requestAnimationFrame(lerpParallax);
    };
    lerpParallax();
  }

  /* ------------------------------------------------------------------ */
  /* Marquee (home)                                                      */
  /* ------------------------------------------------------------------ */
  var track = byId("marqueeTrack");
  if (track) {
    var items = [
      "Branding Street", "Content Caf\u00e9", "Social Media Station", "Ads Avenue",
      "Strategy Square", "Analytics Tower", "Fun Guaranteed", "Big Results"
    ];
    track.innerHTML = items.concat(items).map(function (t) { return "<span>" + t + "</span>"; }).join("");
  }

  /* ------------------------------------------------------------------ */
  /* Districts (explore)                                                 */
  /* ------------------------------------------------------------------ */
  var districtsEl = byId("districts");
  var detailEl = byId("districtDetail");
  if (districtsEl && detailEl) {
    var DISTRICTS = [
      {
        title: "Branding Street",
        desc: "We craft memorable brands that stand out and stick.",
        detail: "Logo systems, voice guidelines, and visual identity kits that make your brand instantly recognizable - and impossible to forget.",
        svg: icon('<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>')
      },
      {
        title: "Content Caf\u00e9",
        desc: "Content that tells your story & keeps people coming back.",
        detail: "From scroll-stopping posts to long-form stories, we brew content that tastes like your brand and keeps audiences hungry for more.",
        svg: icon('<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>')
      },
      {
        title: "Social Media Station",
        desc: "Grow your community and spark real conversations.",
        detail: "Community management, content calendars, and engagement strategies that turn followers into fans - and fans into customers.",
        svg: icon('<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>')
      },
      {
        title: "Ads Avenue",
        desc: "Smart ads for real results (without wasting your coins).",
        detail: "Targeted campaigns across Meta, Google, and more - optimized daily so every coin works harder than the last.",
        svg: icon('<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>')
      },
      {
        title: "Strategy Square",
        desc: "Big picture thinking with a plan that actually works.",
        detail: "Roadmaps, positioning, and go-to-market plans that connect every district into one empire-building machine.",
        svg: icon('<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.52l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>')
      },
      {
        title: "Analytics Tower",
        desc: "Data, insights & reports so you always know what's working.",
        detail: "Clear dashboards and monthly insights that show what's winning, what's wobbling, and where to double down.",
        svg: icon('<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16v-5"/><path d="M12 16v-9"/><path d="M17 16V8"/>')
      }
    ];

    var activeDistrict = null;

    districtsEl.innerHTML = DISTRICTS.map(function (d, i) {
      return '<button class="district reveal reveal-scale" type="button" data-i="' + i + '" style="transition-delay:' + i * 120 + 'ms">'
        + '<span class="district-icon">' + d.svg + "</span>"
        + "<h3>" + d.title + "</h3>"
        + "<p>" + d.desc + "</p>"
        + '<span class="district-arrow">' + arrowIcon + "</span>"
        + "</button>";
    }).join("");

    observeReveals(districtsEl);

    var closeDistrict = function () {
      activeDistrict = null;
      districtsEl.querySelectorAll(".district").forEach(function (b) { b.classList.remove("active"); });
      detailEl.hidden = true;
      detailEl.classList.remove("open");
    };

    districtsEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".district");
      if (!btn) return;
      var i = Number(btn.dataset.i);
      var d = DISTRICTS[i];
      districtsEl.querySelectorAll(".district").forEach(function (b) { b.classList.remove("active"); });
      if (activeDistrict === i) { closeDistrict(); return; }
      activeDistrict = i;
      btn.classList.add("active");
      detailEl.hidden = false;
      detailEl.classList.add("open");
      detailEl.innerHTML =
        '<div class="detail-top">'
        + '<div class="detail-left">'
        + '<span class="district-icon animate-bounce-in">' + d.svg + "</span>"
        + "<div><small>District unlocked</small><h3>" + d.title + "</h3></div>"
        + "</div>"
        + '<button class="detail-close" type="button" aria-label="Close" id="closeDetail">'
        + '<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>'
        + "</button>"
        + "</div>"
        + '<p class="animate-fade-swap">' + d.detail + "</p>"
        + '<a href="packages.html" class="btn btn-primary">Build in this district <span class="btn-icon">' + arrowIcon + "</span></a>";
      var closeBtn = detailEl.querySelector("#closeDetail");
      if (closeBtn) closeBtn.onclick = closeDistrict;
    });
  }

  /* ------------------------------------------------------------------ */
  /* Packages (packages)                                                 */
  /* ------------------------------------------------------------------ */
  var plansEl = byId("plans");
  if (plansEl) {
    var PLANS = [
      {
        name: "Starter Explorer",
        tagline: "Perfect for getting started.",
        price: 899,
        features: ["Brand Basics", "Content Plan", "1 Social Platform", "Monthly Report"],
        cta: "Let's Start",
        featured: false,
        svg: icon('<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>')
      },
      {
        name: "City Builder",
        tagline: "For brands ready to grow.",
        price: 2499,
        features: ["Branding + Strategy", "Content Creation", "Social Media Management", "Ad Campaigns"],
        cta: "Build My City",
        featured: true,
        svg: icon('<path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>')
      },
      {
        name: "Empire Maker",
        tagline: "For big dreams & big moves.",
        price: 4999,
        features: ["Full Marketing Strategy", "Multi-Platform Management", "Ads + Funnels", "Advanced Analytics"],
        cta: "Let's Build an Empire",
        featured: false,
        svg: icon('<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>')
      }
    ];

    var starPath = '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';
    var checkIcon = '<span class="check"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>';

    plansEl.innerHTML = PLANS.map(function (p, i) {
      return '<article class="plan reveal reveal-up ' + (p.featured ? "featured" : "") + '" style="transition-delay:' + i * 160 + 'ms">'
        + (p.featured
          ? '<span class="badge animate-bounce-in"><svg viewBox="0 0 24 24" class="animate-twinkle">' + starPath + "</svg> Most Popular</span>"
          : "")
        + '<span class="plan-icon">' + p.svg + "</span>"
        + "<h3>" + p.name + "</h3>"
        + '<p class="tagline">' + p.tagline + "</p>"
        + "<ul>" + p.features.map(function (f) { return "<li>" + checkIcon + f + "</li>"; }).join("") + "</ul>"
        + "<div>"
        + '<p class="price">From <strong data-count="' + p.price + '">$0</strong><span style="font-size:0.75rem">/month</span></p>'
        + '<a href="chat.html" class="btn ' + (p.featured ? "btn-accent" : "btn-primary") + '">' + p.cta + "</a>"
        + "</div>"
        + "</article>";
    }).join("")
      + '<aside class="plan unsure reveal reveal-scale" style="transition-delay:' + PLANS.length * 160 + 'ms">'
      + '<span class="plan-icon" style="margin:0 auto"><svg class="icon icon-lg animate-float" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg></span>'
      + "<h3>Not sure yet?</h3>"
      + '<p class="tagline" style="margin-top:0.5rem">Let\'s chat and find the perfect path for you!</p>'
      + '<a href="chat.html" class="btn btn-outline" style="margin-top:1rem">Talk to us</a>'
      + "</aside>";

    observeReveals(plansEl);
  }

  /* ------------------------------------------------------------------ */
  /* Testimonials (stories)                                              */
  /* ------------------------------------------------------------------ */
  var storiesDesktop = byId("storiesDesktop");
  var storyCard = byId("storyCard");
  if (storiesDesktop || storyCard) {
    var TESTIMONIALS = [
      {
        quote: "Zaqzouqa and Nardeen turned our tiny idea into a brand people actually love. We saw real growth (and had fun doing it).",
        name: "Lina M.", role: "Boutique Owner", avatar: "avatar-lina.png"
      },
      {
        quote: "Their strategy is next level - and Zaqzouqa's creativity? Pure gold. Our social media has never looked this good!",
        name: "Omar K.", role: "Co-Founder", avatar: "avatar-omar.png"
      },
      {
        quote: "From content to ads, everything just works. They feel like part of our team!",
        name: "Sara R.", role: "Online Store Owner", avatar: "avatar-sara.png"
      }
    ];

    var starsMarkup = [0, 1, 2, 3, 4].map(function (i) {
      return '<svg viewBox="0 0 24 24" class="animate-twinkle" style="animation-delay:' + i * 0.2 + 's"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>';
    }).join("");

    var cardHTML = function (t, featured) {
      return '<figure class="t-card ' + (featured ? "featured" : "") + '">'
        + '<svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>'
        + "<blockquote>" + t.quote + "</blockquote>"
        + '<figcaption class="t-meta">'
        + '<img class="t-avatar" src="' + t.avatar + '" alt="' + t.name + '" width="44" height="44" />'
        + "<div><strong>" + t.name + "</strong><span>" + t.role + "</span></div>"
        + '<div class="stars" aria-label="5 out of 5 stars">' + starsMarkup + "</div>"
        + "</figcaption>"
        + "</figure>";
    };

    if (storiesDesktop) {
      storiesDesktop.innerHTML = TESTIMONIALS.map(function (t, i) {
        return '<div class="reveal reveal-up" style="transition-delay:' + i * 180 + 'ms">' + cardHTML(t, i === 1) + "</div>";
      }).join("");
      observeReveals(storiesDesktop);
    }

    if (storyCard) {
      var storyDots = byId("storyDots");
      var prevStory = byId("prevStory");
      var nextStory = byId("nextStory");
      var storyIndex = 0;
      var paused = false;

      var renderStory = function () {
        storyCard.innerHTML = '<div class="animate-fade-swap">' + cardHTML(TESTIMONIALS[storyIndex], true) + "</div>";
        if (storyDots) {
          storyDots.innerHTML = TESTIMONIALS.map(function (_, i) {
            return '<button class="dot ' + (i === storyIndex ? "active" : "") + '" type="button" aria-label="Go to story ' + (i + 1) + '" data-i="' + i + '"></button>';
          }).join("");
        }
      };
      renderStory();

      if (prevStory) prevStory.onclick = function () {
        storyIndex = (storyIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
        renderStory();
      };
      if (nextStory) nextStory.onclick = function () {
        storyIndex = (storyIndex + 1) % TESTIMONIALS.length;
        renderStory();
      };
      if (storyDots) storyDots.addEventListener("click", function (e) {
        var d = e.target.closest(".dot");
        if (!d) return;
        storyIndex = Number(d.dataset.i);
        renderStory();
      });

      var storiesSection = byId("stories");
      if (storiesSection) {
        storiesSection.addEventListener("mouseenter", function () { paused = true; });
        storiesSection.addEventListener("mouseleave", function () { paused = false; });
      }
      if (!reduceMotion) {
        setInterval(function () {
          if (paused || window.innerWidth >= 768) return;
          storyIndex = (storyIndex + 1) % TESTIMONIALS.length;
          renderStory();
        }, 6500);
      }
    }
  }

  /* ------------------------------------------------------------------ */
  /* Team tilt (about)                                                   */
  /* ------------------------------------------------------------------ */
  if (!reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width - 0.5) * 14;
        var y = ((e.clientY - r.top) / r.height - 0.5) * -14;
        el.style.transform = "perspective(600px) rotateX(" + y + "deg) rotateY(" + x + "deg)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Floating Zaqzouqa guide (moves + talks + expressions)               */
  /* ------------------------------------------------------------------ */
  (function initZaqGuide() {
    var guide = byId("zaqGuide");
    var bubble = byId("zaqBubble");
    var titleEl = byId("zaqBubbleTitle");
    var textEl = byId("zaqBubbleText");
    var nextBtn = byId("zaqNextTip");
    var hideBtn = byId("zaqHideBubble");
    var charBtn = byId("zaqCharBtn");
    var exprImg = byId("zaqExprImg");
    if (!guide || !exprImg || !bubble || !titleEl || !textEl) return;

    var EXPR = {
      happy: "zaq-happy.png",
      talk: "zaq-talk.png",
      think: "zaq-think.png",
      point: "zaq-point.png",
      excited: "zaq-excited.png",
      wink: "zaq-wink.png"
    };

    Object.keys(EXPR).forEach(function (k) { var im = new Image(); im.src = EXPR[k]; });

    var SECTION_TIPS = {
      home: [
        { title: "Welcome!", text: "I'm Zaqzouqa - your tiny tour guide. Every district now has its own page, so pick a stop!", mood: "happy" },
        { title: "Psst...", text: "Tap Explore the City to peek at our districts - branding, content, social, ads & more.", mood: "point" },
        { title: "Need a buddy?", text: "Stuck? Tap Let's Talk and ask me anything about social media or the site.", mood: "talk" }
      ],
      explore: [
        { title: "Districts!", text: "Click a district card to unlock details. Social Media Station is a fan favorite!", mood: "point" },
        { title: "Tip", text: "Not sure where to start? Branding Street first, then Content Caf\u00e9. Trust me.", mood: "think" }
      ],
      team: [
        { title: "Meet the crew", text: "That's Nardeen (strategy brain) and me (fun officer). We make marketing less boring!", mood: "happy" },
        { title: "Fun fact", text: "I never skip snack breaks during brainstorms. Productivity rule #1.", mood: "wink" }
      ],
      packages: [
        { title: "Pick an adventure", text: "Starter, City Builder, or Empire Maker - hover the cards. City Builder is the popular one!", mood: "excited" },
        { title: "Confused?", text: "Hit Talk to us and I'll help you choose a path.", mood: "think" }
      ],
      stories: [
        { title: "Real wins", text: "These stories are from around the city. Proof that fun + strategy works!", mood: "excited" },
        { title: "Your turn?", text: "Your brand could be next. Scroll down to Ready to Build Your Empire!", mood: "point" }
      ],
      resources: [
        { title: "Free stuff!", text: "Guides, templates, and answers - all free. Take what you need, no email wall.", mood: "excited" },
        { title: "Reading list", text: "Start with the FAQs if you're new. Then grab a template and go build.", mood: "think" }
      ],
      footer: [
        { title: "Stay in the loop", text: "Drop your email for city updates - tips, ideas, and no boring newsletters.", mood: "talk" },
        { title: "Bye for now?", text: "I'm always here floating around. Tap me anytime you need a nudge!", mood: "wink" }
      ],
      default: [
        { title: "Still here!", text: "Keep exploring - I'll hop with you and keep talking. Marketing City never sleeps!", mood: "happy" },
        { title: "Quick help", text: "Want social tips? Open Let's Talk. Want packages? Jump to the Packages page.", mood: "point" }
      ]
    };

    var GENERAL_CHATTER = [
      { title: "Zaqzouqa", text: "Boop! Don't forget - consistency beats perfection on social media.", mood: "wink" },
      { title: "Tiny tip", text: "Use the top menu to teleport around the city. I'm just the cute shortcut.", mood: "point" },
      { title: "Hey!", text: "If the page feels long, that's okay. Empires aren't built in one scroll.", mood: "talk" },
      { title: "Snack break", text: "Hydrate. Then check Packages. Then chat with me. Perfect trio.", mood: "think" },
      { title: "Guide mode", text: "Click my face to show tips again. I love talking. A lot.", mood: "excited" }
    ];

    var PAGE_KEY = {
      home: "home",
      explore: "explore",
      packages: "packages",
      stories: "stories",
      about: "team",
      resources: "resources"
    };

    var tipIndex = 0;
    var sectionKey = PAGE_KEY[page] || "default";
    var hidden = false;
    var currentMood = "happy";

    function tipsFor(key) {
      return SECTION_TIPS[key] || SECTION_TIPS.default;
    }

    function setMood(mood) {
      var next = EXPR[mood] || EXPR.happy;
      if (mood === currentMood && exprImg.getAttribute("src") === next) return;
      currentMood = mood || "happy";
      exprImg.src = next;
      if (!reduceMotion) {
        exprImg.classList.remove("swap");
        void exprImg.offsetWidth;
        exprImg.classList.add("swap");
      }
    }

    function speak(tip) {
      titleEl.textContent = tip.title;
      textEl.textContent = tip.text;
      setMood(tip.mood || "talk");
      if (!reduceMotion) {
        bubble.classList.remove("swap");
        void bubble.offsetWidth;
        bubble.classList.add("swap");
      }
    }

    function showCurrent() {
      var list = tipsFor(sectionKey);
      speak(list[tipIndex % list.length]);
    }

    function nextTip() {
      tipIndex += 1;
      var list = tipsFor(sectionKey);
      if (tipIndex % 3 === 0 && Math.random() > 0.45) {
        speak(GENERAL_CHATTER[Math.floor(Math.random() * GENERAL_CHATTER.length)]);
      } else {
        speak(list[tipIndex % list.length]);
      }
      guide.classList.remove("hidden-bubble");
      hidden = false;
    }

    var MARKERS = ["home", "explore", "team", "packages", "stories", "resources", "footer"];

    function detectSection() {
      var active = PAGE_KEY[page] || "default";
      var mid = window.innerHeight * 0.35;
      MARKERS.forEach(function (id) {
        var el = byId(id);
        if (!el) return;
        var r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) active = id;
      });
      if (active !== sectionKey) {
        sectionKey = active;
        tipIndex = 0;
        if (!hidden) showCurrent();
      }
    }

    if (nextBtn) nextBtn.addEventListener("click", nextTip);
    if (hideBtn) hideBtn.addEventListener("click", function () {
      guide.classList.add("hidden-bubble");
      hidden = true;
    });
    if (charBtn) charBtn.addEventListener("click", function () {
      if (hidden) {
        guide.classList.remove("hidden-bubble");
        hidden = false;
      }
      nextTip();
    });

    showCurrent();
    detectSection();
    window.addEventListener("scroll", detectSection, { passive: true });

    if (!reduceMotion) {
      setInterval(function () {
        if (document.hidden || hidden) return;
        nextTip();
      }, 7000);
    }
  })();
})();
