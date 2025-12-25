
        // Portfolio Filter Functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.6s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // WhatsApp Modal - Show after 5 seconds
        setTimeout(() => {
            document.getElementById('whatsappModal').classList.add('show');
        }, 5000);

        // Facebook Modal - Show after 10 seconds
        setTimeout(() => {
            // Only show if WhatsApp modal was closed
            if (!document.getElementById('whatsappModal').classList.contains('show')) {
                document.getElementById('facebookModal').classList.add('show');
            }
        }, 10000);

        function closeWhatsAppModal() {
            document.getElementById('whatsappModal').classList.remove('show');
            // Show Facebook modal 5 seconds after closing WhatsApp modal
            setTimeout(() => {
                document.getElementById('facebookModal').classList.add('show');
            }, 5000);
        }

        function closeFacebookModal() {
            document.getElementById('facebookModal').classList.remove('show');
        }

        // Close modals when clicking outside
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });

        // Prevent body scroll when modal is open
        const modalObserver = new MutationObserver(() => {
            const anyModalOpen = document.querySelector('.modal-overlay.show');
            if (anyModalOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modalObserver.observe(modal, { attributes: true, attributeFilter: ['class'] });
        });