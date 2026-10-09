import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Skalean',
}

export default function Confidentialite() {
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
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.23em', color: 'var(--copper)', marginBottom: 20 }}>RGPD &amp; DONNÉES PERSONNELLES</p>
        <h1 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 400, letterSpacing: '-.05em', lineHeight: 1.02, marginBottom: 16 }}>Politique de confidentialité</h1>
        <p style={{ color: 'var(--taupe)', fontSize: 14, marginBottom: 52 }}>Dernière mise à jour : octobre 2026</p>

        <Section title="Responsable du traitement">
          <p>Le responsable du traitement des données personnelles collectées sur ce site est :</p>
          <Row label="Société" value="Skalean SAS" />
          <Row label="Adresse" value="[Adresse du siège social]" />
          <Row label="Contact" value="contact@skalean.fr" />
        </Section>

        <Section title="Données collectées">
          <p>Dans le cadre de l'utilisation du site et de nos formulaires de contact, Skalean est susceptible de collecter les informations suivantes :</p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse e-mail professionnelle</li>
            <li>Nom de la société</li>
            <li>Données de navigation (pages visitées, durée des sessions) via des outils d'analyse anonymisés</li>
          </ul>
          <p>Aucune donnée sensible au sens de l'article 9 du RGPD n'est collectée.</p>
        </Section>

        <Section title="Finalités et base légale">
          <p>Les données personnelles sont collectées pour les finalités suivantes :</p>
          <ul>
            <li><strong>Répondre à vos demandes de contact</strong> — base légale : exécution de mesures précontractuelles (art. 6.1.b RGPD)</li>
            <li><strong>Améliorer nos services et notre site</strong> — base légale : intérêt légitime (art. 6.1.f RGPD)</li>
            <li><strong>Envoyer des communications commerciales</strong> — base légale : consentement préalable (art. 6.1.a RGPD)</li>
          </ul>
        </Section>

        <Section title="Durée de conservation">
          <p>Les données sont conservées pour la durée strictement nécessaire aux finalités pour lesquelles elles ont été collectées :</p>
          <ul>
            <li>Données de contact : 3 ans à compter du dernier contact</li>
            <li>Données de navigation : 13 mois maximum (conformément aux recommandations de la CNIL)</li>
          </ul>
        </Section>

        <Section title="Partage des données">
          <p>Skalean ne vend, ne loue et ne partage pas vos données personnelles avec des tiers à des fins commerciales. Vos données peuvent être transmises à des prestataires techniques intervenant pour le compte de Skalean (hébergement, analyse d'audience) dans le strict respect du RGPD et sous couvert de contrats de sous-traitance.</p>
        </Section>

        <Section title="Transferts hors UE">
          <p>Certains de nos prestataires techniques sont susceptibles de traiter vos données hors de l'Union européenne. Dans ce cas, Skalean s'assure que des garanties appropriées sont en place (clauses contractuelles types de la Commission européenne, décision d'adéquation).</p>
        </Section>

        <Section title="Vos droits">
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès</strong> : obtenir une copie des données vous concernant</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
            <li><strong>Droit à la limitation</strong> : restreindre temporairement le traitement</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition</strong> : vous opposer à un traitement fondé sur l'intérêt légitime</li>
            <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@skalean.fr" style={{ color: 'var(--copper)' }}>contact@skalean.fr</a></p>
          <p>En cas de réclamation non résolue, vous pouvez saisir la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--copper)' }}>www.cnil.fr</a></p>
        </Section>

        <Section title="Cookies">
          <p>Le site utilise des cookies techniques nécessaires au fonctionnement du site ainsi que des outils d'analyse d'audience anonymisés. Aucun cookie publicitaire n'est déposé.</p>
          <p>Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies, sans impact sur votre navigation.</p>
        </Section>

        <Section title="Modifications de la politique">
          <p>Skalean se réserve le droit de modifier la présente politique de confidentialité à tout moment. La date de dernière mise à jour est indiquée en tête de document. Nous vous encourageons à la consulter régulièrement.</p>
          <p>Pour toute question : <a href="mailto:contact@skalean.fr" style={{ color: 'var(--copper)' }}>contact@skalean.fr</a></p>
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
