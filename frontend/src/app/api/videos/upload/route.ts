import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const video = formData.get('video') as File;
    
    if (!video) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      );
    }

    // Get other form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const visibility = formData.get('visibility') as string;
    const category = formData.get('category') as string;
    const tags = formData.get('tags') as string;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Create unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${video.name}`;
    
    // Save video to uploads directory
    const bytes = await video.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'videos');
    await writeFile(join(uploadDir, filename), buffer);

    // Here you would typically:
    // 1. Save video metadata to database
    // 2. Start video processing (transcoding, thumbnail generation, etc.)
    // 3. Return the video ID and initial processing status

    // For now, we'll return a mock response
    return NextResponse.json({
      id: timestamp.toString(),
      title,
      description,
      visibility,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
      filename,
      status: 'processing',
      url: `/uploads/videos/${filename}`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    );
  }
}
