import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // Handle JSON payload with base64 dataUrl
    if (contentType.includes('application/json')) {
      const body = await request.json();
      const { filename, dataUrl, folder = 'project' } = body;

      if (!filename || !dataUrl) {
        return NextResponse.json(
          { error: 'Missing filename or dataUrl' },
          { status: 400 }
        );
      }

      // Extract base64 data
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return NextResponse.json(
          { error: 'Invalid data URL format' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(matches[2], 'base64');
      const safeFilename = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
      const targetDir = path.join(process.cwd(), 'public', 'images', folder);

      await fs.mkdir(targetDir, { recursive: true });
      const targetPath = path.join(targetDir, safeFilename);
      await fs.writeFile(targetPath, buffer);

      const publicUrl = `/images/${folder}/${safeFilename}`;
      return NextResponse.json({
        success: true,
        message: 'تم حفظ ملف الصورة بنجاح على الخادم',
        url: publicUrl,
        filename: safeFilename
      });
    }

    // Handle Multipart Form Data
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      const folder = (formData.get('folder') as string) || 'project';

      if (!file) {
        return NextResponse.json(
          { error: 'No file uploaded' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const safeFilename = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, '_');
      const targetDir = path.join(process.cwd(), 'public', 'images', folder);

      await fs.mkdir(targetDir, { recursive: true });
      const targetPath = path.join(targetDir, safeFilename);
      await fs.writeFile(targetPath, buffer);

      const publicUrl = `/images/${folder}/${safeFilename}`;
      return NextResponse.json({
        success: true,
        message: 'تم حفظ ملف الصورة بنجاح على الخادم',
        url: publicUrl,
        filename: safeFilename
      });
    }

    return NextResponse.json(
      { error: 'Unsupported Content-Type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      { error: 'فشل رفع وحفظ الصورة على الخادم', details: String(error) },
      { status: 500 }
    );
  }
}
