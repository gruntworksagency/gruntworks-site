'use client'

import { useState, useEffect } from 'react'

interface ClientConfig {
  name: string
  slug: string
  theme: {
    primaryColor: string
    secondaryColor: string
  }
  features: string[]
  contact: {
    email: string
    phone: string
  }
}

// Mock async function to fetch client config
const fetchClientConfig = async (clientSlug: string): Promise<ClientConfig> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock client config data
  return {
    name: 'Gruntworks Agency',
    slug: clientSlug,
    theme: {
      primaryColor: '#FF6B35', // Safety Orange
      secondaryColor: '#F5F5DC', // Cream
    },
    features: ['Custom Development', 'SEO Optimization', 'Analytics'],
    contact: {
      email: 'info@gruntworksagency.com',
      phone: '(555) 123-4567'
    }
  }
}

// Component that fetches client config data
const ClientConfigDisplay: React.FC<{ clientSlug: string }> = ({ clientSlug }) => {
  const [clientConfig, setClientConfig] = useState<ClientConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadClientConfig = async () => {
      try {
        setLoading(true)
        setError(null)
        const config = await fetchClientConfig(clientSlug)
        setClientConfig(config)
      } catch (err) {
        setError('Failed to load client configuration')
        console.error('Error loading client config:', err)
      } finally {
        setLoading(false)
      }
    }

    loadClientConfig()
  }, [clientSlug])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="bg-red-900 rounded-lg p-6 text-red-100">
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!clientConfig) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-cream">
        <p>No client configuration found</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 text-cream">
      <h3 className="text-xl font-semibold mb-4">Client Configuration</h3>
      
      <div className="space-y-4">
        <div>
          <span className="text-orange-500 font-medium">Name:</span>
          <span className="ml-2">{clientConfig.name}</span>
        </div>
        
        <div>
          <span className="text-orange-500 font-medium">Slug:</span>
          <span className="ml-2">{clientConfig.slug}</span>
        </div>
        
        <div>
          <span className="text-orange-500 font-medium">Theme:</span>
          <div className="ml-2 flex items-center gap-4">
            <div 
              className="w-6 h-6 rounded border-2 border-gray-600"
              style={{ backgroundColor: clientConfig.theme.primaryColor }}
              title="Primary Color"
            />
            <div 
              className="w-6 h-6 rounded border-2 border-gray-600"
              style={{ backgroundColor: clientConfig.theme.secondaryColor }}
              title="Secondary Color"
            />
          </div>
        </div>
        
        <div>
          <span className="text-orange-500 font-medium">Features:</span>
          <ul className="ml-2 mt-1">
            {clientConfig.features.map((feature: string, index: number) => (
              <li key={index} className="text-sm">• {feature}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <span className="text-orange-500 font-medium">Contact:</span>
          <div className="ml-2 text-sm">
            <p>Email: {clientConfig.contact.email}</p>
            <p>Phone: {clientConfig.contact.phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading component for Suspense
const LoadingSpinner: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-6 text-cream">
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-700 rounded w-1/3"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  </div>
)

// Main component that demonstrates async data fetching with Suspense
const ClientDataExample: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold text-cream mb-6">React 19 Data Fetching Example</h2>
      <p className="text-neutral-300 mb-6 text-sm">
        This component demonstrates client-side data fetching with proper loading states and error handling.
        (Note: React 19's 'use' hook is not yet available in the stable release)
      </p>
      
      <ClientConfigDisplay clientSlug="gruntworksagency" />
    </div>
  )
}

export default ClientDataExample 