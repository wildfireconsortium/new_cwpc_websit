const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 50,
    behavior: 'smooth'
  });
});

function switchNavActive(){
// Get the current page URL
  const currentPage = window.location.href;

  // Get all the links in the navigation
  const navLinks = document.querySelectorAll('nav li a');

  // Loop through each link and check if it matches the current page URL
  navLinks.forEach(link => {
    if(link.id == 'home'){
      link.classList.add('active');
    }
    else if (link.id!='home' && currentPage.includes(link.getAttribute('href'))) {
      link.classList.add('active'); // Add a class to highlight the active link
      document.querySelectorAll('nav li a')[0].classList.remove('active');
    }
  });
}

function toggleHamburger() {
  const navMenu = document.querySelector(".global-navbar");
  navMenu.classList.toggle("show");
}

function toggleAdvHamburger(){
  const advMenu = document.querySelector(".advanced-navbar");
  advMenu.classList.toggle("show");
}

document.addEventListener('DOMContentLoaded', function () {
  const toggleLinks = document.querySelectorAll('.toggle-link');

  for (const link of toggleLinks) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const targetCardID = link.getAttribute('href').substring(1);
      const targetCard = document.getElementById(targetCardID);

      if (targetCard.style.display === 'none' || targetCard.style.display === '') {
        targetCard.style.display = 'block';
        // targetCard.style.borderTop = '2px solid #f6f6f6';
      } else {
        targetCard.style.display = 'none';
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const navMenu = document.querySelector(".global-navbar");
});

function openFormPopup(type,page) {
  const formPopup = document.getElementById('formPopup');
  formPopup.classList.add('show'); // Use classList to show the modal
  const modalBody = document.getElementById('form-body');
  if(page == undefined){
    page = "index";
  }
  switch(type){
    case 'contact':
      document.getElementById("formTitle").innerHTML = "Contact Form";

    fetch('/get-contact-form')
      .then(response => response.text())
      .then(html => {
        modalBody.innerHTML = html;
        const inputElement = modalBody.querySelector('input[name="pageName"]');
        inputElement.value = page; 
      });
      break;
    
      case 'download':
        document.getElementById("formTitle").innerHTML = "Download the Scorecard";

        fetch('/scorecardform')
        .then(response => response.text())
        .then(html => {
          modalBody.innerHTML = html;
          const inputElement = modalBody.querySelector('input[name="pageName"]');
          inputElement.value = page; 
        });
      break;

      case 'support':
        document.getElementById("formTitle").innerHTML = "Support Wildfire Prevention";

        fetch('/supportform')
        .then(response => response.text())
        .then(html => {
          modalBody.innerHTML = html;
          const inputElement = modalBody.querySelector('input[name="pageName"]');
          inputElement.value = page; 
        });
        break;
      
      case 'collab':
        document.getElementById("formTitle").innerHTML = "Collaborate With Us";

        fetch('/collabform')
        .then(response => response.text())
        .then(html => {
          modalBody.innerHTML = html;
          const inputElement = modalBody.querySelector('input[name="pageName"]');
          inputElement.value = page; 
        });
        break;

        case 'involved':
          document.getElementById("formTitle").innerHTML = "get involved";
  
          fetch('/involved_form')
          .then(response => response.text())
          .then(html => {
            modalBody.innerHTML = html;
            const inputElement = modalBody.querySelector('input[name="pageName"]');
            inputElement.value = page; 
          });

        break;
      case 'feedback':
        document.getElementById("formTitle").innerHTML = "Give us your Feedback";

        fetch('/feedbackform')
        .then(response => response.text())
        .then(html => {
          modalBody.innerHTML = html;
          const inputElement = modalBody.querySelector('input[name="pageName"]');
          inputElement.value = page; 
        });

        break;
  }
    
}

// Event listener for focusing input (adjust selector as needed)
const modal = document.getElementById('formPopup');
modal.addEventListener('shown.bs.modal', function () {
  const inputToFocus = document.getElementById('myInput'); // Adjust ID if needed
  if (inputToFocus) {
    inputToFocus.focus();
  }
});

function closeFormPopup(type){
  const formPopup = document.getElementById('formPopup');
  formPopup.classList.remove('show'); // Use classList to show the modal
}

const urlParams = new URLSearchParams(window.location.search);
const formStatus = urlParams.get('status');
const formName = urlParams.get('form');
const formDialog = document.getElementById('form-dialog'); // Get dialog reference

if (formStatus === "success") {
  formDialog.classList.add('success');
  const pTag = formDialog.querySelector('p'); 
  switch(formName){
    case 'contact':
      // Set the value of the p tag's content
      pTag.textContent = "Thank you for reaching out! We received your message and will get" 
      +" back to you shortly. Your interest means a lot to us! In the meantime, feel free to explore more about"
      +" our organization on the website."; 
      break;
    case 'subscribe':
      // Set the value of the p tag's content
      pTag.textContent = "Thank you for subscribing to the Catastrophic Wildfire Resilience Preventative!"
      +" We're thrilled to have you join our community. Stay tuned for exciting updates on this journey.";
      break;
    case 'download':
      const downloadElement = document.createElement('a');
      downloadElement.href = '/assets/content/CommunityWildfireResilienceScorecard-02-20-24v03b.zip';
      downloadElement.download = 'CommunityWildfireResilienceScorecard-02-20-24v03b.zip';
      downloadElement.click();

      pTag.textContent = "Thank you for downloading! If you have any questions or need assistance, feel free to contact us.";
      break;
    case 'support':
      pTag.textContent = "Thank you for becoming an essential part of the community!"
      +" Your support means the world to us";
      break;
    case 'collab':
      pTag.textContent = "Thank you for getting in touch with us! "
      +"We are grateful to have you as a valued member of our community. "
      +"Together, we are making a positive impact so look forward to creating meaningful change together.";
      break;
    case 'feedback':
      pTag.textContent ="Thank you for taking the time to share your valuable feedback. "
      +"Your insights are important, and we appreciate your contribution.";
      break;
  }
  formDialog.showModal(); 
}
else if (formStatus === "error"){
  formDialog.classList.add('error');
  const pTag = formDialog.querySelector('p'); 
  // Set the value of the p tag's content
  pTag.textContent = "Error submitting the form, please try again later. If error continues please contact us."; 
  formDialog.showModal(); 
}  


formDialog.addEventListener("click", (event) => { // Attach to dialog
  if (event.target.matches('button')) { // Check if button clicked
    formDialog.close();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url); // Revoke the temporary URL
}

