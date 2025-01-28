import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// In a real app, this would be in a database
let posts = new Map();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = posts.get(params.id);

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = posts.get(params.id);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const tags = formData.get('tags') as string;
    const status = formData.get('status') as string;
    const coverImage = formData.get('coverImage') as File;

    // Process cover image if provided
    let imageUrl = post.coverImage;
    if (coverImage) {
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${coverImage.name}`;
      
      // Save image to uploads directory
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'blog');
      await writeFile(join(uploadDir, filename), buffer);
      
      imageUrl = `/uploads/blog/${filename}`;
    }

    const updatedPost = {
      ...post,
      title: title || post.title,
      content: content || post.content,
      excerpt: excerpt || post.excerpt,
      tags: tags || post.tags,
      status: status || post.status,
      coverImage: imageUrl,
      updatedAt: new Date().toISOString(),
      ...(status === 'published' && !post.publishedAt && {
        publishedAt: new Date().toISOString()
      })
    };

    posts.set(params.id, updatedPost);

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = posts.get(params.id);

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  posts.delete(params.id);

  return NextResponse.json({ success: true });
}
