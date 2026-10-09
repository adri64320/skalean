import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — Skalean',
}

export default function MentionsLegales() {
  return (
    <main style={{ background: 'var(--ivory)', minHeight: '100vh', color: 'var(--anthracite)', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <header style={{ height: 76, display: 'flex', alignItems: 'center', padding: '0 clamp(22px,7vw,110px)', borderBottom: '1px solid rgba(38,34,31,.1)', background: 'rgba(247,245,242,.86)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--graphite)', textDecoration: 'none' }}>
          <ArrowLeft size={16} />
          Retour
        </Link>
        <span style={{ marginLeft: 'auto', fontSize: 20, fontWeight: 800, letterSpacing: '.19em' }}>SKALEAN</span>
      </header>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(52px,8vw,100px) clamp(22px,5vw,0px)' }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.23em', color: 'var(--copper)', marginBottom: 20 }}>INFORMATIONS LÉGALES</p>
        <h1 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 400, letterSpacing: '-.05em', lineHeight: 1.02, marginBottom: 52 }}>Mentions légales</h1>

        <Section title="Éditeur du site">
          <p>Le présent site internet est édité par la société <strong>Skalean</strong>, société par actions simplifiée (SAS) au capital de [montant] euros.</p>
          <Row label="Siège social" value="[Adresse du siège social]" />
          <Row label="SIRET" value="[Numéro SIRET]" />
          <Row label="RCS" value="[Ville] [Numéro RCS]" />
          <Row label="Directeur de publication" value="Adrien Bernard" />
          <Row label="Contact" value="contact@skalean.fr" />
        </Section>

        <Section title="Hébergement">
          <p>Le site est hébergé par :</p>
          <Row label="Hébergeur" value="Vercel Inc." />
          <Row label="Adresse" value="340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis" />
          <Row label="Site web" value="vercel.com" />
        </Section>

        <Section title="Propriété intellectuelle">
          <p>L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels…) est la propriété exclusive de Skalean ou de ses partenaires. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord exprès écrit de Skalean.</p>
        </Section>

        <Section title="Responsabilité">
          <p>Skalean s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Skalean ne peut garantir l'exhaustivité et l'exactitude des informations et décline toute responsabilité pour tout dommage résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site.</p>
        </Section>

        <Section title="Liens hypertextes">
          <p>Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau internet ne sauraient engager la responsabilité de Skalean.</p>
        </Section>

        <Section title="Droit applicable">
          <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          <p>Pour toute question, contactez-nous à : <a href="mailto:contact@skalean.fr" style={{ color: 'var(--copper)' }}>contact@skalean.fr</a></p>
        </Section>
      </div>

      <footer style={{ background: 'var(--anthracite)', color: 'var(--greige)', padding: '28px clamp(22px,7vw,110px)', fontSize: 12, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span>© 2026 Skalean. Tous droits réservés.</span>
        <div style={{ display: 'flex', gap: 22 }}>
          <Link href="/mentions-legales" style={{ color: 'var(--greige)', textDecoration: 'none' }}>Mentions légales</Link>
          <Link href="/confidentialite" style={{ color: 'var(--greige)', textDecoration: 'none' }}>Confidentialité</Link>
        </div>
      </footer>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ borderTop: '1px solid var(--line)', paddingTop: 32, marginBottom: 40 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.02em', marginBottom: 18 }}>{title}</h2>
      <div style={{ color: 'var(--taupe)', fontSize: 16, lineHeight: 1.7 }}>{children}</div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <p style={{ margin: '6px 0' }}>
      <strong style={{ color: 'var(--anthracite)', fontWeight: 600 }}>{label} :</strong> {value}
    </p>
  )
}
