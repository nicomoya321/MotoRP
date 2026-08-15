# Radikal Moto — Indumentaria para motociclistas

Sitio simple hecho con **React + Vite**. Catálogo con filtros por categoría
(remeras, buzos, camperas, gorras, guantes) y por marca (Yamaha, Alpinestars,
Fox, Radikal, Shift), tema negro/rojo, y botones de consulta por WhatsApp en
cada producto.

## Correr en local

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173`.

## Antes de publicar

1. **Fotos de producto**: las imágenes actuales son marcadores de posición
   (generadas dinámicamente, sin logos ni fotos reales de las marcas).
   Reemplazalas por fotos propias en `src/App.jsx`, cambiando la función
   `placeholder(...)` por la URL real de cada foto (podés subir las imágenes
   a `public/img/` y referenciarlas como `/img/nombre.jpg`).
2. **WhatsApp**: cambiá `WHATSAPP_NUMBER` en `src/App.jsx` por tu número real
   (formato `549` + código de área sin 0 + número, sin espacios ni guiones).
3. **Precios y productos**: editá el array `PRODUCTS` en `src/App.jsx`.

## Deploy en Render

1. Subí esta carpeta a un repositorio en GitHub.
2. En Render: **New > Static Site**.
3. Conectá el repositorio.
4. Configurá:
   - **Build Command**: `npm install && npm run build`
   - **Publish directory**: `dist`
5. Deploy. Render te va a dar una URL pública (`https://tu-sitio.onrender.com`).

Cada vez que hagas `git push`, Render vuelve a buildear y publicar
automáticamente.
