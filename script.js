// Handle URL parameters for course pre-selection
document.addEventListener("DOMContentLoaded", function () {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const courseParam = urlParams.get("course");

  // Pre-select course if parameter exists
  if (courseParam) {
    const courseSelect = document.getElementById("courseLevel");
    if (courseSelect) {
      const option = courseSelect.querySelector(
        `option[value="${courseParam}"]`,
      );
      if (option) {
        courseSelect.value = courseParam;
      }
    }
  }

  // Handle registration form submission
  const registrationForm = document.getElementById("registrationForm");
  if (registrationForm) {
    registrationForm.addEventListener("submit", handleFormSubmit);
  }
});

// Form submission handler
function handleFormSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(e.target);
  const data = {};

  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Get course name for display
  const courseSelect = document.getElementById("courseLevel");
  const courseName = courseSelect.options[courseSelect.selectedIndex].text;

  // Create email body
  const emailBody = createEmailBody(data, courseName);

  // Create mailto link
  const mailtoLink = `mailto:info.deutschamabend@gmail.com?subject=Course Registration - ${data.firstName} ${data.lastName}&body=${encodeURIComponent(emailBody)}`;

  // Open default email client
  window.location.href = mailtoLink;

  // Show confirmation message
  showConfirmation();
}

// Create formatted email body
function createEmailBody(data, courseName) {
  const language = document.documentElement.lang;
  const isEnglish = language === "en";

  let body = isEnglish
    ? "=== COURSE REGISTRATION ===\n\n"
    : "=== KURSANMELDUNG ===\n\n";

  // Personal Information
  body += isEnglish
    ? "PERSONAL INFORMATION:\n"
    : "PERSÖNLICHE INFORMATIONEN:\n";
  body += `${isEnglish ? "Name" : "Name"}: ${data.firstName} ${data.lastName}\n`;
  body += `${isEnglish ? "Email" : "E-Mail"}: ${data.email}\n`;
  body += `${isEnglish ? "Phone" : "Telefon"}: ${data.phone}\n`;
  body += `${isEnglish ? "Date of Birth" : "Geburtsdatum"}: ${data.dateOfBirth}\n`;

  if (data.address) {
    body += `${isEnglish ? "Address" : "Adresse"}: ${data.address}\n`;
  }
  if (data.city) {
    body += `${isEnglish ? "City" : "Stadt"}: ${data.city}\n`;
  }
  if (data.postalCode) {
    body += `${isEnglish ? "Postal Code" : "Postleitzahl"}: ${data.postalCode}\n`;
  }
  body += `${isEnglish ? "Country" : "Land"}: ${data.country}\n\n`;

  // Course Selection
  body += isEnglish ? "COURSE SELECTION:\n" : "KURSWAHL:\n";
  body += `${isEnglish ? "Selected Course" : "Gewählter Kurs"}: ${courseName}\n`;

  const startDateSelect = document.getElementById("startDate");
  const startDateText =
    startDateSelect.options[startDateSelect.selectedIndex].text;
  body += `${isEnglish ? "Preferred Start Date" : "Bevorzugtes Startdatum"}: ${startDateText}\n\n`;

  // Language Background
  body += isEnglish ? "LANGUAGE BACKGROUND:\n" : "SPRACHHINTERGRUND:\n";
  body += `${isEnglish ? "Native Language" : "Muttersprache"}: ${data.nativeLanguage}\n`;

  const germanLevelSelect = document.getElementById("germanLevel");
  const germanLevelText =
    germanLevelSelect.options[germanLevelSelect.selectedIndex].text;
  body += `${isEnglish ? "Current German Level" : "Aktuelles Deutschniveau"}: ${germanLevelText}\n`;

  const previousCourses =
    data.previousCourses === "yes"
      ? isEnglish
        ? "Yes"
        : "Ja"
      : isEnglish
        ? "No"
        : "Nein";
  body += `${isEnglish ? "Previous German Courses" : "Frühere Deutschkurse"}: ${previousCourses}\n\n`;

  // Learning Goals
  if (data.learningGoals) {
    body += isEnglish ? "LEARNING GOALS:\n" : "LERNZIELE:\n";
    body += `${data.learningGoals}\n\n`;
  }

  // Payment Preference
  const paymentPlanSelect = document.getElementById("paymentPlan");
  const paymentPlanText =
    paymentPlanSelect.options[paymentPlanSelect.selectedIndex].text;
  body += `${isEnglish ? "Payment Preference" : "Zahlungspräferenz"}: ${paymentPlanText}\n\n`;

  // Additional Comments
  if (data.comments) {
    body += isEnglish ? "ADDITIONAL COMMENTS:\n" : "ZUSÄTZLICHE KOMMENTARE:\n";
    body += `${data.comments}\n\n`;
  }

  // Newsletter
  const newsletter =
    data.newsletter === "on"
      ? isEnglish
        ? "Yes, subscribed to newsletter"
        : "Ja, Newsletter abonniert"
      : isEnglish
        ? "No newsletter subscription"
        : "Kein Newsletter-Abonnement";
  body += `${isEnglish ? "Newsletter" : "Newsletter"}: ${newsletter}\n\n`;

  // Footer
  body += "---\n";
  body += isEnglish
    ? "This registration was submitted via the German Language Academy website.\n"
    : "Diese Anmeldung wurde über die Website der Deutschen Sprachakademie eingereicht.\n";
  body += new Date().toLocaleString();

  return body;
}

// Show confirmation message
function showConfirmation() {
  const language = document.documentElement.lang;
  const isEnglish = language === "en";

  const message = isEnglish
    ? "Your registration form is ready to send!\n\nYour email client should open shortly. If it doesn't open automatically, please send an email to info.deutschamabend@gmail.comlleangebote@gmail.com with your registration details.\n\nYou will receive a confirmation within 24 hours."
    : "Ihr Anmeldeformular ist versandbereit!\n\nIhr E-Mail-Client sollte sich in Kürze öffnen. Falls er sich nicht automatisch öffnet, senden Sie bitte eine E-Mail an info.deutschamabend@gmail.comlleangebote@gmail.com mit Ihren Anmeldedaten.\n\nSie erhalten innerhalb von 24 Stunden eine Bestätigung.";

  alert(message);
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Add active state to navigation based on scroll position
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Form validation enhancement
document
  .querySelectorAll("input[required], select[required], textarea[required]")
  .forEach((field) => {
    field.addEventListener("invalid", function (e) {
      e.preventDefault();
      this.classList.add("error");
    });

    field.addEventListener("input", function () {
      this.classList.remove("error");
    });
  });

// Add visual feedback for form fields
document
  .querySelectorAll(
    ".form-group input, .form-group select, .form-group textarea",
  )
  .forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    field.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");
      if (this.value) {
        this.parentElement.classList.add("filled");
      } else {
        this.parentElement.classList.remove("filled");
      }
    });
  });
