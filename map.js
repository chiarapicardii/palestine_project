
const w = 1020, h = 1150;
const bounds = [[0, 0], [h, w]]; 

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

const image = L.imageOverlay('imgs/map.png', bounds).addTo(map);

map.fitBounds(bounds); 

const items = [
  
  { x: 562, y: 510,
    nome: "Our Cause / The Palestine Cause ",
    date:"1974",
    author:"Ismail Shammout",
    collection:"Liberation Graphics Collection (RMF)",
  },
 
  { x: 670, y: 405, 
    nome: "Al-Miqla",
    date:"1988",
    author:"Movement of Democratic Women in Israel",
    collection:"The Walid Fahoum Collection",
  },
 
  { x: 678, y: 500, 
    nome: "Camel of Heavy Burdens",
    date:"1975",
    author:"Sliman Mansour",
    collection:"The Ali Kazak Collection / Ali Kazak Sub-collection 1: Palestine Liberation Organization Posters",
  },
 
  { x: 642, y: 341, 
    nome: "War and Peace",
    date:"N/D",
    author:"Fatima al-Muhib",
    collection:"The Omar al-Jallad Collection / The Omar al-Jallad Sub-collection 2: Documents",
  },
  
  { x: 614, y: 566, 
    nome: "30 March, The Day of the Land",
    date:"1983",
    author:"Ismail Shammout",
    collection:"The Ali Kazak Collection / Ali Kazak Sub-collection 1: Palestine Liberation Organization Posters",
  },
  
  { x: 661, y: 561, 
    nome: "Steadfastness",
    date:"1980",
    author:"Salah Al Atrash",
    collection:"Liberation Graphics Collection (RMF)",
  },
  
  { x: 258, y: 385, 
    nome: "Hisham Halwani and Others",
    date:"1964",
    author:"N/A",
    collection:"The Hisham Halawani Collection / Palestinian Museum.",
  },
  
  { x: 257, y: 455, 
    nome: "'Clashes between a Child and the Occupation Forces in Al‑Bireh",
    date:"N/A",
    author:"Yusof Al-Quteb",
    collection:"The Yousef al-Qutob Collection",
  },
 
  { x: 580, y: 761, 
    nome: "Arab Revolt (1936–1939) – Military Band leaving the Jerusalem War Cemetery (Mount Scopus), Armistice Day",
    date:"1900 - 1936",
    author:"N/A",
    collection:"Matson's Palestine",
  },
 
  { x: 576, y: 345, 
    nome: "We Have Our Heritage and Civilisation",
    date:"1984",
    author:"Abderrahman al-Muzayyan (Painter)",
    collection:"The Ali Kazak Collection / Palestinian Museum.",
  },
 
  { x: 630, y: 722, 
    nome: "Palestinian refugees",
    date:"1948",
    author:"Fred Csasznik",
    collection:"Front cover of The Birth of the Palestinian Refugee Problem by Benny Morris (1989).",
  },
  
  { x: 520, y: 690, 
    nome: "Palestine refugees flee across the Allenby Bridge during the 1967 hostilities",
    date:"1967",
    author:"N/A",
    collection: "UNRWA Archive (via Michelle Hamers, 2021)",
  },
  
  { x: 377, y: 541, 
    nome: "Members from Ayyash family eating food",
    date:"N/A",
    author:"N/A",
    collection:"The Sa'eed Ayyash Collection / Palestinian Museum",
  },
 
  { x: 371, y: 449, 
    nome: "Children Festival",
    date:"1989",
    author:"N/A",
    collection:"The Democratic Women's Movement Collection / Palestinian Museum.",
  },
  
  { x: 329, y: 376,
    nome: "A Scene from Daily Life, Beirut",
    date:"1982–1989",
    author:"N/A",
    collection:"Palestine Red Crescent Society (PRCS) Collection / Palestinian Museum",
  },
];


function getPositionLabel(index) {
  
  if ([6, 7, 12, 13, 14].includes(index)) {
    return "Position: Daily life room.";
  }
  
  else if ([8, 10, 11].includes(index)) {
    return "Position: The displacement room.";
  }
  
  else {
    return "Position: The art of resistance room.";
  }
}

const sideTextDiv = document.getElementById('sideText');

function updateSidePanel(item, index) {
  let imgPath;

  if (index === 0) {
    imgPath = 'imgs/my-image.jpg';
  } else {

    imgPath = `imgs/image ${index + 1}.jpg`; 
  }

  const detailUrl = `objects.html?item=${index}`; 
  const positionLabel = getPositionLabel(index); 

  const newContent = `
    <h2>${item.nome}</h2> 
    
    <div style="text-align: center; padding-bottom: 1rem;">
      <a href="${detailUrl}" class="image-detail-container">

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
                display: block; 
            "
            onerror="this.src='https://via.placeholder.com/200x150?text=Immagine+non+trovata'"
        >
        <div class="discover-overlay">discover the object </div>
        </a>
    </div>
    <ul>
        <li><b>Date:</b> ${item.date}</li>
        <li><b>Author:</b> ${item.author}</li>
        <li><b>Collection:</b> ${item.collection}</li>
    </ul>
    
    
    <p style="font-size: 0.9em; color: #666;">
        ${positionLabel}
    </p>
  `;

  sideTextDiv.innerHTML = newContent;
}


// Aggiunge i marker e il listener di click
items.forEach((p, i) => {
  const marker = L.marker([p.y, p.x]).addTo(map);

  marker.on('click', function(e) {
    updateSidePanel(p, i);
  });
});
