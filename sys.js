
// WhatsApp Modal - Show after 5 seconds
//    setTimeout(() => {
//    const whatsappModal = document.getElementById('whatsappModal');
//    if (whatsappModal) {
//        whatsappModal.style.display = 'flex';  // Ensure display:flex first
//        whatsappModal.classList.add('active'); // Use 'active' class per your CSS
//    }
//}, 5000);

// Facebook Modal - Show after 10 seconds
setTimeout(() => {
    const whatsappModal = document.getElementById('whatsappModal');
    if (!whatsappModal.classList.contains('active')) {
        const facebookModal = document.getElementById('facebookModal');
        if (facebookModal) {
            facebookModal.style.display = 'flex';
            facebookModal.classList.add('active');
        }
    }
}, 15000);

function closeWhatsAppModal() {
    const whatsappModal = document.getElementById('whatsappModal');
    whatsappModal.classList.remove('active');
    whatsappModal.style.display = 'none';
    // Show Facebook modal 5 seconds after
    setTimeout(() => {
        const facebookModal = document.getElementById('facebookModal');
        facebookModal.style.display = 'flex';
        facebookModal.classList.add('active');
    }, 5000);
}

function closeFacebookModal() {
    const facebookModal = document.getElementById('facebookModal');
    facebookModal.classList.remove('active');
    facebookModal.style.display = 'none';
}

// Close modals when clicking outside
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    });
});

// Prevent body scroll when modal is open
const modalObserver = new MutationObserver(() => {
    const anyModalOpen = document.querySelector('.modal-overlay.active');
    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
});
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modalObserver.observe(modal, { attributes: true, attributeFilter: ['class'] });
});
