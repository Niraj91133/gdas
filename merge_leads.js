const fs = require('fs');
const path = require('path');

const leads = [];
let nextId = 1;

// 1. Process existing leads.json (US SaaS)
try {
    const existingLeads = JSON.parse(fs.readFileSync('leads.json', 'utf8'));
    existingLeads.forEach(l => {
        leads.push({
            ...l,
            id: nextId++,
            category: 'US SaaS/Stealth',
            status: l.status || 'New'
        });
    });
} catch (e) {
    console.error("Error reading leads.json:", e);
}

// 2. Process Buddhist Travel Leads (Markdown Table)
try {
    const mdContent = fs.readFileSync('buddhist_travel_leads.md', 'utf8');
    const lines = mdContent.split('\n');
    lines.forEach(line => {
        if (line.includes('|') && !line.includes('---') && !line.includes('Agency Name')) {
            const parts = line.split('|').map(p => p.trim()).filter(p => p);
            if (parts.length >= 5) {
                leads.push({
                    id: nextId++,
                    name: parts[1].replace(/\*\*/g, ''),
                    founder: 'N/A',
                    niche: 'Buddhist Pilgrimage',
                    website: parts[4],
                    linkedin: 'n/a',
                    status: 'New',
                    type: 'Travel Agency',
                    category: 'Buddhist Travel',
                    location: parts[2],
                    phone: parts[3]
                });
            }
        }
    });
} catch (e) {
    console.error("Error reading buddhist_travel_leads.md:", e);
}

// 3. Process CSV files in leads/
const csvDir = 'leads';
const csvFiles = [
    { file: 'education_bihar.csv', category: 'Bihar Education', type: 'School/Coaching' },
    { file: 'dentists_bihar.csv', category: 'Bihar Dentists', type: 'Healthcare' },
    { file: 'manufacturing_bangalore.csv', category: 'Bangalore Manufacturing', type: 'Factory/Unit' },
    { file: 'bangalore_startups.csv', category: 'Bangalore Startups', type: 'Tech Startup' }
];

csvFiles.forEach(cfg => {
    try {
        const content = fs.readFileSync(path.join(csvDir, cfg.file), 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            if (index === 0 || !line.trim()) return; // skip header
            
            // Simple CSV parsing (handling quotes)
            const parts = line.match(/(".*?"|[^,]+)/g);
            if (parts && parts.length >= 3) {
                const name = parts[1].replace(/"/g, '').trim();
                const phone = parts[2].replace(/"/g, '').trim();
                const niche = parts[3] ? parts[3].replace(/"/g, '').trim() : 'N/A';
                
                leads.push({
                    id: nextId++,
                    name: name,
                    founder: 'Contact: ' + phone,
                    niche: niche,
                    website: 'n/a',
                    linkedin: 'n/a',
                    status: 'New',
                    type: cfg.type,
                    category: cfg.category,
                    phone: phone
                });
            }
        });
    } catch (e) {
        console.error(`Error reading ${cfg.file}:`, e);
    }
});

fs.writeFileSync('leads.json', JSON.stringify(leads, null, 2));
console.log(`Successfully merged ${leads.length} leads into leads.json`);
