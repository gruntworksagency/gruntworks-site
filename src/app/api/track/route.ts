import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';

interface TrackEventRequestBody {
  event_type: string;
  event_data?: Record<string, any>;
  client_slug?: string;
  session_id?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as TrackEventRequestBody;

    if (!body.event_type) {
      return NextResponse.json({ error: 'Event type is required.' }, { status: 400 });
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        event_type: body.event_type,
        event_data: body.event_data || undefined,
        client_slug: body.client_slug || undefined,
        session_id: body.session_id || undefined,
      },
    });

    // For performance, don't wait for the save to complete in critical paths on frontend.
    // Here we just log it. Could also send to a message queue for later processing.
    console.log('Analytics event tracked:', event.id);

    return NextResponse.json({ message: 'Event tracked successfully', eventId: event.id }, { status: 202 }); // 202 Accepted

  } catch (error) {
    console.error('API Error - /api/track:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
    }
    // Avoid sending detailed errors for tracking to prevent info leaks / noisy logs for non-critical path
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
} 