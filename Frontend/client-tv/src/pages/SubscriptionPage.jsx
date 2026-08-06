import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuthentication'
import { useSubscription } from '../hooks/useSubscription'
import { usePlans } from '../hooks/usePlans'

export function SubscriptionPage() {
  const { user } = useAuth()
  const clientId = user?.id ?? user?.clientId ?? localStorage.getItem('clientId')
  const { subscription, isLoading, error } = useSubscription(clientId)
  const { plans, loading: plansLoading } = usePlans()

  const formatDate = (value) => {
    if (!value) return '—'
    const parsedDate = new Date(value)
    if (Number.isNaN(parsedDate.getTime())) return value
    return parsedDate.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const matchedPlan = useMemo(() => {
    if (!subscription?.planId) return null
    return plans.find((plan) => plan.id === subscription.planId) || null
  }, [plans, subscription?.planId])

  const planName = matchedPlan?.name || matchedPlan?.title || subscription?.planId || '—'
  const planType = matchedPlan?.planType || '—'
  const planPrice = matchedPlan?.price != null ? `$${Number(matchedPlan.price).toFixed(2)}` : '—'

  const detailItems = useMemo(() => [
    { label: 'Status', value: subscription?.status || '—' },
    { label: 'Plan', value: plansLoading ? 'Loading plan…' : planName },
    { label: 'Plan Type', value: plansLoading ? 'Loading plan…' : planType },
    { label: 'Price', value: plansLoading ? 'Loading plan…' : planPrice },
    { label: 'Start Date', value: formatDate(subscription?.startDate) },
    { label: 'End Date', value: formatDate(subscription?.endDate) },
    { label: 'Trial End Date', value: formatDate(subscription?.trialEndDate) },
    { label: 'Created', value: formatDate(subscription?.createdAt) },
    { label: 'Updated', value: formatDate(subscription?.updatedAt) },
  ], [planName, planPrice, planType, plansLoading, subscription])

  return (
    <div className="support-page">
      <div className="support-header">
        <div>
          <p className="section-kicker">Account</p>
          <h1>Subscription</h1>
        </div>
        <div className="support-header-actions">
          <Link to="/" className="ghost-btn">Back to Home</Link>
        </div>
      </div>

      <div className="support-card">
        {isLoading && <p className="support-error">Loading subscription…</p>}
        {error && <p className="support-error">Unable to load subscription details.</p>}
        {!isLoading && !error && subscription && (
          <div className="subscription-detail-list">
            {detailItems.map((item) => (
              <div key={item.label} className="subscription-detail-row">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        )}
        {!isLoading && !error && !subscription && (
          <p className="support-error">No subscription information available.</p>
        )}
      </div>
    </div>
  )
}
