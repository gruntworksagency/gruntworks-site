'use client'

import { useState } from 'react'
import { submitContactForm, ContactFormState } from './actions'

const ContactForm: React.FC = () => {
  const [state, setState] = useState<ContactFormState>({ message: '', success: false })
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await submitContactForm(state, formData)
    setState(result)
    setIsPending(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-cream mb-6">Get in Touch</h2>
      
      {state.message && (
        <div 
          className={`mb-6 p-4 rounded-lg ${
            state.success 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-cream mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-cream placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Your full name"
            aria-describedby={state.errors?.name ? 'name-error' : undefined}
          />
          {state.errors?.name && (
            <div id="name-error" className="mt-2 text-sm text-red-400" role="alert">
              {state.errors.name.map((error: string, index: number) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-cream mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-cream placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="your.email@example.com"
            aria-describedby={state.errors?.email ? 'email-error' : undefined}
          />
          {state.errors?.email && (
            <div id="email-error" className="mt-2 text-sm text-red-400" role="alert">
              {state.errors.email.map((error: string, index: number) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <div>
          <label 
            htmlFor="phone" 
            className="block text-sm font-medium text-cream mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-cream placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="(555) 123-4567"
            aria-describedby={state.errors?.phone ? 'phone-error' : undefined}
          />
          {state.errors?.phone && (
            <div id="phone-error" className="mt-2 text-sm text-red-400" role="alert">
              {state.errors.phone.map((error: string, index: number) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-cream mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-cream placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
            placeholder="Tell us about your project..."
            aria-describedby={state.errors?.message ? 'message-error' : undefined}
          />
          {state.errors?.message && (
            <div id="message-error" className="mt-2 text-sm text-red-400" role="alert">
              {state.errors.message.map((error: string, index: number) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <input type="hidden" name="clientSlug" value="gruntworksagency" />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-orange-500 hover:bg-orange-600 text-cream font-medium py-3 px-6 rounded-lg shadow-inner transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isPending ? 'Submitting contact form' : 'Submit contact form'}
        >
          {isPending ? 'Submitting...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}

export default ContactForm 