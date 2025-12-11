// 🎨 DIMENSIONI ESATTE DELL’IMMAGINE
const w = 1020, h = 1150;
const bounds = [[0, 0], [h, w]]; 

// CREA LA MAPPA
const map = L.map('map', {
  crs: L.CRS.Simple,
  zoomControl: false,       
  dragging: false,       
  scrollWheelZoom: false,
  doubleClickZoom: false,   
  boxZoom: false,        
  keyboard: false,  
  tap: true       
});

// 🖼️ AGGIUNGI IMMAGINE DELLA MAPPA (Percorso corretto: img/map.png)
const image = L.imageOverlay('img/map.png', bounds).addTo(map);

// ADATTA MAPPA: Questa è la riga cruciale.
// Forziamo la mappa a inquadrare l'intera immagine
map.fitBounds(bounds); 

// LIMITA LO SPOSTAMENTO: L'utente può zoomare, ma non trascinare fuori dall'immagine.
map.setMaxBounds(bounds); 
map.options.maxBoundsViscosity = 1.0;

// Aggiungi un piccolo delay per assicurarti che il contenitore sia renderizzato prima del fitBounds
setTimeout(() => {
  map.invalidateSize();
  map.fitBounds(bounds); 
}, 60);

// 📍 OGGETTI: coordinate ottimizzate per la planimetria
// (Y è l'asse verticale (altezza), X è l'asse orizzontale (larghezza))
const items = [
  // Area 1 e 5 (a sinistra)
  { x: 520, y: 690, 
    nome: "Palestine refugees flee across the Allenby Bridge during the 1967 hostilities",
    date:"1967",
    author:"N/A",
    collection: "UNRWA Archive (via Michelle Hamers, 2021)",
  },
  { x: 329, 
    y: 376,
    nome: "A Scene from Daily Life, Beirut",
    date:"1982–1989",
    author:"N/A",
    collection:"Palestine Red Crescent Society (PRCS) Collection / Palestinian Museum",
  },
  { x: 257, 
    y: 455, 
    nome: "'Clashes between a Child and the Occupation Forces in Al‑Bireh",
    date:"N/A",
    author:"Yusof Al-Quteb",
    collection:"The Yousef al-Qutob Collection",
 },
  { x: 576,
    y: 345, 
    nome: "We Have Our Heritage and Civilisation",
    date:"1984",
    author:"Abderrahman al-Muzayyan (Painter)",
    collection:"The Ali Kazak Collection / Palestinian Museum.",
    },
  
  // Area 2 e 3 (aree centrali maggiori)
  { x: 614, 
    y: 566, 
    nome: "30 March, The Day of the Land",
    date:"1983",
    author:"Ismail Shammout",
    collection:"The Ali Kazak Collection / Ali Kazak Sub-collection 1: Palestine Liberation Organization Posters",
},
  { x: 377, 
    y: 541, 
    nome: "Members from Ayyash family eating food",
    date:"N/A",
    author:"N/A",
    collection:"The Sa'eed Ayyash Collection / Palestinian Museum",
},
  { x: 642,
    y: 341, 
    nome: "He Who Plunders Others Always Lives in Terror",
    date:"",
    author:"",
    collection:"",
},

  { x: 258,
    y: 385, 
    nome: "Hisham Halwani and Others",
    date:"1964",
    author:"N/A",
    collection:"The Hisham Halawani Collection / Palestinian Museum.",
 },
  { x: 371,
    y: 449, 
    nome: "Children Festival",
    date:"1989",
    author:"N/A",
    collection:"The Democratic Women's Movement Collection / Palestinian Museum.",
 },

  // Area 4 (in alto a destra)
  { x: 630, 
    y: 722, 
    nome: "Palestinian refugees",
    date:"1948",
    author:"Fred Csasznik",
    collection:"Front cover of The Birth of the Palestinian Refugee Problem by Benny Morris (1989).",
 },
  { x: 661, 
    y: 561, 
    nome: "Steadfastness",
    date:"1980",
    author:"Salah Al Atrash",
    collection:"Liberation Graphics Collection (RMF)",
 },
  { x: 562, 
    y: 510,
    nome: "Our Cause / The Palestine Cause ",
    date:"1974",
    author:"Ismail Shammout",
    collection:"Liberation Graphics Collection (RMF)",
},
  
  // Corridoi/Aree di passaggio
  { x: 670,
    y: 405, 
    nome: "Al-Miqla",
    date:"1988",
    author:"Movement of Democratic Women in Israel",
    collection:"The Walid Fahoum Collection",
 },
  { x: 678,
    y: 500, 
    nome: "Camel of Heavy Burdens",
    date:"1975",
    author:"Sliman Mansour",
    collection:"The Ali Kazak Collection / Ali Kazak Sub-collection 1: Palestine Liberation Organization Posters",
},
  { x: 580, 
    y: 761, 
    nome: "Military Band leaving the Jerusalem War Cemetery (Mount Scopus),Armistice Day",
    date:"1900 - 1936",
    author:"N/A",
    collection:"Matson's Palestine",
 }
];

// MARKER + GESTIONE CLICK
const sideTextDiv = document.getElementById('sideText');

// Funzione per aggiornare il pannello laterale
function updateSidePanel(item, index) {
  const imgPath = `img/items${index + 1}.jpg`;
  
  // Costruisce il contenuto HTML da visualizzare nel pannello laterale
  const newContent = `
    <h2>${item.nome}</h2> 
    
    <div style="text-align: center; padding-bottom: 1rem;">
    
        <img 
            src="${imgPath}" 
            alt="${item.nome}" 
            style="
                max-width: 100%; 
                height: auto; 
                max-height: 400px; 
                object-fit: contain; 
                border-radius: 8px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            "
            onerror="this.src='https://via.placeholder.com/200x150?text=Immagine+non+trovata'"
        >
    </div>
    <ul>
        <li><b>Date:</b> ${item.date}</li>
        <li><b>Author:</b> ${item.author}</li>
        <li><b>Collection:</b> ${item.collection}</li>
    </ul>
    
    
    <p style="font-size: 0.9em; color: #666;">
        Posizione sulla mappa: Sala ${index < 5 ? '1/5' : index < 10 ? '2/3' : '4'}
    </p>
  `;

  // Inietta il nuovo contenuto nel div laterale
  sideTextDiv.innerHTML = newContent;
}


// Aggiunge i marker e il listener di click
items.forEach((p, i) => {
  const marker = L.marker([p.y, p.x]).addTo(map);

  marker.on('click', function(e) {
    updateSidePanel(p, i);
  });
});


// ⚠️ HELPER COORDINATE (Lasciato per comodità, ti aiuta a trovare nuove posizioni)
/*let tempMarker = null;
const coordBox = document.createElement('div');
coordBox.id = 'coordBox';
coordBox.style.position = 'fixed';
coordBox.style.bottom = '20px';
coordBox.style.right = '20px';
coordBox.style.background = 'rgba(255,255,255,0.95)';
coordBox.style.border = '1px solid #ccc';
coordBox.style.borderRadius = '8px';
coordBox.style.padding = '10px 14px';
coordBox.style.fontSize = '14px';
coordBox.style.fontFamily = 'monospace';
coordBox.style.boxShadow = '0 0 8px rgba(0,0,0,0.2)';
coordBox.innerHTML = '📍 Clicca sulla mappa per ottenere coordinate';
document.body.appendChild(coordBox);*/

map.on('click', function(e) {
  const y = e.latlng.lat.toFixed(0);
  const x = e.latlng.lng.toFixed(0);
  coordBox.innerHTML = `
    📌 <b>Coordinate:</b><br>
    y = <span style="color:#e04f95">${y}</span><br>
    x = <span style="color:#4f7be0">${x}</span>
    <br><br>
    <small>(Da usare in items: { x: ${x}, y: ${y} })</small>
  `;
  if (tempMarker) map.removeLayer(tempMarker);
  tempMarker = L.marker([y, x], {
    icon: L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    })
  }).addTo(map);
});
