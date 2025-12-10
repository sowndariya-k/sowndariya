(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = this.parentNode;
      const dropdown = parent.querySelector(".dropdown");
      if (dropdown) {
        parent.classList.toggle("active");
        dropdown.classList.toggle("dropdown-active");
      }
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  window.addEventListener("load", () => {
    new PureCounter();
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function () {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

/**
 * Qualification tab toggle
 */
function toggleTab(tabId) {
  const tabs = document.querySelectorAll(".qualification-content");
  tabs.forEach((tab) => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

/**
 * Project Popups
 */
const cardLinks = document.querySelectorAll(".card-link");
const popups = document.querySelectorAll(".popup-overlay");

cardLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetPopupId = this.getAttribute("data-target");
    const targetPopup = document.getElementById(targetPopupId);
    targetPopup.classList.add("show");
  });
});

document.querySelectorAll(".close-btn").forEach((closeBtn) => {
  closeBtn.addEventListener("click", function () {
    this.closest(".popup-overlay").classList.remove("show");
  });
});

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup-overlay")) {
    event.target.classList.remove("show");
  }
});

// Close popup with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".popup-overlay.show").forEach((popup) => {
      popup.classList.remove("show");
    });
  }
});

/**
 * Project Filtering
 */
function filterProjects(category) {
  const projects = document.querySelectorAll(".project-card");
  const filterItems = document.querySelectorAll(".filter-item");

  filterItems.forEach((item) => item.classList.remove("active"));
  document.querySelector(`[data-filter="${category}"]`).classList.add("active");

  projects.forEach((project) => {
    if (category === "all" || project.dataset.category === category) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}

/**
 * Project Data
 */
const projects = {
  zekesys: {
    image: "assets/img/zekesys.png",
  description: "Developed a professional business website for Zekesys, showcasing their services and enhancing their online presence with a user-friendly interface.",
  features: [
    "Modern and responsive design for seamless accessibility across devices",
    "Detailed service sections to highlight business offerings",
    "Contact form integration for client inquiries",
    "Optimized navigation for better user experience",
    "Custom graphics and visuals tailored to the brand's identity"
  ],
  technologies: " HTML, CSS, JavaScript, Bootstrap",
    category: " Frontend",
    status: " Completed",
    link: " https://zekesys.com/",
  },
  todo: {
    image: "assets/img/todo.png",
    description: "A user-friendly and efficient Todo List application designed for effective task management. Users can easily add, edit, delete, and track tasks with a sleek interface.",
  features: [
    "Add, edit, and delete tasks",
    "Track task status (completed or pending)",
    "Save tasks locally using local storage for persistent data",
    "Dynamic updates for task counts (total, completed, and pending)",
    "Responsive and clean UI for an intuitive user experience"
  ],
    technologies: " HTML, CSS, JavaScript, Local Storage",
    category: " Frontend",
    status: " Completed",
    link: " https://sowndariya-k.github.io/TODO/",
  },
  freelanceProject: {
    image: "assets/img/sk.png",
    description: " A custom-designed personal portfolio website developed as a freelance project to meet the client's specific requirements and showcase their professional profile.",
    features: [
      "Responsive and modern design for accessibility across devices",
    "Dedicated portfolio sections for projects and achievements",
    "Integrated contact form for seamless communication",
    "Customizable layout tailored to the client's needs"
  ],
    technologies: " HTML, CSS, JavaScript",
    category: " Frontend",
    status: " Completed",
    link: " https://kavinkumar-r.netlify.app/",
  },

  
  logAlertProject: {
  image: "assets/img/logalert.png", 
  description: "A real-time log monitoring and alerting system developed to track application logs, identify error patterns, and instantly notify stakeholders using cloud-based services. The system is serverless and scalable, making it ideal for modern applications and microservice-based architectures.",
  features: [
    "Monitors and streams real-time application logs using AWS CloudWatch",
    "Detects critical logs such as ERROR, CRITICAL, and 5xx codes",
    "Automatically sends email alerts via Amazon SNS when issues are detected",
    "Scheduled execution every 5 minutes using AWS Lambda",
    "Designed with secure IAM roles following the least-privilege principle"
  ],
  technologies: "AWS (CloudWatch, Lambda, SNS), Python",
  category: "Cloud",
  status: "Completed",
  link: "https://github.com/sowndariya-k/LogAlert-AWS-Monitoring"
},

spendWiseProject: {
  image: "assets/img/spend.png",
  tagline: "Your smart digital assistant for effortless money tracking and visual financial insights.",
  description: "SpendWise is a modern personal finance web application built to empower users with clear insights into their financial activities. It enables effortless tracking of income, expenses, and savings while delivering visually engaging analytics that simplify money management and decision-making.",
  features: [
    "Provides real-time tracking of income, expenses, and savings with dynamic updates",
    "Generates interactive line and pie charts for a deep dive into spending behavior and financial trends",
    "Automatically categorizes transactions and delivers instant monthly summaries",
    "Offers a one-click printable financial report for professional-grade transparency",
    "Responsive, minimal, and intuitive interface optimized for both desktop and mobile devices"
  ],
  technologies: "HTML5, CSS3, JavaScript",
  category: "Frontend",
  status: "Completed",
  link: "https://github.com/sowndariya-k/SpendWise"
},
morningAuraProject: {
  image: "assets/img/morningaura.png",
  tagline: "Start your day with calmness, clarity, and the right intention.",
  description: "Morning Aura is a soothing and interactive web experience designed to inspire positivity and mindfulness at the start of each day. This project creates a calming digital space where users are welcomed with motivational affirmations, uplifting visuals, and a serene interface that encourages focus and emotional well-being.",
  features: [
    "Displays refreshing motivational quotes to boost mindset and productivity",
    "Includes a gentle greeting that updates dynamically based on the time of day",
    "Minimalistic UI with soft color palette to create a visually calming environment",
    "Smooth transitions and elegant layout crafted for a distraction-free experience",
    "Fully responsive across screens, ensuring a clean and welcoming design on both mobile and desktop"
  ],
  technologies: "HTML5, CSS3, JavaScript",
  category: "Frontend",
  status: "Completed",
  link: "https://github.com/sowndariya-k/Morning-Aura",
  liveDemo: "https://sowndariya-k.github.io/Morning-Aura/"
}


};

function openPopup(projectKey) {
  const project = projects[projectKey];
  if (!project) return;

  document.getElementById("popup-image").src = project.image;
  document.getElementById("popup-description").textContent =
    project.description;

  const featuresList = document.getElementById("popup-features");
  featuresList.innerHTML = project.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  document.getElementById("popup-technologies").textContent =
    project.technologies;
  document.getElementById("popup-category").textContent = project.category;
  document.getElementById("popup-status").textContent = project.status;
  document.getElementById("popup-link").href = project.link;

  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/**
 * Contact Form
 */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name-field").value.trim();
    const email = document.getElementById("email-field").value.trim();
    const service = document.getElementById("service-field").value.trim();
    const message = document.getElementById("message-field").value.trim();

    if (!name || !email || !service || !message) {
      alert("All fields are required.");
      return;
    }

    const emailBody = `
Name: ${name}
Email: ${email}
Service: ${service}
Message: ${message}
`;

    const mailToLink = `mailto:sowndariyadeveloper@gmail.com?subject=Service Required - ${encodeURIComponent(
      service
    )}&body=${encodeURIComponent(emailBody)}`;

    const hiddenLink = document.createElement("a");
    hiddenLink.href = mailToLink;
    hiddenLink.click();
  });
});
