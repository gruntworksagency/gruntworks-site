import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';

interface ContactFormRequestBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
  clientSlug?: string; // To identify which client site the form was submitted from
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactFormRequestBody;

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    // TODO: Add more robust validation (e.g., using Zod)
    // Implement business logic (e.g., save to database)
    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        client_slug: body.clientSlug,
      },
    });

    console.log('Contact form submission saved:', submission);

    return NextResponse.json({ message: 'Form submitted successfully!', submissionId: submission.id }, { status: 201 });

  } catch (error) {
    console.error('API Error - /api/contact:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 