# Ediciones del Garaje - Sitio web

Sitio web estático para Ediciones del Garaje, optimizado para SEO y listo para deploy en Netlify.

## Cómo publicarlo en Netlify (5 minutos)

### Opción A: Drag & drop (la más rápida)
1. Ir a https://app.netlify.com/drop
2. Arrastrar TODA la carpeta a la zona indicada
3. Listo. Te da un dominio temporal tipo `nombre-random.netlify.app`

### Opción B: Con Git (recomendado para actualizar fácil)
1. Subir esta carpeta a un repositorio en GitHub
2. En Netlify: "New site from Git" → conectar GitHub → elegir el repo
3. Cada vez que actualices el código, el sitio se actualiza solo

## Conectar tu dominio (edicionesdelgaraje.com)
1. En Netlify: Site settings → Domain management → Add custom domain
2. Seguir las instrucciones para cambiar los DNS donde compraste el dominio
3. Netlify te da HTTPS gratis automáticamente

## Estructura del sitio

```
/
├── index.html              Home
├── tienda.html             Catálogo completo
├── blog.html               Listado del blog
├── sobre-nosotros.html     Sobre la editorial
├── contacto.html           Contacto
├── envios.html             Envíos y pagos
├── libros/                 24 fichas de libros (una por archivo)
├── blog/                   6 posts del blog optimizados
├── assets/
│   ├── styles.css          Estilos
│   └── script.js           Interacciones
├── sitemap.xml             Para Google
├── robots.txt              Para Google
└── netlify.toml            Config Netlify
```

## SEO incluido en cada página

- ✅ Title SEO único (50-60 caracteres)
- ✅ Meta description única (130-155 caracteres)
- ✅ Open Graph tags (para WhatsApp, Facebook)
- ✅ Twitter cards
- ✅ URL descriptiva
- ✅ Schema.org JSON-LD (productos como Book, posts como BlogPosting)
- ✅ Sitemap.xml generado
- ✅ Robots.txt
- ✅ Canonical URLs

## Próximos pasos

1. **Reemplazar el número de WhatsApp** placeholder en index.html, contacto.html y todas las páginas de libros (buscar "59800000000")
2. **Subir las fotos reales** de las tapas en /assets/ (por ahora hay placeholders de color)
3. **Confirmar datos**: autores marcados "Por confirmar", ISBN, páginas reales de cada libro
4. **Conectar dominio** edicionesdelgaraje.com
5. **Verificar en Google Search Console** y enviar sitemap.xml

## Cómo editar contenido

- **Editar texto de páginas**: abrir el archivo HTML correspondiente con cualquier editor
- **Cambiar precios o datos**: editar `build_site.py` y regenerar (o editar HTML directo)
- **Sumar libros nuevos**: agregar al array LIBROS en build_site.py
- **Sumar posts**: agregar al array POSTS en build_site.py

Para una edición más cómoda sin tocar código, se puede sumar Decap CMS (gratis) en una segunda etapa.
