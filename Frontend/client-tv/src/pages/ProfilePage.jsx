import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuthentication'
import { changePassword, getClientById } from '../data/crud'

export function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(user ?? null)
  const [loading, setLoading] = useState(!user)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    let isMounted = true

    if (user) {
      setProfile(user)
      setLoading(false)
      return () => {
        isMounted = false
      }
    }

    const clientId = localStorage.getItem('clientId')
    if (!clientId) {
      setLoading(false)
      setError('No client information is available right now.')
      return () => {
        isMounted = false
      }
    }

    setLoading(true)
    getClientById(clientId)
      .then((data) => {
        if (isMounted) {
          setProfile(data)
          setError('')
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load your profile information.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [user])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError('Please fill in all password fields.')
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    const clientId = localStorage.getItem('clientId')
    if (!clientId) {
      setError('Your client id is missing. Please sign in again.')
      return
    }

    setSubmitting(true)
    try {
      await changePassword(clientId, form.currentPassword, form.newPassword)
      setSuccess('Password updated successfully.')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Failed to update password.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div>
            <p className="profile-eyebrow">Account</p>
            <h1 className="profile-title">My profile</h1>
            <p className="profile-subtitle">View your client information and update your password.</p>
          </div>
        </div>

        {loading ? (
          <div className="profile-loading">
            <span className="login-spinner" />
          </div>
        ) : (
          <>
            <div className="profile-grid">
              <div className="profile-info">
                <h2>Client details</h2>
                <div className="profile-field-row">
                  <span className="profile-label">Full name</span>
                  <span className="profile-value">{profile?.fullName || profile?.full_name || '—'}</span>
                </div>
                <div className="profile-field-row">
                  <span className="profile-label">Username</span>
                  <span className="profile-value">{profile?.username || '—'}</span>
                </div>
                <div className="profile-field-row">
                  <span className="profile-label">Email</span>
                  <span className="profile-value">{profile?.email || '—'}</span>
                </div>
                <div className="profile-field-row">
                  <span className="profile-label">Phone</span>
                  <span className="profile-value">{profile?.phone || '—'}</span>
                </div>
              </div>

              <form className="profile-form" onSubmit={handleSubmit}>
                <h2>Change password</h2>
                <label className="profile-field">
                  <span>Current password</span>
                  <input
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your current password"
                  />
                </label>

                <label className="profile-field">
                  <span>New password</span>
                  <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleInputChange}
                    placeholder="Choose a new password"
                  />
                </label>

                <label className="profile-field">
                  <span>Confirm password</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter the new password"
                  />
                </label>

                {error ? <p className="profile-message error">{error}</p> : null}
                {success ? <p className="profile-message success">{success}</p> : null}

                <button type="submit" className="login-btn profile-submit" disabled={submitting}>
                  {submitting ? <span className="login-spinner" /> : 'Update password'}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
