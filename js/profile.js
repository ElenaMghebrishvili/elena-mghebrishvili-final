const editProfileBtn = document.getElementById("edit-profile-btn");
const editProfileForm = document.getElementById("edit-profile-form");
const profileDetails = document.getElementById("profile-details");
const cancelEditBtn = document.getElementById("cancel-edit");

const popupModal = document.getElementById("popup-modal");
const closePopupBtn = document.getElementById("close-popup-btn");
const closePopupIcon = document.getElementById("close-popup");


const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

// Email & Password Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; 

// პროფილის რედაქტირება
editProfileBtn.addEventListener("click", () => {
    profileDetails.style.display = "none"; 
    editProfileForm.style.display = "block"; 
});

// რედაქტირების გაუქმება
cancelEditBtn.addEventListener("click", () => {
    profileDetails.style.display = "block";
    editProfileForm.style.display = "none"; 
});

// პროფილის ფორმის ვალიდაცია და შენახვა
editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const name = document.getElementById("edit-name").value.trim();
    const email = document.getElementById("edit-email").value.trim();
    const password = document.getElementById("edit-password").value.trim();

    let isValid = true;

    if (name === "") {
        nameError.textContent = "The name field must not be empty!";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    if (!emailRegex.test(email)) {
        emailError.textContent = "Enter a valid Email!";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    if (!passwordRegex.test(password)) {
        passwordError.textContent = "The password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number!";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }

    // თუ ყველა ველი სწორია
    if (isValid) {
        document.getElementById("username").textContent = name;
        document.getElementById("email").textContent = email;

        profileDetails.style.display = "block";
        editProfileForm.style.display = "none";

        popupModal.style.display = "block";
    }
});

// Popup დახურვა
closePopupBtn.addEventListener("click", () => {
    popupModal.style.display = "none";
});

closePopupIcon.addEventListener("click", () => {
    popupModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === popupModal) {
        popupModal.style.display = "none";
    }
});

// პაროლის შეცვლა (დამალვა / ჩვენება)
function togglePassword() {
    const passwordInput = document.getElementById('edit-password');
    const eyeIcon = document.getElementById('eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}
