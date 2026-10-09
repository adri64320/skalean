'use client'

import content from '@/content/site-content.json'
import { ArrowDownRight, ArrowRight, Menu, ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'

const productIcons = [ShieldCheck, SlidersHorizontal]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState(0)

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Skalean, accueil">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>SKALEAN</span>
        </a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navigation principale">
          {[content.navigation.product, content.navigation.company, content.navigation.resources, content.navigation.solutions].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}>{content.navigation.pricing}</a>
          <a className="mobile-login" href="#contact" onClick={() => setMenuOpen(false)}>{content.navigation.login}</a>
        </nav>
        <div className="header-actions">
          <a className="login-link" href="#contact">{content.navigation.login}</a>
          <a className="button button-copper button-small" href="#contact">{content.navigation.cta}<ArrowRight aria-hidden="true" /></a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="hero-inner">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className="hero-copy">{content.hero.description}</p>
          <div className="hero-actions"><a className="button button-copper" href="#products">{content.hero.primaryCta}<ArrowRight aria-hidden="true" /></a><a className="button button-outline" href="#solutions">{content.hero.secondaryCta}</a></div>
        </div>
        <div className="proof-row">{content.hero.proof.map((item) => <span key={item}><span className="proof-dot" />{item}</span>)}</div>
      </section>

      <section className="intro section-pad" id="skalean"><div className="section-label"><span>{content.intro.eyebrow}</span><ArrowDownRight aria-hidden="true" /></div><div className="intro-grid"><h2>{content.intro.title}</h2><p>{content.intro.description}</p></div></section>

      <section className="products section-pad" id="product"><div className="section-heading"><div><p className="eyebrow">{content.products.eyebrow}</p><h2>{content.products.title}</h2></div><p>{content.products.description}</p></div><div className="product-tabs" role="tablist" aria-label="Produits Skalean">{content.products.items.map((item, i) => <button key={item.name} className={activeProduct === i ? 'product-tab active' : 'product-tab'} onClick={() => setActiveProduct(i)} role="tab" aria-selected={activeProduct === i}><span>0{i + 1}</span>{item.name}<ArrowRight aria-hidden="true" /></button>)}</div><div className="product-showcase"><div className="product-visual"><span className="visual-kicker">SKALEAN / 0{activeProduct + 1}</span><div className="visual-lines"><i /><i /><i /></div><div className="visual-symbol"><span /></div><p>{content.products.items[activeProduct].tag}</p></div><div className="product-copy"><p className="eyebrow">{content.products.items[activeProduct].tag}</p><h3>{content.products.items[activeProduct].name}</h3><p>{content.products.items[activeProduct].description}</p><strong>{content.products.items[activeProduct].detail}</strong><a className="text-link" href="#contact">Découvrir la solution <ArrowRight aria-hidden="true" /></a></div></div></section>

      <section className="how section-pad" id="solutions"><div className="section-heading"><div><p className="eyebrow">{content.howItWorks.eyebrow}</p><h2>{content.howItWorks.title}</h2></div><p>{content.howItWorks.description}</p></div><div className="steps">{content.howItWorks.steps.map((step) => <article className="step" key={step.number}><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p><ArrowDownRight aria-hidden="true" /></article>)}</div></section>

      <section className="manifesto section-pad" id="resources"><div className="manifesto-card"><div><p className="eyebrow">{content.manifesto.eyebrow}</p><h2>{content.manifesto.title}</h2></div><div><p>{content.manifesto.description}</p><a className="text-link" href="#contact">Notre approche <ArrowRight aria-hidden="true" /></a></div></div></section>

      <section className="contact section-pad" id="contact"><p className="eyebrow">{content.contact.eyebrow}</p><h2>{content.contact.title}</h2><a className="button button-copper" href={`mailto:${content.contact.email}`}>{content.contact.cta}<ArrowRight aria-hidden="true" /></a><p className="contact-email">{content.contact.email}</p></section>

      <footer className="footer"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><span>SKALEAN</span></a><p>{content.footer.description}</p><div className="footer-links">{content.footer.links.map((link) => <a key={link} href="#contact">{link}</a>)}</div><small>{content.footer.copyright}</small></footer>
    </main>
  )
}
