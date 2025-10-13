
(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**


  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });


  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
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
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


function toggleTab(tabId) {
  const tabs = document.querySelectorAll('.qualification-content');
  tabs.forEach((tab) => {
    tab.classList.remove('active');
  });

  document.getElementById(tabId).classList.add('active');
}



// Get all card links
const cardLinks = document.querySelectorAll('.card-link');

// Get all popup overlays
const popups = document.querySelectorAll('.popup-overlay');

// Add event listener to each card link to show respective popup
cardLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetPopupId = this.getAttribute('data-target');
    const targetPopup = document.getElementById(targetPopupId);
    targetPopup.classList.add('show');
  });
});

// Add event listener to close buttons
document.querySelectorAll('.close-btn').forEach(closeBtn => {
  closeBtn.addEventListener('click', function () {
    this.closest('.popup-overlay').classList.remove('show');
  });
});

// Optionally, close popup when clicking outside the popup content
window.addEventListener('click', function (event) {
  if (event.target.classList.contains('popup-overlay')) {
    event.target.classList.remove('show');
  }
});

function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');
  const filterItems = document.querySelectorAll('.filter-item');

  // Update active class on filter buttons
  filterItems.forEach(item => item.classList.remove('active'));
  document.querySelector(`[data-filter="${category}"]`).classList.add('active');

  // Show/hide projects based on the selected category
  projects.forEach(project => {
    if (category === 'all' || project.dataset.category === category) {
      project.style.display = 'block'; // Show matching projects
    } else {
      project.style.display = 'none'; // Hide non-matching projects
    }
  });
}


const projects = {
  zekesys: {
    image: "assets/img/work5.jpg",
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
    image: "assets/img/work1.jpg",
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
    image: "assets/img/port3.jpg",
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
  category: "Web Application",
  status: "In Progress",
  link: "https://github.com/sowndariya-k/SpendWise"
}

};

function openPopup(projectKey) {
  const project = projects[projectKey];
  if (!project) return;

  document.getElementById("popup-image").src = project.image;
  document.getElementById("popup-description").textContent = project.description;

  const featuresList = document.getElementById("popup-features");
  featuresList.innerHTML = project.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  document.getElementById("popup-technologies").textContent = project.technologies;
  document.getElementById("popup-category").textContent = project.category;
  document.getElementById("popup-status").textContent = project.status;
  document.getElementById("popup-link").href = project.link;

  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

//contact
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Collect form data
      const name = document.getElementById('name-field').value.trim();
      const email = document.getElementById('email-field').value.trim();
      const service = document.getElementById('service-field').value.trim();
      const message = document.getElementById('message-field').value.trim();

      // Validation
      if (!name || !email || !service || !message) {
          alert('All fields are required.');
          return;
      }

      // Prepare email body
      const emailBody = `
          Name: ${name}
          Email: ${email}
          Service: ${service}
          Message: ${message}
      `;

      // Redirect to mailto link
      const mailToLink = `mailto:sowndariyadeveloper@gmail.com?subject=Service Required - ${encodeURIComponent(service)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailToLink;
  });
});

