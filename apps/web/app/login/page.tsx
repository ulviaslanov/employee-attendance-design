import { t } from '@attendance/i18n'

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
      <h1 className="font-display text-4xl text-(--color-dark)">Code Academy</h1>
      <p className="mt-2 text-sm text-(--color-taupe)">{t('az', 'app.teamPanel')}</p>

      <button
        type="button"
        disabled
        className="mt-10 w-full rounded-(--radius-lg) bg-(--color-dark) px-5 py-3 text-(--color-canvas) transition disabled:cursor-not-allowed disabled:opacity-60"
        aria-disabled="true"
      >
        {t('az', 'auth.signInGoogle')}
      </button>

      <p className="mt-3 text-xs text-(--color-taupe)">
        {t('az', 'app.backendOauthPending')}
      </p>
    </main>
  )
}
