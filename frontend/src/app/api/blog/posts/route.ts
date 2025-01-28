import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// In a real app, this would be in a database
let posts = new Map();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const tags = formData.get('tags') as string;
    const status = formData.get('status') as string;
    const coverImage = formData.get('coverImage') as File;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Process cover image if provided
    let imageUrl: string | null = null;
    if (coverImage) {
      const buffer = Buffer.from(await coverImage.arrayBuffer());
      
      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${coverImage.name}`;
      
      // Save image to uploads directory
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'blog');
      await writeFile(join(uploadDir, filename), buffer);
      
      imageUrl = `/uploads/blog/${filename}`;
    }

    const postId = Date.now().toString();
    const post = {
      id: postId,
      title,
      content,
      excerpt,
      tags,
      status,
      coverImage: imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(status === 'published' && { publishedAt: new Date().toISOString() })
    };

    posts.set(postId, post);

    return NextResponse.json(post);
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let filteredPosts = Array.from(posts.values());
  
  if (status) {
    filteredPosts = filteredPosts.filter(post => post.status === status);
  }

  return NextResponse.json(filteredPosts);
}
