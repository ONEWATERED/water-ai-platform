import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const community = formData.get('community') as string;
    const tags = formData.get('tags') as string;
    const image = formData.get('image') as File;

    let imageUrl: string | null = null;

    // Validate required fields
    if (!title || !content || !community) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Process image if provided
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      
      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${image.name}`;
      
      // Save image to uploads directory
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'community');
      await writeFile(join(uploadDir, filename), buffer);
      
      imageUrl = `/uploads/community/${filename}`;
    }

    // Here you would typically:
    // 1. Save post data to database
    // 2. Process tags
    // 3. Handle notifications
    // 4. Update community stats

    // For now, return mock response
    const postId = Date.now().toString();

    return NextResponse.json({
      postId,
      title,
      content,
      community,
      tags: tags.split(',').map(tag => tag.trim()),
      imageUrl,
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
