'use server'

import { z } from 'zod'

// Zod schema for event tracking validation
const TrackEventSchema = z.object({
  event: z.string().min(1, 'Event name is required'),
  properties: z.record(z.any()).optional(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
})

export interface TrackEventState {
  errors?: {
    event?: string[]
    properties?: string[]
    userId?: string[]
    sessionId?: string[]
  }
  message?: string
  success?: boolean
}

export const trackEvent = async (
  prevState: TrackEventState,
  formData: FormData
): Promise<TrackEventState> => {
  // Parse properties from JSON string if provided
  let properties
  try {
    const propertiesString = formData.get('properties') as string
    properties = propertiesString ? JSON.parse(propertiesString) : undefined
  } catch (error) {
    return {
      errors: { properties: ['Invalid JSON format for properties'] },
      message: 'Invalid properties format. Failed to track event.',
      success: false,
    }
  }

  // Validate form fields
  const validatedFields = TrackEventSchema.safeParse({
    event: formData.get('event'),
    properties,
    userId: formData.get('userId'),
    sessionId: formData.get('sessionId'),
  })

  // If form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to track event.',
      success: false,
    }
  }

  const { event, properties: validProperties, userId, sessionId } = validatedFields.data

  try {
    // Simulate successful event tracking
    console.log('Event tracked:', { 
      event, 
      properties: validProperties, 
      userId, 
      sessionId,
      timestamp: new Date().toISOString()
    })
    
    // In a real implementation, this would send to analytics service or database:
    // await analytics.track({
    //   event,
    //   properties: validProperties,
    //   userId,
    //   sessionId,
    //   timestamp: new Date(),
    // })

    return {
      message: 'Event tracked successfully!',
      success: true,
    }
  } catch (error) {
    console.error('Error tracking event:', error)
    return {
      message: 'Analytics Error: Failed to track event.',
      success: false,
    }
  }
} 