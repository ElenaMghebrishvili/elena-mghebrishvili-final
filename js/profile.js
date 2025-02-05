const editProfileBtn = document.getElementById("edit-profile-btn");
const editProfileForm = document.getElementById("edit-profile-form");
const profileDetails = document.getElementById("profile-details");
const cancelEditBtn = document.getElementById("cancel-edit");

const popupModal = document.getElementById("popup-modal");
const closePopupBtn = document.getElementById("close-popup-btn");
const closePopupIcon = document.getElementById("close-popup");


//პროფილის რედაქტირება
editProfileBtn.addEventListener("click", () => {
    profileDetails.style.display = "none"; 
    editProfileForm.style.display = "block"; 
});

//რედაქტირების გაუქმება
cancelEditBtn.addEventListener("click", () => {
    profileDetails.style.display = "block";
    editProfileForm.style.display = "none"; 
});

//პროფილის ფორმის შესავლის დამუშავება
editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const name = document.getElementById("edit-name").value;
    const email = document.getElementById("edit-email").value;
    const password = document.getElementById("edit-password").value;

    document.getElementById("username").textContent = name;
    document.getElementById("email").textContent = email;

    profileDetails.style.display = "block";
    editProfileForm.style.display = "none";

    popupModal.style.display = "block";
});

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

//პაროლის შეცვლა (დამალვა / ჩვენება)
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
