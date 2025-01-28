import { NextResponse } from 'next/server';
import crypto from 'crypto';

// In a real app, this would be in a database
let drafts = new Map();

// Generate a unique sharing token
function generateSharingToken() {
  return crypto.randomBytes(16).toString('hex');
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const draftId = Date.now().toString();
    const sharingToken = generateSharingToken();

    drafts.set(draftId, {
      ...data,
      id: draftId,
      sharingToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({
      draftId,
      sharingToken
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save draft' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const draftId = searchParams.get('draftId');
  const sharingToken = searchParams.get('sharingToken');

  if (!draftId) {
    return NextResponse.json(
      { error: 'Draft ID is required' },
      { status: 400 }
    );
  }

  const draft = drafts.get(draftId);

  if (!draft) {
    return NextResponse.json(
      { error: 'Draft not found' },
      { status: 404 }
    );
  }

  // If sharing token is provided, verify it
  if (sharingToken && draft.sharingToken !== sharingToken) {
    return NextResponse.json(
      { error: 'Invalid sharing token' },
      { status: 403 }
    );
  }

  return NextResponse.json(draft);
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const draftId = searchParams.get('draftId');
    
    if (!draftId) {
      return NextResponse.json(
        { error: 'Draft ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const existingDraft = drafts.get(draftId);

    if (!existingDraft) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      );
    }

    const updatedDraft = {
      ...existingDraft,
      ...data,
      updatedAt: new Date().toISOString()
    };

    drafts.set(draftId, updatedDraft);

    return NextResponse.json(updatedDraft);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update draft' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const draftId = searchParams.get('draftId');

  if (!draftId) {
    return NextResponse.json(
      { error: 'Draft ID is required' },
      { status: 400 }
    );
  }

  if (!drafts.has(draftId)) {
    return NextResponse.json(
      { error: 'Draft not found' },
      { status: 404 }
    );
  }

  drafts.delete(draftId);

  return NextResponse.json({ success: true });
}
