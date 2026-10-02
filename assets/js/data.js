/* ============================================
   DATA.JS — Datos mockeados VerdeVital Grow Shop
   Catálogo, reseñas, equipo, testimonios, FAQs
   ============================================ */

const STORE = {
  name: "VerdeVital Grow Shop",
  shortName: "VerdeVital",
  tagline: "Cultivá con confianza",
  description: "Somos un grow shop chileno especializado en cultivo indoor, hidroponía, iluminación LED, carpas de cultivo y fertilizantes. Asesoría personalizada con 12 años de experiencia.",
  email: "hola@verdevital.cl",
  phone: "+56 2 2845 1234",
  whatsapp: "+56 9 7654 3210",
  address: "Av. Irarrázaval 3620, Ñuñoa, Santiago, Chile",
  schedule: [
    { day: "Lunes a Viernes", hours: "10:00 - 20:00" },
    { day: "Sábado", hours: "10:30 - 18:00" },
    { day: "Domingo", hours: "Cerrado" }
  ],
  social: {
    instagram: "https://instagram.com/verdevital.cl",
    facebook: "https://facebook.com/verdevital.cl",
    tiktok: "https://tiktok.com/@verdevital.cl"
  }
};

const CATEGORIES = [
  {
    id: "iluminacion",
    name: "Iluminación",
    description: "LEDs, HPS, COB y balastos",
    image: "assets/images/categories/iluminacion.svg"
  },
  {
    id: "carpas",
    name: "Carpas de Cultivo",
    description: "Indoor grow tents profesionales",
    image: "assets/images/categories/carpas.svg"
  },
  {
    id: "sustratos",
    name: "Sustratos",
    description: "Tierra, coco, perlita, arlita",
    image: "assets/images/categories/sustratos.svg"
  },
  {
    id: "fertilizantes",
    name: "Fertilizantes",
    description: "Orgánicos y minerales",
    image: "assets/images/categories/fertilizantes.svg"
  },
  {
    id: "hidroponia",
    name: "Hidroponía",
    description: "DWC, NFT, riego por goteo",
    image: "assets/images/categories/hidroponia.svg"
  },
  {
    id: "clima",
    name: "Control de Clima",
    description: "Extractores, filtros, ventiladores",
    image: "assets/images/categories/clima.svg"
  },
  {
    id: "medicion",
    name: "Medición",
    description: "pHmetros, EC, termohigrómetros",
    image: "assets/images/categories/medicion.svg"
  },
  {
    id: "accesorios",
    name: "Accesorios",
    description: "Macetas, mallas, tijeras",
    image: "assets/images/categories/accesorios.svg"
  }
];

const PRODUCTS = [
  /* ============== ILUMINACIÓN (4) ============== */
  {
    id: "i001",
    name: "Panel LED Full Spectrum 240W",
    category: "iluminacion",
    price: 149990,
    oldPrice: 189990,
    description: "Panel LED quantum board de 240W con espectro completo (3000K + 660nm + IR + UV). Ideal para carpas de 80x80 a 100x100. Driver Meanwell HLG, eficiencia 2.7 umol/J. Bajo consumo y alta penetración de luz para todas las etapas del cultivo.",
    specs: ["Potencia: 240W reales", "PPF: 648 umol/s", "Eficiencia: 2.7 umol/J", "Driver Meanwell HLG", "Garantía: 3 años"],
    images: [
      "assets/images/categories/iluminacion.svg",
      "assets/images/categories/iluminacion.svg"
    ],
    stock: 8,
    rating: 4.8,
    reviewsCount: 32,
    featured: true,
    isNew: false
  },
  {
    id: "i002",
    name: "Ampolleta HPS 600W Double Ended",
    category: "iluminacion",
    price: 39990,
    description: "Ampolleta HPS (High Pressure Sodium) doble casquillo 600W. Alto rendimiento en etapa de floración. Emite luz amarillo-roja ideal para floración masiva. Compatible con balastos electrónicos DE.",
    specs: ["Potencia: 600W", "Casquillo: K12x30s DE", "Vida útil: 10.000 horas", "PPF: 1100 umol/s", "CCT: 2100K"],
    images: [
      "assets/images/categories/hidroponia.svg"
    ],
    stock: 15,
    rating: 4.6,
    reviewsCount: 21,
    featured: false,
    isNew: false
  },
  {
    id: "i003",
    name: "LED COB 100W Cree CXB3590",
    category: "iluminacion",
    price: 89990,
    oldPrice: null,
    description: "COB LED Cree CXB3590 de 100W con disipador de aluminio y lente 90°. Perfecto para cultivos pequeños o como complemento de luz principal. 3500K espectro completo.",
    specs: ["Chip: Cree CXB3590", "Potencia: 100W", "Color: 3500K", "Driver incluido", "Disipación pasiva"],
    images: [
      "assets/images/categories/iluminacion.svg"
    ],
    stock: 12,
    rating: 4.7,
    reviewsCount: 18,
    featured: true,
    isNew: true
  },
  {
    id: "i004",
    name: "Balasto Electrónico 600W Dimmeable",
    category: "iluminacion",
    price: 64990,
    description: "Balasto electrónico dimmeable para HPS/MH 600W. 4 niveles de potencia (250W, 400W, 600W, 660W Super Lumens). Protección contra cortocircuito y sobrecalentamiento.",
    specs: ["Voltaje: 220V", "Dimmeable: 4 niveles", "Compatible: HPS/MH", "Protección IP20", "Certificación SEC"],
    images: [
      "assets/images/categories/iluminacion.svg"
    ],
    stock: 20,
    rating: 4.5,
    reviewsCount: 27,
    featured: false,
    isNew: false
  },

  /* ============== CARPAS (4) ============== */
  {
    id: "c001",
    name: "Carpa de Cultivo 100x100x200cm Premium",
    category: "carpas",
    price: 119990,
    oldPrice: 149990,
    description: "Carpas de cultivo indoor de alta calidad con Mylar 600D reflectante (95% reflexión). Estructura metálica 22mm, cremalleras reforzadas, múltiples entradas de ventilación. Ideal para 4-6 plantas.",
    specs: ["Dimensiones: 100x100x200cm", "Mylar: 600D premium", "Reflectividad: 95%", "Estructura: Acero 22mm", "Capacidad: 4-6 plantas"],
    images: [
      "assets/images/categories/carpas.svg"
    ],
    stock: 6,
    rating: 4.9,
    reviewsCount: 45,
    featured: true,
    isNew: false
  },
  {
    id: "c002",
    name: "Carpa Indoor 60x60x140cm Pro",
    category: "carpas",
    price: 49990,
    description: "Carpas compacta 60x60x140cm, perfecta para armarios o cultivos pequeños. Mylar 600D, cremalleras YKK, ventanas de ventilación con malla anti-insectos.",
    specs: ["Dimensiones: 60x60x140cm", "Material: Mylar 600D", "Cremalleras: YKK", "2 ventanas ventilación", "Bandeja impermeable"],
    images: [
      "assets/images/categories/clima.svg"
    ],
    stock: 14,
    rating: 4.7,
    reviewsCount: 38,
    featured: false,
    isNew: false
  },
  {
    id: "c003",
    name: "Carpa 240x120x200cm Mamut",
    category: "carpas",
    price: 249990,
    description: "Carpas de gran formato 240x120x200cm. Mylar 900D, estructura 25mm, soporte para luces pesadas. Ideal para growers con espacio dedicado y cultivos grandes.",
    specs: ["Dimensiones: 240x120x200cm", "Mylar: 900D premium", "Estructura: 25mm", "4 entradas de aire", "Soporta 80kg"],
    images: [
      "assets/images/categories/carpas.svg"
    ],
    stock: 3,
    rating: 5.0,
    reviewsCount: 12,
    featured: false,
    isNew: true
  },
  {
    id: "c004",
    name: "Carpa 120x120x200cm Pro",
    category: "carpas",
    price: 134990,
    oldPrice: 159990,
    description: "Carpas mediana 120x120x200cm, balance perfecto entre espacio y rendimiento. Mylar 600D, ideal para 6-9 plantas. Múltiples bocas de ventilación y acceso frontal + lateral.",
    specs: ["Dimensiones: 120x120x200cm", "Mylar: 600D", "Estructura: 22mm", "Acceso frontal + lateral", "6-9 plantas"],
    images: [
      "assets/images/categories/accesorios.svg"
    ],
    stock: 7,
    rating: 4.8,
    reviewsCount: 29,
    featured: true,
    isNew: false
  },

  /* ============== SUSTRATOS (4) ============== */
  {
    id: "s001",
    name: "Sustrato Light Mix 50L",
    category: "sustratos",
    price: 14990,
    description: "Sustrato Light Mix con perlita y turba rubia. Bajo en nutrientes, ideal para que el cultivador controle la fertilización desde el inicio. pH 6.0-6.5.",
    specs: ["Volumen: 50 litros", "pH: 6.0-6.5", "EC: <1.0 mS/cm", "Composición: Turba + perlita", "Origen: Europa"],
    images: [
      "assets/images/categories/sustratos.svg"
    ],
    stock: 35,
    rating: 4.7,
    reviewsCount: 56,
    featured: true,
    isNew: false
  },
  {
    id: "s002",
    name: "Fibra de Coco Premium 5kg",
    category: "sustratos",
    price: 11990,
    description: "Fibra de coco lavada y tamponada, lista para usar. Excelente retención de humedad y aireación. Ideal para hidroponía y cultivos en maceta.",
    specs: ["Peso: 5 kg", "Origen: India", "Tamponada con calcio", "pH: 5.5-6.5", "EC: <0.5 mS/cm"],
    images: [
      "assets/images/categories/hidroponia.svg"
    ],
    stock: 22,
    rating: 4.6,
    reviewsCount: 41,
    featured: false,
    isNew: false
  },
  {
    id: "s003",
    name: "Perlita Agricola 10L",
    category: "sustratos",
    price: 8990,
    description: "Perlita expandida de granulometría media (3-6mm). Mejora la aireación y drenaje del sustrato. Inerte y estéril.",
    specs: ["Volumen: 10 litros", "Granulometría: 3-6mm", "pH: neutro", "Inerte y estéril", "Origen: Chile"],
    images: [
      "assets/images/categories/fertilizantes.svg"
    ],
    stock: 50,
    rating: 4.5,
    reviewsCount: 18,
    featured: false,
    isNew: false
  },
  {
    id: "s004",
    name: "Tierra Orgánica con Guano 25L",
    category: "sustratos",
    price: 12990,
    oldPrice: 15990,
    description: "Sustrato orgánico enriquecido con guano de murciélago y humus de lombriz. Perfecto para etapa vegetativa y floración sin necesidad de fertilizantes adicionales al inicio.",
    specs: ["Volumen: 25 litros", "Composición: Turba + guano + humus", "NPK: 2-2-2", "Certificación orgánica", "pH: 6.2-6.8"],
    images: [
      "assets/images/categories/accesorios.svg"
    ],
    stock: 28,
    rating: 4.8,
    reviewsCount: 33,
    featured: true,
    isNew: false
  },

  /* ============== FERTILIZANTES (4) ============== */
  {
    id: "f001",
    name: "Kit Fertilizante 3 Partes 500ml",
    category: "fertilizantes",
    price: 24990,
    oldPrice: 29990,
    description: "Kit completo de fertilizante mineral en 3 partes: Grow, Micro, Bloom. Formulado para todas las etapas del cultivo. Alta concentración, bajo costo por litro.",
    specs: ["Volumen: 500ml c/u", "Tipo: Mineral 3 partes", "Etapas: Grow + Micro + Bloom", "Dosificación: 1-3 ml/L", "Rinde: 250L de solución"],
    images: [
      "assets/images/categories/fertilizantes.svg"
    ],
    stock: 18,
    rating: 4.9,
    reviewsCount: 67,
    featured: true,
    isNew: false
  },
  {
    id: "f002",
    name: "PK Booster 250ml",
    category: "fertilizantes",
    price: 14990,
    description: "Fósforo y potasio concentrado para etapa de floración. Aumenta el tamaño y densidad de los cogollos. Compatible con cualquier línea de fertilizantes.",
    specs: ["Volumen: 250ml", "NPK: 0-13-14", "Etapa: Floración", "Aplicación: Sem 4-8 flora", "Compatible con todo"],
    images: [
      "assets/images/categories/clima.svg"
    ],
    stock: 24,
    rating: 4.7,
    reviewsCount: 38,
    featured: false,
    isNew: false
  },
  {
    id: "f003",
    name: "Estimulador de Raíces 250ml",
    category: "fertilizantes",
    price: 9990,
    description: "Estimulador orgánico de raíces con extracto de algas y ácidos húmicos. Acelera el desarrollo radicular y mejora la absorción de nutrientes.",
    specs: ["Volumen: 250ml", "Tipo: Orgánico", "NPK: 0-1-1", "Aplicación: Esquejes y transplante", "Origen: Algas marinas"],
    images: [
      "assets/images/categories/hidroponia.svg"
    ],
    stock: 30,
    rating: 4.6,
    reviewsCount: 22,
    featured: false,
    isNew: true
  },
  {
    id: "f004",
    name: "Guano de Murciélago 1kg",
    category: "fertilizantes",
    price: 11990,
    description: "Guano de murciélago 100% natural, ideal para mezclas de sustrato o top dressing. NPK alto, libera nutrientes de forma gradual.",
    specs: ["Peso: 1 kg", "Tipo: Orgánico", "NPK: 7-3-1", "Origen: Sudamérica", "Liberación: 8-12 semanas"],
    images: [
      "assets/images/categories/sustratos.svg"
    ],
    stock: 16,
    rating: 4.5,
    reviewsCount: 14,
    featured: false,
    isNew: false
  },

  /* ============== HIDROPONÍA (4) ============== */
  {
    id: "h001",
    name: "Sistema DWC 4 Baldes 20L",
    category: "hidroponia",
    price: 79990,
    oldPrice: 99990,
    description: "Sistema de cultivo hidropónico Deep Water Culture con 4 baldes de 20L cada uno. Incluye bomba de aire, piedras difusoras y mangueras. Ideal para principiantes.",
    specs: ["Capacidad: 4 plantas", "Baldes: 20L c/u", "Bomba de aire incluida", "Piedras difusoras x4", "Mangueras y conectores"],
    images: [
      "assets/images/categories/hidroponia.svg"
    ],
    stock: 9,
    rating: 4.7,
    reviewsCount: 25,
    featured: true,
    isNew: false
  },
  {
    id: "h002",
    name: "Tubo NFT 1.2m x 4",
    category: "hidroponia",
    price: 64990,
    description: "Sistema NFT (Nutrient Film Technique) con 4 tubos de 1.2m y tapa con orificios para macetas de 5cm. Ideal para lechugas, hierbas y plantas de raíz corta.",
    specs: ["Tubos: 4 unidades", "Largo: 1.2m c/u", "Diámetro: 75mm", "Tapas con orificios", "Incluye bomba de agua"],
    images: [
      "assets/images/categories/clima.svg"
    ],
    stock: 12,
    rating: 4.5,
    reviewsCount: 16,
    featured: false,
    isNew: false
  },
  {
    id: "h003",
    name: "Kit Riego por Goteo 12 macetas",
    category: "hidroponia",
    price: 39990,
    description: "Kit completo de riego por goteo automático para 12 macetas. Incluye bomba, timer digital, mangueras y goteros ajustables. Programación diaria.",
    specs: ["Capacidad: 12 macetas", "Timer digital incluido", "Goteros ajustables", "Caudal: 2L/h por gotero", "Mangueras 10m"],
    images: [
      "assets/images/categories/accesorios.svg"
    ],
    stock: 14,
    rating: 4.6,
    reviewsCount: 19,
    featured: false,
    isNew: true
  },
  {
    id: "h004",
    name: "Bomba de Agua 2000 L/h",
    category: "hidroponia",
    price: 24990,
    description: "Bomba sumergible de 2000 litros por hora, ideal para sistemas hidropónicos medianos y grandes. Bajo consumo eléctrico y silenciosa.",
    specs: ["Caudal: 2000 L/h", "Potencia: 25W", "Altura máx: 1.8m", "Sumergible", "Certificación IPX8"],
    images: [
      "assets/images/categories/carpas.svg"
    ],
    stock: 20,
    rating: 4.8,
    reviewsCount: 31,
    featured: true,
    isNew: false
  },

  /* ============== CLIMA (4) ============== */
  {
    id: "cl001",
    name: "Extractor Centrifugo 4\" 220m³/h",
    category: "clima",
    price: 49990,
    oldPrice: 59990,
    description: "Extractor centrifugo de 4 pulgadas con caudal de 220m³/h. Motor con rodamientos de bajo ruido. Ideal para carpas de hasta 80x80.",
    specs: ["Diámetro: 4 pulgadas (100mm)", "Caudal: 220 m³/h", "Ruido: 28 dB", "Voltaje: 220V", "Velocidad regulable"],
    images: [
      "assets/images/categories/clima.svg"
    ],
    stock: 11,
    rating: 4.7,
    reviewsCount: 28,
    featured: true,
    isNew: false
  },
  {
    id: "cl002",
    name: "Filtro de Carbón Activado 4\" 200m³/h",
    category: "clima",
    price: 34990,
    description: "Filtro de carbón activado para extracción de olores. Carbón virgen australiano de alta capacidad. Vida útil 12-18 meses.",
    specs: ["Diámetro: 4 pulgadas", "Caudal: 200 m³/h", "Carbón: Australiano RC412", "Vida útil: 12-18 meses", "Malla de acero"],
    images: [
      "assets/images/categories/carpas.svg"
    ],
    stock: 17,
    rating: 4.8,
    reviewsCount: 42,
    featured: true,
    isNew: false
  },
  {
    id: "cl003",
    name: "Ventilador Clip 6\" 2 Velocidades",
    category: "clima",
    price: 14990,
    description: "Ventilador de clip de 6 pulgadas con 2 velocidades. Pinza ajustable para instalar en tubos de carpa o bordes. Motor silencioso.",
    specs: ["Diámetro: 6 pulgadas (15cm)", "Velocidades: 2", "Pinza ajustable", "Oscilación 90°", "Motor silencioso"],
    images: [
      "assets/images/categories/hidroponia.svg"
    ],
    stock: 32,
    rating: 4.5,
    reviewsCount: 53,
    featured: false,
    isNew: false
  },
  {
    id: "cl004",
    name: "Humidificador Ultrasónico 5L",
    category: "clima",
    price: 29990,
    description: "Humidificador ultrasónico con capacidad de 5L. Niebla fría, ideal para esquejes y etapa vegetativa. Apagado automático cuando se acaba el agua.",
    specs: ["Capacidad: 5 litros", "Producción: 300 ml/h", "Niebla fría", "Apagado automático", "Boquilla 360°"],
    images: [
      "assets/images/categories/accesorios.svg"
    ],
    stock: 15,
    rating: 4.6,
    reviewsCount: 24,
    featured: false,
    isNew: true
  },

  /* ============== MEDICIÓN (4) ============== */
  {
    id: "m001",
    name: "pHmetro Digital con Calibración",
    category: "medicion",
    price: 34990,
    oldPrice: 44990,
    description: "pHmetro digital de bolsillo con calibración automática. Pantalla LCD, resistente al agua. Incluye soluciones buffer pH 4 y 7.",
    specs: ["Rango: 0.0 - 14.0 pH", "Resolución: 0.1 pH", "Calibración: 3 puntos", "Resistente al agua IP65", "Baterías incluidas"],
    images: [
      "assets/images/categories/medicion.svg"
    ],
    stock: 13,
    rating: 4.8,
    reviewsCount: 39,
    featured: true,
    isNew: false
  },
  {
    id: "m002",
    name: "ECmetro Digital Profesional",
    category: "medicion",
    price: 29990,
    description: "Medidor de conductividad eléctrica (EC) y TDS. Rango 0-9999 ppm. Calibración automática con solución 1413 µS/cm incluida.",
    specs: ["Rango: 0-9999 ppm", "Resolución: 1 ppm", "Calibración automática", "Compensación temp.", "Resistente al agua"],
    images: [
      "assets/images/categories/clima.svg"
    ],
    stock: 18,
    rating: 4.7,
    reviewsCount: 27,
    featured: false,
    isNew: false
  },
  {
    id: "m003",
    name: "Termohigrómetro Digital Min/Max",
    category: "medicion",
    price: 9990,
    description: "Termohigrómetro digital con función mín/máx. Mide temperatura y humedad relativa. Memoria para valores extremos. Sensor externo.",
    specs: ["Rango temp: -10 a 50°C", "Rango HR: 10-99%", "Memoria mín/máx", "Sensor cable 1.5m", "Pila AAA incluida"],
    images: [
      "assets/images/categories/carpas.svg"
    ],
    stock: 45,
    rating: 4.6,
    reviewsCount: 48,
    featured: true,
    isNew: false
  },
  {
    id: "m004",
    name: "Luxómetro Digital 200.000 lux",
    category: "medicion",
    price: 24990,
    description: "Luxómetro digital profesional con rango hasta 200.000 lux. Sensor de alta precisión. Mide intensidad lumínica para optimizar tu cultivo.",
    specs: ["Rango: 0-200.000 lux", "Resolución: 0.1 lux", "Sensor: Fotodiodo de silicio", "Auto-apagado", "Pantalla LCD"],
    images: [
      "assets/images/categories/hidroponia.svg"
    ],
    stock: 10,
    rating: 4.5,
    reviewsCount: 16,
    featured: false,
    isNew: false
  },

  /* ============== ACCESORIOS (4) ============== */
  {
    id: "a001",
    name: "Set Macetas Geotextil 5L x 4",
    category: "accesorios",
    price: 19990,
    description: "Set de 4 macetas geotextiles de 5 litros. Tela no tejida que permite poda aérea de raíces y mejor oxigenación. Reutilizables.",
    specs: ["Capacidad: 5L c/u", "Cantidad: 4 macetas", "Material: Geotextil", "Poda aérea de raíces", "Lavables y reutilizables"],
    images: [
      "assets/images/categories/accesorios.svg"
    ],
    stock: 38,
    rating: 4.8,
    reviewsCount: 51,
    featured: true,
    isNew: false
  },
  {
    id: "a002",
    name: "Tijera de Poda Curva Trimming",
    category: "accesorios",
    price: 9990,
    description: "Tijera de poda profesional con hoja curva de acero inoxidable. Mango ergonómico antideslizante. Ideal para manicura de cogollos.",
    specs: ["Material: Acero inox", "Hoja curva", "Mango ergonómico", "Largo: 16cm", "Resorte incluido"],
    images: [
      "assets/images/categories/sustratos.svg"
    ],
    stock: 60,
    rating: 4.7,
    reviewsCount: 72,
    featured: true,
    isNew: false
  },
  {
    id: "a003",
    name: "Malla SOG 1.2m x 1.2m",
    category: "accesorios",
    price: 7990,
    description: "Malla de soporte para técnica SOG (Sea of Green) de 1.2 x 1.2 metros. Rejilla de nylon flexible con cuadros de 10x10cm.",
    specs: ["Dimensiones: 1.2 x 1.2m", "Cuadros: 10x10cm", "Material: Nylon", "Reutilizable", "Lavable"],
    images: [
      "assets/images/categories/carpas.svg"
    ],
    stock: 25,
    rating: 4.6,
    reviewsCount: 19,
    featured: false,
    isNew: false
  },
  {
    id: "a004",
    name: "Set Tutores y Bridas Soporte (50u)",
    category: "accesorios",
    price: 6990,
    description: "Set de 50 tutores plásticos de 30cm con bridas. Para soporte de ramas en floración y guiador de crecimiento vegetativo.",
    specs: ["Tutores: 50 unidades", "Largo: 30cm", "Bridas incluidas", "Plástico verde", "Reutilizables"],
    images: [
      "assets/images/categories/hidroponia.svg"
    ],
    stock: 40,
    rating: 4.4,
    reviewsCount: 11,
    featured: false,
    isNew: false
  }
];

const TEAM = [
  {
    name: "Tomás Sandoval",
    role: "Fundador & Cultivador Senior",
    bio: "15 años cultivando y asesorando growers. Ingeniero agrónomo de la U. de Chile. Especialista en hidroponía y nutrición.",
    avatar: "TS",
    color: "#15803d"
  },
  {
    name: "Camila Rojas",
    role: "Agrónoma & Asesora Técnica",
    bio: "Ingeniera agrónoma con magister en fitotecnia. Te ayuda a elegir sustratos, nutrientes y prevenir plagas.",
    avatar: "CR",
    color: "#16a34a"
  },
  {
    name: "Diego Fuentes",
    role: "Especialista en Iluminación",
    bio: "Técnico electrónico con 10 años de experiencia en iluminación hortícola. Te asesora en LED, HPS y consumo eléctrico.",
    avatar: "DF",
    color: "#0ea5e9"
  },
  {
    name: "Francisca Mella",
    role: "Atención al Cliente",
    bio: "Te ayuda con tu pedido, seguimiento y postventa. Apasionada por el cultivo responsable y orgánico.",
    avatar: "FM",
    color: "#a16207"
  }
];

const TESTIMONIALS = [
  {
    name: "Andrés P.",
    role: "Grower hace 3 años",
    rating: 5,
    text: "Llevo tres años comprando en VerdeVital y la asesoría de Camila es un golazo. Mi primer cultivo con el kit 3 partes me dio 80g por planta."
  },
  {
    name: "María José L.",
    role: "Cultivo medicinal",
    rating: 5,
    text: "Excelente calidad de productos. El LED de 240W con la carpa 100x100 es un setup perfecto. Despacho rápido y bien embalado."
  },
  {
    name: "Felipe R.",
    role: "Cliente frecuente",
    rating: 5,
    text: "Probé varios grow shops y VerdeVital tiene la mejor relación precio-calidad. El extractor centrífugo es silencioso, perfecto para indoor."
  },
  {
    name: "Carolina S.",
    role: "Principiante",
    rating: 5,
    text: "Empecé sin saber nada y Tomás me guió por WhatsApp en todo el setup. Ahora tengo mi huerta en casa y súper contenta con los resultados."
  }
];

const FAQS = [
  {
    q: "¿Qué potencia de LED necesito para mi carpa?",
    a: "La regla general es 30-50W por cada 30x30cm de superficie. Para una carpa 100x100cm necesitas un LED de 300-500W. En nuestro catálogo tenemos opciones para todos los tamaños."
  },
  {
    q: "¿Cómo mantengo el pH y EC correctos?",
    a: "El pH ideal para cultivo en tierra es 6.0-6.8, en hidroponía 5.5-6.2. La EC varía según etapa: 0.4-0.8 en esquejes, 1.0-1.4 en vegetativo y 1.4-2.0 en floración. Usa los pHmetros y ECmetros de nuestro catálogo."
  },
  {
    q: "¿Hacen envíos a regiones?",
    a: "Sí, despachamos a todo Chile vía Starken, Chilexpress y Blue Express. El costo se calcula en el checkout según tu comuna. Despachamos en 24-48h hábiles."
  },
  {
    q: "¿Cuánto demora un cultivo indoor desde la semilla?",
    a: "Depende de la genética, pero en general: 3-4 semanas de vegetativo + 8-10 semanas de floración = 3-4 meses totales. Algunas automáticas pueden estar listas en 10-12 semanas desde germinación."
  },
  {
    q: "¿Tienen asesoría gratuita?",
    a: "Sí, ofrecemos asesoría gratuita por WhatsApp y en tienda para todos nuestros clientes. Si es tu primera compra te guiamos paso a paso en la elección de productos según tu espacio, presupuesto y experiencia."
  },
  {
    q: "¿Cuál es la diferencia entre HPS y LED?",
    a: "El HPS es más económico al inicio pero consume más electricidad y genera más calor. El LED es más eficiente (hasta 40% menos consumo), menos calor y mayor vida útil. Para principiantes recomendamos LED quantum board."
  },
  {
    q: "¿Cuándo puedo dejar una reseña?",
    a: "Solo puedes reseñar productos que hayas comprado y recibido. Una vez que tu pedido figure como 'Entregado' en tu perfil, aparecerá el botón 'Dejar reseña' en cada producto del pedido."
  },
  {
    q: "¿Aceptan devoluciones?",
    a: "Sí, aceptamos devoluciones dentro de los 10 días posteriores a la compra si el producto está sin uso y con empaque original. Los LED tienen 3 años de garantía del fabricante. Para cambios por falla, contáctanos a hola@verdevital.cl."
  },
  {
    q: "¿Puedo retirar en tienda?",
    a: "Sí, puedes retirar en nuestra tienda de Av. Irarrázaval 3620, Ñuñoa, seleccionando 'Retiro en tienda' en el checkout. El pedido estará listo en 24h hábiles y te avisaremos por email."
  },
  {
    q: "¿Cuáles son los medios de pago?",
    a: "Aceptamos Webpay (tarjetas crédito/débito), transferencia bancaria, Mercado Pago y efectivo solo para retiro en tienda. El pago es 100% seguro y se procesa al confirmar el pedido."
  }
];

const SHIPPING_OPTIONS = [
  { id: "retiro", name: "Retiro en tienda", description: "Av. Irarrázaval 3620, Ñuñoa. Listo en 24h.", price: 0, eta: "24h hábiles" },
  { id: "estandar", name: "Envío estándar", description: "Despacho a domicilio en 2-4 días hábiles.", price: 3990, eta: "2-4 días hábiles" },
  { id: "express", name: "Envío express", description: "Despacho prioritario al día siguiente (RM).", price: 7990, eta: "24h hábiles" }
];

const PAYMENT_OPTIONS = [
  { id: "webpay", name: "Webpay", description: "Tarjetas crédito y débito", icon: "💳" },
  { id: "transferencia", name: "Transferencia bancaria", description: "Banco Estado / BCI / Santander", icon: "🏦" },
  { id: "mercadopago", name: "Mercado Pago", description: "Hasta 12 cuotas sin interés", icon: "💰" },
  { id: "efectivo", name: "Efectivo", description: "Solo retiro en tienda", icon: "💵" }
];

const ORDER_STATUS_FLOW = ["recibido", "preparando", "enviado", "entregado"];

const ORDER_STATUS_LABELS = {
  recibido: "Recibido",
  preparando: "Preparando",
  enviado: "En camino",
  entregado: "Entregado",
  cancelado: "Cancelado"
};

const ORDER_STATUS_ICONS = {
  recibido: "inventory_2",
  preparando: "package_2",
  enviado: "local_shipping",
  entregado: "check_circle",
  cancelado: "cancel"
};

/* ============================================
   DEMO USER (cuenta precargada)
   ============================================ */
const DEMO_USER = {
  id: "u-demo",
  name: "Felipe Cultivador",
  email: "demo@verdevital.cl",
  phone: "+56 9 8765 4321",
  password: "demo1234",
  createdAt: "2025-08-12T10:30:00Z",
  address: {
    street: "Av. Providencia 1234",
    apartment: "Depto 502",
    commune: "Providencia",
    region: "Región Metropolitana",
    zipCode: "7500000"
  }
};

const SEED_ORDERS = [
  {
    id: "GR-2025-1042",
    userId: "u-demo",
    items: [
      { id: "i001", name: "Panel LED Full Spectrum 240W", price: 149990, qty: 1, image: "https://picsum.photos/seed/i001/800/800", category: "iluminacion" },
      { id: "s001", name: "Sustrato Light Mix 50L", price: 14990, qty: 2, image: "https://picsum.photos/seed/s001/800/800", category: "sustratos" }
    ],
    subtotal: 179970,
    shipping: 0,
    shippingName: "Envío estándar",
    total: 179970,
    paymentName: "Webpay",
    address: DEMO_USER.address,
    status: "entregado",
    createdAt: "2025-09-15T14:20:00Z",
    history: [
      { status: "recibido", date: "2025-09-15T14:20:00Z" },
      { status: "preparando", date: "2025-09-16T09:10:00Z" },
      { status: "enviado", date: "2025-09-17T11:00:00Z" },
      { status: "entregado", date: "2025-09-19T15:30:00Z" }
    ]
  },
  {
    id: "GR-2025-1089",
    userId: "u-demo",
    items: [
      { id: "f001", name: "Kit Fertilizante 3 Partes 500ml", price: 24990, qty: 1, image: "https://picsum.photos/seed/f001/800/800", category: "fertilizantes" },
      { id: "h001", name: "Sistema DWC 4 Baldes 20L", price: 79990, qty: 1, image: "https://picsum.photos/seed/h001/800/800", category: "hidroponia" }
    ],
    subtotal: 104980,
    shipping: 3990,
    shippingName: "Envío estándar",
    total: 108970,
    paymentName: "Mercado Pago",
    address: DEMO_USER.address,
    status: "enviado",
    createdAt: "2025-10-28T16:45:00Z",
    history: [
      { status: "recibido", date: "2025-10-28T16:45:00Z" },
      { status: "preparando", date: "2025-10-29T08:30:00Z" },
      { status: "enviado", date: "2025-10-30T13:15:00Z" }
    ]
  },
  {
    id: "GR-2025-1107",
    userId: "u-demo",
    items: [
      { id: "c001", name: "Carpa de Cultivo 100x100x200cm Premium", price: 119990, qty: 1, image: "https://picsum.photos/seed/c001/800/800", category: "carpas" }
    ],
    subtotal: 119990,
    shipping: 0,
    shippingName: "Retiro en tienda",
    total: 119990,
    paymentName: "Transferencia bancaria",
    address: DEMO_USER.address,
    status: "preparando",
    createdAt: "2026-10-01T10:15:00Z",
    history: [
      { status: "recibido", date: "2026-10-01T10:15:00Z" },
      { status: "preparando", date: "2026-10-02T08:00:00Z" }
    ]
  }
];

const SEED_REVIEWS = [
  {
    id: "r001",
    productId: "i001",
    userName: "Andrés P.",
    rating: 5,
    comment: "Excelente panel. Mi cosecha de 4 plantas con este LED fue de 90g en total. Muy buena penetración, llega hasta abajo del dosel.",
    date: "2025-09-22"
  },
  {
    id: "r002",
    productId: "i001",
    userName: "Felipe R.",
    rating: 5,
    comment: "Después de 6 meses funcionando perfecto. Driver Meanwell de calidad y la garantía de 3 años da tranquilidad.",
    date: "2025-10-04"
  },
  {
    id: "r003",
    productId: "c001",
    userName: "María José L.",
    rating: 5,
    comment: "La carpa es súper resistente. El Mylar refleja la luz perfectamente y las cremalleras no se atascan como en otras marcas.",
    date: "2025-09-18"
  },
  {
    id: "r004",
    productId: "f001",
    userName: "Carolina S.",
    rating: 5,
    comment: "Mi primer cultivo con este kit y los resultados fueron increíbles. Fácil dosificación, las plantas respondieron muy bien.",
    date: "2025-10-12"
  },
  {
    id: "r005",
    productId: "m001",
    userName: "Tomás V.",
    rating: 4,
    comment: "Buen pHmetro por el precio. Tarda un poco en estabilizar la lectura pero las mediciones son consistentes.",
    date: "2025-08-30"
  },
  {
    id: "r006",
    productId: "cl002",
    userName: "Diego S.",
    rating: 5,
    comment: "El filtro elimina el olor por completo. Después de 6 meses todavía funciona perfecto. Recomendado 100%.",
    date: "2025-10-15"
  }
];
