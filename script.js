// Portfolio Generator JavaScript

class PortfolioGenerator {
    constructor() {
        this.initializeEventListeners();
        this.setupFormValidation();
        this.startLivePreview();
    }

    initializeEventListeners() {
        // Add experience button
        document.getElementById('addExperience').addEventListener('click', () => {
            this.addExperienceItem();
        });

        // Add education button
        document.getElementById('addEducation').addEventListener('click', () => {
            this.addEducationItem();
        });

        // Add project button
        document.getElementById('addProject').addEventListener('click', () => {
            this.addProjectItem();
        });

        // Preview button
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.showPreviewModal();
        });

        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportPortfolio();
        });

        // Export from preview modal
        document.getElementById('exportFromPreview').addEventListener('click', () => {
            this.exportPortfolio();
        });

        // Theme and layout change listeners
        document.getElementById('theme').addEventListener('change', () => {
            this.updatePreview();
        });

        document.getElementById('layout').addEventListener('change', () => {
            this.updatePreview();
        });
    }

    setupFormValidation() {
        const form = document.getElementById('portfolioForm');
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('is-invalid');
            return false;
        } else {
            field.classList.remove('is-invalid');
            return true;
        }
    }

    addExperienceItem() {
        const container = document.getElementById('experienceContainer');
        const newItem = document.createElement('div');
        newItem.className = 'experience-item mb-3';
        newItem.innerHTML = `
            <button type="button" class="remove-btn" onclick="this.parentElement.remove(); portfolioGenerator.updatePreview();">
                <i class="fas fa-times"></i>
            </button>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Job Title" name="jobTitle">
                </div>
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Company" name="company">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Duration (e.g., 2020-2023)" name="duration">
                </div>
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Location" name="location">
                </div>
            </div>
            <textarea class="form-control mb-2" rows="3" placeholder="Description of your role and achievements..." name="description"></textarea>
        `;
        container.appendChild(newItem);
        this.updatePreview();
    }

    addEducationItem() {
        const container = document.getElementById('educationContainer');
        const newItem = document.createElement('div');
        newItem.className = 'education-item mb-3';
        newItem.innerHTML = `
            <button type="button" class="remove-btn" onclick="this.parentElement.remove(); portfolioGenerator.updatePreview();">
                <i class="fas fa-times"></i>
            </button>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Degree" name="degree">
                </div>
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Institution" name="institution">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Year" name="year">
                </div>
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="GPA (optional)" name="gpa">
                </div>
            </div>
        `;
        container.appendChild(newItem);
        this.updatePreview();
    }

    addProjectItem() {
        const container = document.getElementById('projectsContainer');
        const newItem = document.createElement('div');
        newItem.className = 'project-item mb-3';
        newItem.innerHTML = `
            <button type="button" class="remove-btn" onclick="this.parentElement.remove(); portfolioGenerator.updatePreview();">
                <i class="fas fa-times"></i>
            </button>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Project Name" name="projectName">
                </div>
                <div class="col-md-6 mb-2">
                    <input type="url" class="form-control" placeholder="Project URL" name="projectUrl">
                </div>
            </div>
            <textarea class="form-control mb-2" rows="3" placeholder="Project description..." name="projectDescription"></textarea>
            <input type="text" class="form-control mb-2" placeholder="Technologies used (comma separated)" name="technologies">
        `;
        container.appendChild(newItem);
        this.updatePreview();
    }

    startLivePreview() {
        const form = document.getElementById('portfolioForm');
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updatePreview();
            });
        });
    }

    updatePreview() {
        const previewContainer = document.getElementById('previewContainer');
        const formData = this.getFormData();

        if (this.hasMinimumData(formData)) {
            const portfolioHTML = this.generatePortfolioHTML(formData);
            previewContainer.innerHTML = portfolioHTML;
            previewContainer.classList.add('preview-fade-in');
        } else {
            previewContainer.innerHTML = `
                <div class="preview-placeholder">
                    <i class="fas fa-user-circle"></i>
                    <p>Fill out the form to see your portfolio preview here</p>
                </div>
            `;
        }
    }

    hasMinimumData(formData) {
        return formData.fullName && formData.title;
    }

    getFormData() {
        const formData = {
            fullName: document.getElementById('fullName').value,
            title: document.getElementById('title').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            about: document.getElementById('about').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
            twitter: document.getElementById('twitter').value,
            website: document.getElementById('website').value,
            skills: document.getElementById('skills').value,
            theme: document.getElementById('theme').value,
            layout: document.getElementById('layout').value,
            experience: this.getExperienceData(),
            education: this.getEducationData(),
            projects: this.getProjectsData()
        };
        return formData;
    }

    getExperienceData() {
        const experienceItems = document.querySelectorAll('.experience-item');
        const experience = [];

        experienceItems.forEach(item => {
            const inputs = item.querySelectorAll('input, textarea');
            const experienceItem = {};

            inputs.forEach(input => {
                if (input.name && input.value.trim()) {
                    experienceItem[input.name] = input.value.trim();
                }
            });

            if (Object.keys(experienceItem).length > 0) {
                experience.push(experienceItem);
            }
        });

        return experience;
    }

    getEducationData() {
        const educationItems = document.querySelectorAll('.education-item');
        const education = [];

        educationItems.forEach(item => {
            const inputs = item.querySelectorAll('input');
            const educationItem = {};

            inputs.forEach(input => {
                if (input.name && input.value.trim()) {
                    educationItem[input.name] = input.value.trim();
                }
            });

            if (Object.keys(educationItem).length > 0) {
                education.push(educationItem);
            }
        });

        return education;
    }

    getProjectsData() {
        const projectItems = document.querySelectorAll('.project-item');
        const projects = [];

        projectItems.forEach(item => {
            const inputs = item.querySelectorAll('input, textarea');
            const projectItem = {};

            inputs.forEach(input => {
                if (input.name && input.value.trim()) {
                    projectItem[input.name] = input.value.trim();
                }
            });

            if (Object.keys(projectItem).length > 0) {
                projects.push(projectItem);
            }
        });

        return projects;
    }

    generatePortfolioHTML(data) {
        const themeClass = `theme-${data.theme}`;
        const layoutClass = `layout-${data.layout}`;

        return `
            <div class="portfolio-template ${themeClass} ${layoutClass}">
                <!-- Header Section -->
                <div class="portfolio-header">
                    <div class="container">
                        <h1>${data.fullName || 'Your Name'}</h1>
                        <div class="title">${data.title || 'Professional Title'}</div>
                        ${data.location ? `<div class="location">${data.location}</div>` : ''}
                        <div class="contact-info">
                            ${data.email ? `<a href="mailto:${data.email}"><i class="fas fa-envelope"></i> ${data.email}</a>` : ''}
                            ${data.phone ? `<a href="tel:${data.phone}"><i class="fas fa-phone"></i> ${data.phone}</a>` : ''}
                        </div>
                        ${this.generateSocialLinks(data)}
                    </div>
                </div>

                <!-- About Section -->
                ${data.about ? `
                <div class="portfolio-section about-section">
                    <div class="container">
                        <h2>About Me</h2>
                        <p>${data.about}</p>
                    </div>
                </div>
                ` : ''}

                <!-- Skills Section -->
                ${data.skills ? `
                <div class="portfolio-section skills-section">
                    <div class="container">
                        <h2>Skills</h2>
                        <div class="skills-container">
                            ${data.skills.split(',').map(skill =>
            `<span class="skill-tag">${skill.trim()}</span>`
        ).join('')}
                        </div>
                    </div>
                </div>
                ` : ''}

                <!-- Experience Section -->
                ${data.experience.length > 0 ? `
                <div class="portfolio-section">
                    <div class="container">
                        <h2>Experience</h2>
                        ${data.experience.map(exp => `
                            <div class="experience-item-template">
                                <h3>${exp.jobTitle || 'Job Title'}</h3>
                                <div class="company">${exp.company || 'Company'}</div>
                                <div class="duration">${exp.duration || 'Duration'}</div>
                                ${exp.location ? `<div class="location">${exp.location}</div>` : ''}
                                ${exp.description ? `<p>${exp.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Education Section -->
                ${data.education.length > 0 ? `
                <div class="portfolio-section">
                    <div class="container">
                        <h2>Education</h2>
                        ${data.education.map(edu => `
                            <div class="education-item-template">
                                <h3>${edu.degree || 'Degree'}</h3>
                                <div class="institution">${edu.institution || 'Institution'}</div>
                                <div class="year">${edu.year || 'Year'}</div>
                                ${edu.gpa ? `<div class="gpa">GPA: ${edu.gpa}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Projects Section -->
                ${data.projects.length > 0 ? `
                <div class="portfolio-section">
                    <div class="container">
                        <h2>Projects</h2>
                        ${data.projects.map(project => `
                            <div class="project-item-template">
                                <h3>${project.projectName || 'Project Name'}</h3>
                                ${project.projectUrl ? `<div class="url"><a href="${project.projectUrl}" target="_blank">${project.projectUrl}</a></div>` : ''}
                                ${project.technologies ? `<div class="technologies">Technologies: ${project.technologies}</div>` : ''}
                                ${project.projectDescription ? `<p>${project.projectDescription}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }

    generateSocialLinks(data) {
        const socialLinks = [];

        if (data.linkedin) socialLinks.push(`<a href="${data.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>`);
        if (data.github) socialLinks.push(`<a href="${data.github}" target="_blank"><i class="fab fa-github"></i></a>`);
        if (data.twitter) socialLinks.push(`<a href="${data.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>`);
        if (data.website) socialLinks.push(`<a href="${data.website}" target="_blank"><i class="fas fa-globe"></i></a>`);

        return socialLinks.length > 0 ? `<div class="social-links">${socialLinks.join('')}</div>` : '';
    }

    showPreviewModal() {
        const formData = this.getFormData();

        if (!this.hasMinimumData(formData)) {
            alert('Please fill in at least your name and title to preview the portfolio.');
            return;
        }

        const portfolioHTML = this.generatePortfolioHTML(formData);
        document.getElementById('portfolioPreview').innerHTML = portfolioHTML;

        const modal = new bootstrap.Modal(document.getElementById('previewModal'));
        modal.show();
    }

    async exportPortfolio() {
        const formData = this.getFormData();

        if (!this.hasMinimumData(formData)) {
            alert('Please fill in at least your name and title to export the portfolio.');
            return;
        }

        const exportBtn = document.getElementById('exportBtn');
        const originalText = exportBtn.innerHTML;
        exportBtn.innerHTML = '<span class="loading"></span> Generating PDF...';
        exportBtn.disabled = true;

        try {
            // Generate simple HTML for PDF
            const pdfHTML = this.generatePDFHTML(formData);

            // Create a new window with the PDF content
            const printWindow = window.open('', '_blank');
            printWindow.document.write(pdfHTML);
            printWindow.document.close();

            // Wait for content to load
            printWindow.onload = function () {
                printWindow.print();
                printWindow.close();
            };

        } catch (error) {
            console.error('Export error:', error);
            alert('There was an error generating the PDF. Please try again.');
        } finally {
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
        }
    }

    generatePDFHTML(data) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${data.fullName} - Portfolio</title>
                <style>
                    @page {
                        size: A4;
                        margin: 2cm;
                    }
                    
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    
                    .header {
                        background: #667eea;
                        color: white;
                        padding: 30px;
                        text-align: center;
                        margin-bottom: 30px;
                        border-radius: 10px;
                    }
                    
                    .header h1 {
                        font-size: 2.5rem;
                        margin: 0 0 10px 0;
                        color: white;
                    }
                    
                    .header .title {
                        font-size: 1.3rem;
                        margin: 0 0 15px 0;
                        color: white;
                        opacity: 0.9;
                    }
                    
                    .header .location {
                        font-size: 1.1rem;
                        margin: 0 0 15px 0;
                        color: white;
                    }
                    
                    .header .contact {
                        margin-top: 20px;
                    }
                    
                    .header .contact a {
                        color: white;
                        text-decoration: none;
                        margin: 0 10px;
                    }
                    
                    .section {
                        margin-bottom: 30px;
                        page-break-inside: avoid;
                    }
                    
                    .section h2 {
                        color: #495057;
                        font-size: 1.8rem;
                        margin-bottom: 20px;
                        text-align: center;
                        border-bottom: 2px solid #667eea;
                        padding-bottom: 10px;
                    }
                    
                    .about-section {
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 30px;
                    }
                    
                    .about-section p {
                        font-size: 1.1rem;
                        text-align: center;
                        margin: 0;
                    }
                    
                    .skills-container {
                        text-align: center;
                    }
                    
                    .skill-tag {
                        display: inline-block;
                        background: #667eea;
                        color: white;
                        padding: 8px 16px;
                        border-radius: 20px;
                        margin: 5px;
                        font-size: 0.9rem;
                        font-weight: bold;
                    }
                    
                    .item {
                        background: white;
                        border: 1px solid #ddd;
                        border-left: 4px solid #667eea;
                        padding: 20px;
                        margin-bottom: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    }
                    
                    .item h3 {
                        color: #667eea;
                        margin: 0 0 10px 0;
                        font-size: 1.3rem;
                    }
                    
                    .item .company,
                    .item .institution,
                    .item .technologies {
                        color: #666;
                        font-weight: bold;
                        margin-bottom: 8px;
                    }
                    
                    .item .duration,
                    .item .year,
                    .item .url {
                        color: #28a745;
                        font-weight: bold;
                        background: #e8f5e8;
                        padding: 4px 10px;
                        border-radius: 12px;
                        display: inline-block;
                        margin-bottom: 10px;
                    }
                    
                    .item p {
                        margin: 10px 0 0 0;
                        line-height: 1.6;
                    }
                    
                    .social-links {
                        text-align: center;
                        margin-top: 20px;
                    }
                    
                    .social-links a {
                        display: inline-block;
                        background: #667eea;
                        color: white;
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        border-radius: 50%;
                        margin: 0 5px;
                        text-decoration: none;
                        font-weight: bold;
                    }
                    
                    @media print {
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        
                        .header {
                            padding: 20px;
                        }
                        
                        .section {
                            margin-bottom: 20px;
                        }
                        
                        .item {
                            page-break-inside: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>${data.fullName || 'Your Name'}</h1>
                    <div class="title">${data.title || 'Professional Title'}</div>
                    ${data.location ? `<div class="location">${data.location}</div>` : ''}
                    <div class="contact">
                        ${data.email ? `<a href="mailto:${data.email}">📧 ${data.email}</a>` : ''}
                        ${data.phone ? `<a href="tel:${data.phone}">📞 ${data.phone}</a>` : ''}
                    </div>
                    ${this.generatePDFSocialLinks(data)}
                </div>

                ${data.about ? `
                <div class="section about-section">
                    <h2>About Me</h2>
                    <p>${data.about}</p>
                </div>
                ` : ''}

                ${data.skills ? `
                <div class="section">
                    <h2>Skills</h2>
                    <div class="skills-container">
                        ${data.skills.split(',').map(skill =>
            `<span class="skill-tag">${skill.trim()}</span>`
        ).join('')}
                    </div>
                </div>
                ` : ''}

                ${data.experience.length > 0 ? `
                <div class="section">
                    <h2>Experience</h2>
                    ${data.experience.map(exp => `
                        <div class="item">
                            <h3>${exp.jobTitle || 'Job Title'}</h3>
                            <div class="company">${exp.company || 'Company'}</div>
                            <div class="duration">${exp.duration || 'Duration'}</div>
                            ${exp.location ? `<div class="location">📍 ${exp.location}</div>` : ''}
                            ${exp.description ? `<p>${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${data.education.length > 0 ? `
                <div class="section">
                    <h2>Education</h2>
                    ${data.education.map(edu => `
                        <div class="item">
                            <h3>${edu.degree || 'Degree'}</h3>
                            <div class="institution">${edu.institution || 'Institution'}</div>
                            <div class="year">${edu.year || 'Year'}</div>
                            ${edu.gpa ? `<div class="gpa">GPA: ${edu.gpa}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${data.projects.length > 0 ? `
                <div class="section">
                    <h2>Projects</h2>
                    ${data.projects.map(project => `
                        <div class="item">
                            <h3>${project.projectName || 'Project Name'}</h3>
                            ${project.projectUrl ? `<div class="url">🔗 ${project.projectUrl}</div>` : ''}
                            ${project.technologies ? `<div class="technologies">🛠️ ${project.technologies}</div>` : ''}
                            ${project.projectDescription ? `<p>${project.projectDescription}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </body>
            </html>
        `;
    }

    generatePDFSocialLinks(data) {
        const socialLinks = [];

        if (data.linkedin) socialLinks.push(`<a href="${data.linkedin}" title="LinkedIn">L</a>`);
        if (data.github) socialLinks.push(`<a href="${data.github}" title="GitHub">G</a>`);
        if (data.twitter) socialLinks.push(`<a href="${data.twitter}" title="Twitter">T</a>`);
        if (data.website) socialLinks.push(`<a href="${data.website}" title="Website">W</a>`);

        return socialLinks.length > 0 ? `<div class="social-links">${socialLinks.join('')}</div>` : '';
    }
}

// Initialize the portfolio generator when the page loads
let portfolioGenerator;
document.addEventListener('DOMContentLoaded', () => {
    portfolioGenerator = new PortfolioGenerator();
}); 