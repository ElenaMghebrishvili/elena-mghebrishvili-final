document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.navbar a');
    // ცვლადი, რომელიც შეინახავს აქტუალურ სექციას
    let currentSection = '';

    // ვატარებთ ციკლს ყველა სექციაზე, რათა ვნახოთ, რომელ სექციაში ვართ.
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            // ვინახავთ შესაბამისი სექციის ID-ს.
            currentSection = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});
    
// ვამოწმებთ, თუ ლინკის URL ემთხვევა მიმდინარე გვერდის URL-ს. 
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.navbar a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});
