document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Effect
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Smooth interaction for feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box');

    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const icon = box.querySelector('.f-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        box.addEventListener('mouseleave', () => {
            const icon = box.querySelector('.f-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // 3. Search Bar interactiveness
    const searchInput = document.querySelector('.hero-search input');
    const searchContainer = document.querySelector('.hero-search');

    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchContainer.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
            searchContainer.style.transform = 'translateY(-2px)';
            searchContainer.style.transition = 'all 0.3s ease';
        });

        searchInput.addEventListener('blur', () => {
            searchContainer.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            searchContainer.style.transform = 'translateY(0)';
        });
    }

    // 4. Handle Results Dropdown and Interactive Card
    const btnShowResults = document.getElementById('btn-show-results');
    const resultsDropdown = document.getElementById('results-dropdown');
    const resultsCard = document.getElementById('results-card');
    const cardTitle = resultsCard ? resultsCard.querySelector('.rm-header h3') : null;

    if (btnShowResults && resultsDropdown && resultsCard) {
        // Toggle Dropdown when clicking the button
        btnShowResults.addEventListener('click', (e) => {
            e.preventDefault();

            // If the results card is already shown, hide it and restore stats, don't show dropdown
            if (resultsCard.classList.contains('show-card')) {
                resultsCard.classList.remove('show-card');

                // Restore Stats Row
                const statsRow = document.querySelector('.stats-row');
                if (statsRow) {
                    statsRow.style.opacity = '1';
                    statsRow.style.visibility = 'visible';
                    statsRow.style.height = '';
                    statsRow.style.margin = '';
                    statsRow.style.padding = '';
                    statsRow.style.overflow = '';
                }

                // Hide dropdown just in case
                resultsDropdown.classList.remove('show-dropdown');
            } else {
                // Otherwise toggle the dropdown
                resultsDropdown.classList.toggle('show-dropdown');
            }
        });

        // Handle clicking outside to close dropdown
        document.addEventListener('click', (e) => {
            if (!btnShowResults.contains(e.target) && !resultsDropdown.contains(e.target)) {
                resultsDropdown.classList.remove('show-dropdown');
            }
        });

        // Handle item selection
        const examOptions = resultsDropdown.querySelectorAll('li a');
        examOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();

                // Get selected exam title
                const selectedExam = e.target.getAttribute('data-exam');

                // Update Card Title
                if (cardTitle) {
                    cardTitle.textContent = `Resultados ${selectedExam} — 2026`;
                }

                // Hide Dropdown
                resultsDropdown.classList.remove('show-dropdown');

                // Hide Stats Row
                const statsRow = document.querySelector('.stats-row');
                if (statsRow) {
                    statsRow.style.opacity = '0';
                    statsRow.style.visibility = 'hidden';
                    statsRow.style.height = '0';
                    statsRow.style.margin = '0';
                    statsRow.style.padding = '0';
                    statsRow.style.overflow = 'hidden';
                    statsRow.style.transition = 'all 0.5s ease';
                }

                // Show Card (if not already shown)
                if (!resultsCard.classList.contains('show-card')) {
                    resultsCard.classList.add('show-card');
                } else {
                    // Reset styling to replay animation
                    const bars = resultsCard.querySelectorAll('.score-bar-fill');
                    bars.forEach(bar => { bar.style.width = '0%'; });
                    // Small timeout to allow reflow so transition works again
                }

                // Animate bars and numbers
                setTimeout(() => {
                    const bars = resultsCard.querySelectorAll('.score-bar-fill');
                    bars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });

                    const nums = resultsCard.querySelectorAll('.score-num');
                    nums.forEach(numElement => {
                        numElement.textContent = '0';
                        const targetVal = parseInt(numElement.getAttribute('data-val'));
                        let currentVal = 0;
                        const duration = 1500;
                        const stepTime = Math.abs(Math.floor(duration / targetVal));

                        const timer = setInterval(() => {
                            currentVal += 1;
                            numElement.textContent = currentVal;
                            if (currentVal >= targetVal) {
                                clearInterval(timer);
                                numElement.textContent = targetVal;
                            }
                        }, stepTime);
                    });
                }, 50);

            });
        });
    }

    // 5. Animate stats numbers on scroll (Intersection Observer)
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = document.querySelectorAll('.stat-number');

                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        const suffix = stat.getAttribute('data-suffix');
                        const duration = 2000; // 2 seconds animation

                        // Use a smoother approach for large numbers
                        let startTimestamp = null;
                        const step = (timestamp) => {
                            if (!startTimestamp) startTimestamp = timestamp;
                            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                            // easeOutQuart easing for nice deceleration
                            const easeProgress = 1 - Math.pow(1 - progress, 4);
                            const currentVal = Math.floor(easeProgress * target);

                            // formatting with commas
                            stat.textContent = currentVal.toLocaleString('en-US') + suffix;

                            if (progress < 1) {
                                window.requestAnimationFrame(step);
                            } else {
                                stat.textContent = target.toLocaleString('en-US') + suffix;
                            }
                        };
                        window.requestAnimationFrame(step);
                    });

                    // Stop observing once animated
                    statsObserver.unobserve(statsRow);
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statsRow);
    }
});
