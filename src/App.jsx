import { useMemo, useState } from 'react'

const WHATSAPP_NUMBER = '549341782006' // reemplazar por el número real del negocio

const CATEGORIES = [
  { id: 'todas', label: 'Todas' },
  { id: 'remeras', label: 'Remeras' },
  { id: 'buzos', label: 'Buzos' },
  { id: 'camperas', label: 'Camperas' },
  { id: 'gorras', label: 'Gorras' },
  { id: 'guantes', label: 'Guantes' },
]

const BRANDS = ['Todas', 'Yamaha', 'Alpinestars', 'Fox', 'Radikal', 'Shift']

// Genera una imagen de marcador de posición prolija (negro/rojo, acorde a la
// paleta del sitio) para los productos que todavía no tienen foto propia.
function placeholderImg(brand, name) {
  const text = encodeURIComponent(`${brand}\n${name}`)
  return `https://placehold.co/600x600/0a0a0a/e10600?font=montserrat&text=${text}`
}

// Si el producto tiene "image" seteada (foto real subida a public/img),
// se usa esa. Si no, se cae al placeholder generado.
function productImage(p) {
  return p.image ? p.image : placeholderImg(p.brand, p.name)
}

const PRODUCTS = [
  { id: 1, category: 'remeras', brand: 'Yamaha', name: 'Remera Racing Blue', price: 18500 },
  { id: 2, category: 'remeras', brand: 'Alpinestars', name: 'Remera Ageless Tee', price: 21900, image: '/img/alpinestars-remera-ageless.png' },
  { id: 19, category: 'remeras', brand: 'Alpinestars', name: 'Remera Register Tee', price: 20900, image: '/img/alpinestars-remera-register.png' },
  { id: 3, category: 'remeras', brand: 'Fox', name: 'Remera Legacy Moth', price: 19900 },
  { id: 4, category: 'remeras', brand: 'Radikal', name: 'Remera Radikal Logo', price: 15900 },
  { id: 5, category: 'buzos', brand: 'Fox', name: 'Buzo Canguro Pinnacle', price: 42900 },
  { id: 6, category: 'buzos', brand: 'Alpinestars', name: 'Buzo Hoodie Contrast', price: 45500, image: '/img/alpinestars-buzo-contrast.png' },
  { id: 20, category: 'buzos', brand: 'Alpinestars', name: 'Buzo Zip Hoodie Gold', price: 49900, image: '/img/alpinestars-buzo-zip-gold.png' },
  { id: 21, category: 'buzos', brand: 'Alpinestars', name: 'Buzo Peak Hoodie Grey', price: 46900, image: '/img/alpinestars-buzo-peak-grey.png' },
  { id: 7, category: 'buzos', brand: 'Yamaha', name: 'Buzo Paddock Blue', price: 47900 },
  { id: 8, category: 'buzos', brand: 'Radikal', name: 'Buzo Rustico Team', price: 38900 },
  { id: 9, category: 'camperas', brand: 'Alpinestars', name: 'Campera Sector Mesh', price: 129900, image: '/img/alpinestars-campera-sector-mesh.png' },
  { id: 22, category: 'camperas', brand: 'Alpinestars', name: 'Campera SP GT', price: 139900, image: '/img/alpinestars-campera-sp-gt.png' },
  { id: 23, category: 'camperas', brand: 'Alpinestars', name: 'Campera Andes Adventure', price: 189900, image: '/img/alpinestars-campera-andes.png' },
  { id: 10, category: 'camperas', brand: 'Yamaha', name: 'Campera Paddock Softshell', price: 118500 },
  { id: 11, category: 'camperas', brand: 'Fox', name: 'Campera Legion Softshell', price: 109900 },
  { id: 12, category: 'camperas', brand: 'Shift', name: 'Campera Recon Drift', price: 134900 },
  { id: 13, category: 'gorras', brand: 'Alpinestars', name: 'Gorra Corp Snapback', price: 14900 },
  { id: 14, category: 'gorras', brand: 'Fox', name: 'Gorra Instill Flexfit', price: 13900 },
  { id: 15, category: 'gorras', brand: 'Radikal', name: 'Gorra Radikal Trucker', price: 11500 },
  { id: 16, category: 'guantes', brand: 'Alpinestars', name: 'Guantes SP-2 v3', price: 54900 },
  { id: 17, category: 'guantes', brand: 'Fox', name: 'Guantes Bomber', price: 32900 },
  { id: 18, category: 'guantes', brand: 'Shift', name: 'Guantes 3XPOSURE', price: 39900 },
]

function currency(n) {
  return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

function waLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

function Gauge() {
  return (
    <div className="gauge-wrap">
      <svg className="gauge" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="92" stroke="#272727" strokeWidth="2" />
        {Array.from({ length: 28 }).map((_, i) => {
          const angle = -220 + i * (260 / 27)
          const rad = (angle * Math.PI) / 180
          const isRed = i > 20
          const r1 = 92, r2 = i % 3 === 0 ? 78 : 84
          const x1 = 100 + r1 * Math.cos(rad)
          const y1 = 100 + r1 * Math.sin(rad)
          const x2 = 100 + r2 * Math.cos(rad)
          const y2 = 100 + r2 * Math.sin(rad)
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isRed ? '#ff2c1f' : '#8f8f8f'} strokeWidth={i % 3 === 0 ? 2.5 : 1.5} />
          )
        })}
        <line x1="100" y1="100" x2="150" y2="55" stroke="#ff2c1f" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="100" r="6" fill="#e10600" />
      </svg>
      <div className="gauge-label">
        <span className="num">18 MODELOS EN STOCK</span>
        <span className="txt">ENTREGA EN 24/48HS</span>
      </div>
    </div>
  )
}

export default function App() {
  const [category, setCategory] = useState('todas')
  const [brand, setBrand] = useState('Todas')

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p =>
      (category === 'todas' || p.category === category) &&
      (brand === 'Todas' || p.brand === brand)
    )
  }, [category, brand])

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">RADIKAL<span>MOTO</span></div>
          <nav className="header-nav">
            <a href="#catalogo">Catálogo</a>
            <a href="#marcas">Marcas</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a className="header-cta" href={waLink('Hola! Quiero hacer una consulta.')} target="_blank" rel="noreferrer">
            Consultar
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Indumentaria moto</div>
            <h1>Rodá con <em>actitud</em>, no con cualquier cosa</h1>
            <p className="lead">
              Remeras, buzos, camperas, gorras y guantes de las marcas que se
              usan en la pista y en la calle. Yamaha, Alpinestars, Fox, Radikal
              y más — todo en un mismo lugar.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#catalogo">Ver catálogo</a>
              <a className="btn-ghost" href={waLink('Hola! Quiero saber más sobre los productos.')} target="_blank" rel="noreferrer">
                Hablar por WhatsApp
              </a>
            </div>
          </div>
          <Gauge />
        </div>
      </section>

      <div className="stripe-divider" />

      <div id="marcas" className="brand-strip">
        <div className="brand-strip-inner">
          {BRANDS.filter(b => b !== 'Todas').map(b => (
            <div className="brand-strip-item" key={b}>{b}</div>
          ))}
        </div>
      </div>

      <div className="notice">
        <div className="notice-inner">
          <strong>Nota:</strong> las imágenes de este catálogo son marcadores
          de posición de diseño. Reemplazalas por fotos reales de tus
          productos (propias o de tus proveedores) antes de publicar el sitio.
        </div>
      </div>

      <section className="section" id="catalogo">
        <div className="section-head">
          <div>
            <h2>Catálogo <span>completo</span></h2>
            <p>Filtrá por tipo de prenda o por marca para encontrar lo que buscás.</p>
          </div>
        </div>

        <div className="filters">
          <div className="filter-group">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`filter-chip ${category === c.id ? 'active' : ''}`}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="filter-divider" />
          <div className="filter-group">
            {BRANDS.map(b => (
              <button
                key={b}
                className={`filter-chip ${brand === b ? 'active' : ''}`}
                onClick={() => setBrand(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">No hay productos para ese filtro. Probá con otra combinación.</div>
        ) : (
          <div className="grid">
            {filtered.map(p => (
              <div className="card" key={p.id}>
                <div className="card-media">
                  <img src={productImage(p)} alt={`${p.brand} - ${p.name}`} loading="lazy" />
                  <span className="card-tag">{p.category}</span>
                </div>
                <div className="card-body">
                  <span className="card-brand">{p.brand}</span>
                  <h3 className="card-title">{p.name}</h3>
                  <div className="card-footer">
                    <span className="card-price">{currency(p.price)}</span>
                    <a
                      className="card-btn"
                      href={waLink(`Hola! Me interesa: ${p.brand} - ${p.name} (${currency(p.price)})`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Consultar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="stripe-divider" />

      <footer className="site-footer" id="contacto">
        <div className="footer-inner">
          <div>
            <h3>Radikal Moto</h3>
            <p>Indumentaria y accesorios para motociclistas. Envíos a todo el país.</p>
          </div>
          <div>
            <h3>Contacto</h3>
            <a href={waLink('Hola! Quiero hacer una consulta.')} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="mailto:info@radikalmoto.com">info@radikalmoto.com</a>
            <a href="#">Instagram</a>
          </div>
          <div>
            <h3>Info</h3>
            <a href="#catalogo">Catálogo</a>
            <a href="#marcas">Marcas</a>
            <p>Rosario, Santa Fe, Argentina</p>
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} Radikal Moto — Sitio de ejemplo, personalizalo a gusto.</div>
      </footer>

      <a className="wa-float" href={waLink('Hola! Quiero hacer una consulta.')} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </>
  )
}
