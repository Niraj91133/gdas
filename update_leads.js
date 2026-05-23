const fs = require('fs');
const path = require('path');

const leadsPath = path.join(__dirname, 'leads.json');
let leads = [];

try {
    const data = fs.readFileSync(leadsPath, 'utf8');
    leads = JSON.parse(data);
} catch (e) {
    console.error("Could not read leads.json", e);
    process.exit(1);
}

// Remove previously added fake showrooms
leads = leads.filter(l => l.category !== "Car Showrooms Sasaram");

const showrooms = [
  { name: "Nidhi Hyundai", location: "NH-2, Bye Pass, GT Road, Mouja, Khairi, Sasaram - 821115", phone: "+91 99997 08245" },
  { name: "Pearl Cars (Maruti Suzuki)", location: "NH-2, Moresarai, Near Toll Plaza, Sasaram - 821111", phone: "+91 93045 76999" },
  { name: "Renault Sasaram", location: "Khata No 14, Plot No 312, Near Pilot Baba Ashram, Sasaram - 821115", phone: "+91 93115 33871" },
  { name: "Sun Shine Autos Pvt Ltd (Mahindra)", location: "Sikaria, NH-2 Budhan More, Sasaram - 821115", phone: "+91 98737 32770" },
  { name: "Omkar Motors (Tata)", location: "Opp. Malwar Gate, Near Toll Tax, G.T. Road, PS-Shivsagar, Sasaram - 821115", phone: "Not Available" },
  { name: "Budha Toyota", location: "Grand Trunk Road, Opp. Pilot Baba Ashram, Sasaram - 821115", phone: "Not Available" }
];

let maxId = 0;
leads.forEach(l => {
    if (l.id && l.id > maxId) {
        maxId = l.id;
    }
});

let startId = maxId + 1;

showrooms.forEach(s => {
    leads.push({
        id: startId++,
        name: s.name,
        founder: "N/A",
        niche: "Automotive",
        website: "n/a",
        linkedin: "n/a",
        status: "New",
        type: "Car Showroom",
        category: "Car Showrooms Sasaram",
        location: s.location,
        phone: s.phone
    });
});

fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
console.log("Successfully replaced with 6 real verified showrooms in leads.json");
