import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { clientSlug: string } }
) {
  try {
    const { clientSlug } = params;

    if (!clientSlug) {
      return NextResponse.json({ error: 'Client slug is required.' }, { status: 400 });
    }

    const client = await prisma.client.findUnique({
      where: { client_slug: clientSlug },
      select: {
        business_name: true,
        client_slug: true,
        city: true,
        state: true,
        business_type: true,
        client_settings: true, // Assuming this contains the relevant config
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    return NextResponse.json(client, { status: 200 });

  } catch (error) {
    console.error(`API Error - /api/client-config/${params.clientSlug}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 