import { Link } from 'react-router-dom'
import '../styles/landing.css'

const highlights = [
  'Live TV access with a clean, familiar experience',
  'Fast channel browsing and instant playback',
  'Simple account management and support access',
]

const features = [
  {
    title: 'Easy to use',
    text: 'A straightforward interface that keeps the focus on watching.',
  },
  {
    title: 'Reliable access',
    text: 'Browse categories, favorites, and streams without unnecessary clutter.',
  },
  {
    title: 'Built for service',
    text: 'Manage your account, subscription, and support requests from one place.',
  },
]

export function LandingPage() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">AstraFlow TV</p>
          <h1>Stream your entertainment with a simple, dependable experience.</h1>
          <p className="landing-text">
            Enjoy a clean TV experience with organized channels, easy navigation, and everything you need in one place.
          </p>
          <div className="landing-actions">
            <Link to="/register" className="landing-primary-btn">Create account</Link>
            <Link to="/signin" className="landing-secondary-btn">Sign in</Link>
          </div>
          <ul className="landing-highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="landing-panel">
          <div className="landing-panel-card">
            <p className="landing-panel-label">What you get</p>
            <h2>Everything needed for everyday viewing.</h2>
            <div className="landing-panel-list">
              <div>
                <strong>Channels</strong>
                <span>Browse by category and favorites</span>
              </div>
              <div>
                <strong>Playback</strong>
                <span>Open a stream quickly and watch</span>
              </div>
              <div>
                <strong>Support</strong>
                <span>Reach out without leaving the app</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        {features.map((feature) => (
          <article key={feature.title} className="landing-feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
