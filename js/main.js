// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            if(navLinks.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Mobile Dropdown Toggle
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownBtn && dropdown && window.innerWidth <= 768) {
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }

    // --- Search Functionality ---
    const searchInput = document.getElementById('mainSearch');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        // Search searchable index
        const searchData = [
            // Core Subjects and Pages
            { title: 'Pharmaceutics', type: 'Subject', url: 'pages/pharmacutics.html', icon: '🧪', keywords: 'pharmaceutics formulation drugs overview' },
            { title: 'Physiology', type: 'Subject', url: 'pages/physiology.html', icon: '🧠', keywords: 'physiology body systems' },
            { title: 'Biochemistry', type: 'Subject', url: 'pages/biochemistry.html', icon: '🧬', keywords: 'biochemistry chemistry living' },
            { title: 'Organic Chemistry', type: 'Subject', url: 'pages/organic_chemistry.html', icon: '⚗️', keywords: 'organic chemistry carbon structure' },
            { title: 'Practicals', type: 'Subject', url: 'pages/practicals.html', icon: '🔬', keywords: 'practicals labs experiments' },
            { title: 'Student Notes', type: 'Resource', url: 'pages/student_notes.html', icon: '📚', keywords: 'student notes community shared' },
            { title: 'Video Clips', type: 'Resource', url: 'pages/videos.html', icon: '🎥', keywords: 'videos clips watch visual' },
            { title: 'Exam Probability Predictor', type: 'Tool', url: 'pages/exam_predictor.html', icon: '📈', keywords: 'exam predictor probability calculator' },
            { title: 'Teacher Survival Guide', type: 'Guide', url: 'pages/teacher_guide.html', icon: '👨‍🏫', keywords: 'teacher guide survival professors faculty' },

            // Pharmaceutics PDFs
            { title: 'Intro & History', type: 'PDF • Pharm', url: 'pages/viewer.html?file=../pdfs/Pharmacutics/1.%20Pharmacutics.%20Intro%20%26%20history.pdf', icon: '📄', keywords: 'pharmacutics introduction history intro basic' },
            { title: 'Scientific Literature', type: 'PDF • Pharm', url: 'pages/viewer.html?file=../pdfs/Pharmacutics/2.%20Pharmacutics.%20Scientific%20literature.pdf', icon: '📄', keywords: 'pharmacutics literature scientific publications research' },
            { title: 'Introductory Concepts', type: 'PDF • Pharm', url: 'pages/viewer.html?file=../pdfs/Pharmacutics/3.%20Pharmacutics.%20P%20pharm%20intro%20concepts.pdf', icon: '📄', keywords: 'pharmacutics introductory concepts basics intro' },
            { title: 'Basic Concepts', type: 'PDF • Pharm', url: 'pages/viewer.html?file=../pdfs/Pharmacutics/4.%20Pharmacutics.%20P%20pharm%20basic%20concepts.pdf', icon: '📄', keywords: 'pharmacutics basic concepts foundational' },
            { title: 'Solutions', type: 'PDF • Pharm', url: 'pages/viewer.html?file=../pdfs/Pharmacutics/5.%20Pharmacutics.%20Solutions.pdf', icon: '📄', keywords: 'pharmacutics solutions mixtures dissolving' },
            { title: 'Colligative Properties', type: 'PDF • Pharm', url: 'pages/viewer.html?file=../pdfs/Pharmacutics/6.%20Pharmacutics.%20Colligative%20properties.pdf', icon: '📄', keywords: 'pharmacutics colligative properties osmolarity boiling point freezing' },
            { title: 'Solubility n Solubilization', type: 'PDF • Pharm', url: 'pages/viewer.html?file=../pdfs/Pharmacutics/7.%20Pharmacutics.%20Solubility%20n%20solubilization.pdf', icon: '📄', keywords: 'pharmacutics solubility solubilization dissolve solvent' },

            // Physiology PDFs
            { title: 'Organ Systems', type: 'PDF • Physio', url: 'pages/viewer.html?file=../pdfs/Physiology/1.%20Physiology.%20Organ%20Systems.pdf', icon: '📄', keywords: 'physiology organ systems body intro' },
            { title: 'Cell', type: 'PDF • Physio', url: 'pages/viewer.html?file=../pdfs/Physiology/2.%20Physiology.%20Cell.pdf', icon: '📄', keywords: 'physiology cells cellular biology' },
            { title: 'Transport Mechanism', type: 'PDF • Physio', url: 'pages/viewer.html?file=../pdfs/Physiology/3.%20Physiology.%20Transport%20mechanism.pdf', icon: '📄', keywords: 'physiology transport mechanism active diffusion osmosis' },
            { title: 'Musculoskeleton System', type: 'PDF • Physio', url: 'pages/viewer.html?file=../pdfs/Physiology/4.%20Physiology.%20Musculoskeleton%20System.pdf', icon: '📄', keywords: 'physiology musculoskeletal muscles bones skeleton movement' },
            { title: 'Neuromuscular Junction', type: 'PDF • Physio', url: 'pages/viewer.html?file=../pdfs/Physiology/5.%20Physiology.%20Neuromuscular%20Junction.pdf', icon: '📄', keywords: 'physiology neuromuscular junction nerves synapses motor plate' },
            { title: 'Temperature Regulation', type: 'PDF • Physio', url: 'pages/viewer.html?file=../pdfs/Physiology/6.%20Physiology.%20Temperature%20Regulation.pdf', icon: '📄', keywords: 'physiology temperature regulation hypothermia hyperthermia body heat' },
            { title: 'Digestion and Absorption', type: 'PDF • Physio', url: 'pages/viewer.html?file=../pdfs/Physiology/7.%20Physiology.%20Digestion%20and%20Absorption.pdf', icon: '📄', keywords: 'physiology digestion absorption gi tract stomach intestines' },

            // Biochemistry PDFs
            { title: 'Pharmaceutical Biochemistry', type: 'PDF • Biochem', url: 'pages/viewer.html?file=../pdfs/biochemistery/0.%20Biochem.%20Pharmaceutical%20Biochemistry.pdf', icon: '📄', keywords: 'biochem biochemistry pharmaceutical introduction' },
            { title: 'Carbohydrates', type: 'PDF • Biochem', url: 'pages/viewer.html?file=../pdfs/biochemistery/1.%20Biochem.%20Carbohydrates.pdf', icon: '📄', keywords: 'biochem biochemistry carbohydrates sugars glucose' },
            { title: 'Metabolic Pathways', type: 'PDF • Biochem', url: 'pages/viewer.html?file=../pdfs/biochemistery/2.%20Biochem.%20Metabolic%20pathways.pdf', icon: '📄', keywords: 'biochem biochemistry metabolic pathways metabolism energy' },
            { title: 'Gluconeogenesis', type: 'PDF • Biochem', url: 'pages/viewer.html?file=../pdfs/biochemistery/3.%20Biochem.%20Gluconeogenesis.pdf', icon: '📄', keywords: 'biochem biochemistry gluconeogenesis glucose synthesis metabolism' },
            { title: 'GLYCOGEN', type: 'PDF • Biochem', url: 'pages/viewer.html?file=../pdfs/biochemistery/4.%20Biochem.%20GLYCOGEN.pdf', icon: '📄', keywords: 'biochem biochemistry glycogen storage energy' },
            { title: 'Citric Acid Cycle', type: 'PDF • Biochem', url: 'pages/viewer.html?file=../pdfs/biochemistery/5.%20Biochem.%20Citric%20acid%20cycle.pdf', icon: '📄', keywords: 'biochem biochemistry citric acid cycle krebs cycle tca cycle' },

            // Organic Chemistry PDFs
            { title: 'Steric Effect', type: 'PDF • Organic', url: 'pages/viewer.html?file=../pdfs/organic%20che/1.Organic.steric%20effect%20pdf.pdf', icon: '📄', keywords: 'organic chemistry steric effect hindrance bulkiness' },
            { title: 'Aromaticity & Tautomerism', type: 'PDF • Organic', url: 'pages/viewer.html?file=../pdfs/organic%20che/2.Organic.%20Aromaticity%20%26%20Tautomerism.pdf', icon: '📄', keywords: 'organic chemistry aromaticity tautomerism rings isomers' },
            { title: 'Resonance', type: 'PDF • Organic', url: 'pages/viewer.html?file=../pdfs/organic%20che/3.%20Organic.%20Resonance.pdf', icon: '📄', keywords: 'organic chemistry resonance electrons stabilization' },
            { title: 'Hybridization', type: 'PDF • Organic', url: 'pages/viewer.html?file=../pdfs/organic%20che/4.%20Organic.%20Hybridization.pdf', icon: '📄', keywords: 'organic chemistry hybridization orbitals sp sp2 sp3 bonding' }
        ];

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 1) {
                searchResults.classList.remove('active');
                return;
            }

            const filtered = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.type.toLowerCase().includes(query) ||
                (item.keywords && item.keywords.toLowerCase().includes(query))
            );

            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(item => `
                    <a href="${item.url}" class="search-result-item">
                        <div class="result-icon">${item.icon}</div>
                        <div class="result-info">
                            <h4>${item.title}</h4>
                            <span>${item.type}</span>
                        </div>
                    </a>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = `
                    <div class="search-result-item">
                        <div class="result-info">
                            <h4>No results found</h4>
                            <span>Try a different keyword</span>
                        </div>
                    </div>
                `;
                searchResults.classList.add('active');
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }
});
