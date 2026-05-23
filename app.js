let leadsData = [];
let currentFilter = 'all';
let currentCategory = 'all';

// Load Data
async function loadLeads() {
    try {
        const response = await fetch('leads.json');
        leadsData = await response.json();
        renderCategories();
        renderLeads(leadsData);
        updateStats();
    } catch (e) {
        console.error("Error loading leads:", e);
    }
}

// Render Categories in Sidebar
function renderCategories() {
    const container = document.getElementById('category-filters');
    const categories = ['all', ...new Set(leadsData.map(l => l.category))];
    
    container.innerHTML = '';
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = `nav-item ${currentCategory === cat ? 'active' : ''}`;
        item.setAttribute('data-category', cat);
        item.innerHTML = `
            <i class="fas fa-folder"></i>
            <span>${cat === 'all' ? 'All Categories' : cat}</span>
        `;
        item.onclick = () => {
            currentCategory = cat;
            document.querySelectorAll('#category-filters .nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            filterAndRender();
        };
        container.appendChild(item);
    });
}

// Filter and Render
function filterAndRender() {
    let filtered = leadsData;
    
    // Apply Status Filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(l => l.status === currentFilter);
    }
    
    // Apply Category Filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(l => l.category === currentCategory);
    }
    
    // Apply Search Filter
    const term = document.getElementById('lead-search').value.toLowerCase();
    if (term) {
        filtered = filtered.filter(l => 
            l.name.toLowerCase().includes(term) || 
            (l.founder && l.founder.toLowerCase().includes(term)) || 
            l.niche.toLowerCase().includes(term) ||
            (l.location && l.location.toLowerCase().includes(term))
        );
    }
    
    // Update Title
    const titleEl = document.querySelector('.section-title h2');
    if (titleEl) {
        titleEl.textContent = currentCategory === 'all' ? 'All Leads Explorer' : currentCategory;
    }
    
    renderLeads(filtered);
}

// Render Leads Grid
function renderLeads(leads) {
    const container = document.getElementById('leads-container');
    container.innerHTML = '';
    
    document.getElementById('total-leads-count').textContent = leads.length;

    leads.forEach(lead => {
        const card = document.createElement('div');
        card.className = 'lead-card';
        card.innerHTML = `
            <div class="lead-header">
                <span class="lead-type">${lead.type || 'Lead'}</span>
                <span class="lead-status status-${lead.status.toLowerCase()}">${lead.status}</span>
            </div>
            <div class="lead-body">
                <h3>${lead.name}</h3>
                <span class="founder-name">${lead.founder !== 'N/A' ? lead.founder : ''}</span>
                <p class="niche-tag"><i class="fas fa-tag"></i> ${lead.niche}</p>
                ${lead.location ? `<p class="detail-item"><i class="fas fa-map-marker-alt"></i> ${lead.location}</p>` : ''}
                ${lead.phone ? `<p class="detail-item"><i class="fas fa-phone"></i> ${lead.phone}</p>` : ''}
                ${lead.website && lead.website !== 'n/a' ? `<p class="detail-item"><i class="fas fa-globe"></i> <a href="${lead.website}" target="_blank">${lead.website}</a></p>` : ''}
            </div>
            <div class="lead-footer">
                <button class="primary-btn" onclick="openModal(${lead.id})"><i class="fas fa-envelope"></i> Message</button>
                ${lead.linkedin && lead.linkedin !== 'n/a' ? `
                <a href="${lead.linkedin}" target="_blank" class="secondary-btn" onclick="markContacted(${lead.id})">
                    <i class="fab fa-linkedin"></i>
                </a>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

// Search Event
document.getElementById('lead-search').addEventListener('input', filterAndRender);

// Status Nav Event
document.querySelectorAll('.sidebar > nav > .nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.sidebar > nav > .nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        currentFilter = item.getAttribute('data-filter');
        filterAndRender();
    });
});

// Modal Logic
function openModal(id) {
    const lead = leadsData.find(l => l.id === id);
    const modal = document.getElementById('message-modal');
    const area = document.getElementById('message-area');
    
    document.getElementById('modal-founder-name').textContent = lead.founder !== 'N/A' ? lead.founder : lead.name;
    
    // Dynamic Template based on category
    let template = "";
    if (lead.category === 'US SaaS/Stealth') {
        template = `Hi ${lead.founder.split(' ')[0]},\n\nI saw ${lead.name} and noticed your landing page could convert better.\n\nWant a quick breakdown of how I'd fix it?\n\nBest,\nNiraj`;
    } else if (lead.category === 'Buddhist Travel') {
        template = `Dear Team at ${lead.name},\n\nI'm reaching out because I specialize in creating high-end digital experiences for pilgrimage travel agencies.\n\nWould you be interested in seeing how we can modernize your online presence?\n\nBest,\nNiraj`;
    } else {
        template = `Hi ${lead.name},\n\nI have a proposal regarding digital growth for ${lead.category}.\n\nAre you available for a quick chat?\n\nBest,\nNiraj`;
    }
    
    area.value = template;
    modal.style.display = 'flex';
    
    document.getElementById('copy-btn').onclick = () => {
        navigator.clipboard.writeText(template);
        const btn = document.getElementById('copy-btn');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy to Clipboard';
        }, 2000);
        markContacted(id);
    };

    if (lead.linkedin && lead.linkedin !== 'n/a') {
        document.getElementById('open-linkedin').style.display = 'block';
        document.getElementById('open-linkedin').onclick = () => {
            window.open(lead.linkedin, '_blank');
            markContacted(id);
        };
    } else {
        document.getElementById('open-linkedin').style.display = 'none';
    }
}

// Stats & Persistence
function markContacted(id) {
    const lead = leadsData.find(l => l.id === id);
    if(lead.status === 'New') {
        lead.status = 'Contacted';
        updateStats();
        // In a real app, save to localStorage
        localStorage.setItem('leads_data', JSON.stringify(leadsData));
    }
}

function updateStats() {
    const contacted = leadsData.filter(l => l.status !== 'New').length;
    const total = leadsData.length;
    const progress = total > 0 ? (contacted / total) * 100 : 0;
    
    const progressEl = document.getElementById('progress');
    if (progressEl) progressEl.style.width = progress + '%';
    
    const countEl = document.getElementById('contacted-count');
    if (countEl) countEl.textContent = contacted;
    
    // Update goal tracker text
    const trackerText = document.querySelector('.stats-card p');
    if (trackerText) trackerText.innerHTML = `<span id="contacted-count">${contacted}</span> / ${total} Contacted`;
}

// Close Modal
document.querySelector('.close-modal').onclick = () => {
    document.getElementById('message-modal').style.display = 'none';
};

window.onclick = (e) => {
    if (e.target == document.getElementById('message-modal')) {
        document.getElementById('message-modal').style.display = 'none';
    }
};

// Initialization
window.onload = () => {
    const saved = localStorage.getItem('leads_data');
    if (saved) {
        // leadsData = JSON.parse(saved); // Disabled for now to ensure fresh load from leads.json
    }
    loadLeads();
};
