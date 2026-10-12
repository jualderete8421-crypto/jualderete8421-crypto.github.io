/* ==========================================================================
   DATOS DE LA HOJA DE VIDA
   --------------------------------------------------------------------------
   Todo lo que ves aquí es un EJEMPLO FICTICIO (persona, empresas y cifras).
   Reemplázalo con tu información real: el formato Visual y el formato ATS
   se generan desde este mismo archivo, así que solo editas una vez.

   Reglas rápidas
   - "fin": "" significa que el cargo sigue vigente y se muestra "Actualidad".
   - Si no quieres un campo (por ejemplo "web"), déjalo como "" y no aparece.
   - "foto": ruta a tu imagen (ej. "assets/foto.jpg"). Vacío = muestra tus iniciales.
   - Las "categoria" de los proyectos crean los filtros del formato Visual.
   - No publiques tu cédula ni tu dirección exacta en una hoja de vida pública.
   ========================================================================== */

window.CV_DATA = {
  nombre: "Juan David",
  apellidos: "Alderete Cardona",
  cargo: "Desarrollador Full Stack Estudiante",
  foto: "fotojuan.jpg",

  ubicacion: "Manizales, Colombia",
  contacto: {
    email: "jualderete8421@gmail.com",
    telefono: "+57 3234329269",
    github: "github.com/jualderete8421-crypto/",
    linkedin: "linkedin.com/in/juan-david-alderete-917582208/",
    web: ""
  },

  perfil:
    "Desarrollador Full Stack con 1 años de experiencia construyendo aplicaciones web para empresas de logística, comercio y educación. " +
    "Trabajo principalmente con JavaScript, TypeScript, React y Node.js, con foco en rendimiento, accesibilidad y código fácil de mantener. " +
    "Acompaño cada funcionalidad de principio a fin: desde entender el requerimiento hasta publicarla y monitorearla en producción.",

  habilidades: [
    { grupo: "Frontend", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
    { grupo: "Backend", items: ["Node.js", "Express", "Python", "Django", "API REST", "JWT"] },
    { grupo: "Datos", items: ["PostgreSQL", "MongoDB", "Supabase", "Redis"] },
    { grupo: "Herramientas y despliegue", items: ["Git", "GitHub Actions", "Docker", "Netlify", "Vercel"] },
    { grupo: "Prácticas", items: ["Scrum", "Pruebas unitarias", "Revisión de código", "Accesibilidad web"] }
  ],

  experiencia: [
    {
      cargo: "Desarrollador Full Stack",
      empresa: "SOLED S.A.S.",
      lugar: "Manizales, Colombia",
      inicio: "Junio 2022",
      fin: "",
      logros: [
        "Lideré la reconstrucción del portal de asesores con Next.js y TypeScript: el tiempo de toma de pedidos bajo de 20 min a 5 min y la tasa de errores bajo 80% para los auxiliares de bodega.",
        "Diseñé una API REST en Node.js y PostgreSQL que atiende más de 40.000 solicitudes diarias con 99,9 % de disponibilidad.",
        "Automaticé el despliegue con GitHub Actions y Docker: el ciclo de entrega pasó de 2 semanas a 3 días.",
        "Acompaño desarrolladores junior y hago revisión de código en un equipo."
      ]
    },
    {
      cargo: "Desarrollador Frontend",
      empresa: "MOTOPLUS",
      lugar: "Remoto",
      inicio: "Ene 2026",
      fin: "",
      logros: [
        "Desarrollé una plataforma para llevar el control del inventario y entrada y salida de mototos para 2 clientes de , con diseño responsivo y accesibilidad.",
      ]
    },
    {
      cargo: "Desarrollador Junior",
      empresa: "RESTAURAT APP",
      lugar: "Manizales, Colombia",
      inicio: "Jul 2020",
      fin: "",
      logros: [
        "Di mantenimiento y agregué funcionalidades a un sistema de restaurantes en Python (Django) y PostgreSQL.",
        "Documenté el proceso de despliegue y resolví más de 60 incidencias reportadas por usuarios."
      ]
    }
  ],

  proyectos: [
    {
      nombre: "Plataforma de pedidos B2B",
      descripcion: "Portal para que distribuidores consulten el catálogo, coticen y envíen pedidos, con exportación de la cotización a PDF.",
      tecnologias: ["Next.js", "TypeScript", "Supabase", "Netlify"],
      categoria: "Web",
      enlace: "github.com/usuario/pedidos-b2b"
    },
    {
      nombre: "API de reservas",
      descripcion: "Servicio REST para gestionar disponibilidad y reservas, con autenticación JWT y documentación OpenAPI.",
      tecnologias: ["Node.js", "Express", "PostgreSQL", "Docker"],
      categoria: "API",
      enlace: "github.com/usuario/api-reservas"
    },
    {
      nombre: "Tablero de analítica de ventas",
      descripcion: "Panel interactivo que reúne las ventas por sucursal y avisa cuando una sucursal cae por debajo de su promedio.",
      tecnologias: ["Python", "Pandas", "Plotly"],
      categoria: "Datos",
      enlace: "github.com/usuario/tablero-ventas"
    },
    {
      nombre: "Automatización de reportes",
      descripcion: "Script que genera y envía cada semana un reporte en PDF; ahorra unas 6 horas de trabajo manual.",
      tecnologias: ["Python", "Google Sheets API"],
      categoria: "Datos",
      enlace: ""
    }
  ],

  educacion: [
    {
      titulo: "Ingeniería Informatica",
      institucion: "Universidad de Caldas",
      lugar: "Manizales, Colombia",
      inicio: "2026",
      fin: "EN CURSO"
    }
  ],

  certificaciones: [
    { nombre: "Desarrollo web Full Stack con JavaScript", entidad: "Plataforma de aprendizaje en línea", anio: "2026" },
    { nombre: "Fundamentos de computación en la nube", entidad: "Proveedor cloud", anio: "2026" },
    { nombre: "TypeScript avanzado", entidad: "Plataforma de aprendizaje en línea", anio: "2026" }
  ],

  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "A2 (intermedio alto)" }
  ]
};
