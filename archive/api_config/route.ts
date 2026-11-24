import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Helper to copy user uploaded logos if available
async function syncUploadedBrandLogos(rootDir: string) {
  try {
    const uploadedDir = path.resolve(rootDir, '../../brain/4fe7d730-fa9f-4bad-a768-004898431a61/.user_uploaded');
    const brandDir = path.join(rootDir, 'public', 'images', 'brand');
    await fs.mkdir(brandDir, { recursive: true });

    // 1. El Mandara Real Estate company logo
    const mandaraSrc = path.join(uploadedDir, 'media_1795208929883_b9f085f5.jpg');
    const mandaraDest = path.join(brandDir, 'el-mandara-company-logo.png');
    try {
      await fs.access(mandaraSrc);
      await fs.copyFile(mandaraSrc, mandaraDest);
    } catch (_) {}

    // 2. Compound Golden View project logo
    const goldenViewSrc = path.join(uploadedDir, 'media_1795208914730_814da900.jpg');
    const goldenViewDest = path.join(brandDir, 'golden-view-compound-logo.jpg');
    try {
      await fs.access(goldenViewSrc);
      await fs.copyFile(goldenViewSrc, goldenViewDest);
    } catch (_) {}
  } catch (err) {
    // ignore if directory structure differs
  }
}

export async function GET() {
  try {
    const rootDir = process.cwd();
    await syncUploadedBrandLogos(rootDir);

    const configPath = path.join(rootDir, 'golden-view-config.json');
    const content = await fs.readFile(configPath, 'utf8');
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read configuration', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid configuration payload' },
        { status: 400 }
      );
    }

    if (!body.projectName || !Array.isArray(body.gallery)) {
      return NextResponse.json(
        { error: 'Missing required configuration fields (projectName, gallery)' },
        { status: 400 }
      );
    }

    const rootDir = process.cwd();
    await syncUploadedBrandLogos(rootDir);

    // 1. Write to golden-view-config.json
    const jsonPath = path.join(rootDir, 'golden-view-config.json');
    await fs.writeFile(jsonPath, JSON.stringify(body, null, 2), 'utf8');

    // 2. Write config override to a SEPARATE file (js/site-config-override.js)
    //    to avoid destroying the GoldenViewStorage IndexedDB engine in js/site-data.js
    const jsOverrideContent = `/**
 * Compound Golden View — CMS Configuration Override
 * Auto-saved by CMS Dashboard on ${new Date().toISOString()}
 * Loaded AFTER js/site-data.js to override initial config values only.
 * DO NOT merge storage engine code here.
 */
(function() {
  var _override = ${JSON.stringify(body, null, 2)};
  if (window.GOLDEN_VIEW_CONFIG && typeof window.GOLDEN_VIEW_CONFIG === 'object') {
    Object.assign(window.GOLDEN_VIEW_CONFIG, _override);
  } else {
    window.GOLDEN_VIEW_CONFIG = _override;
  }
})();
`;
    const jsOverridePath = path.join(rootDir, 'js', 'site-config-override.js');
    await fs.writeFile(jsOverridePath, jsOverrideContent, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'تم حفظ كافة الإعدادات والملفات بنجاح على الخادم والتخزين الدائم.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving configuration:', error);
    return NextResponse.json(
      { error: 'فشل حفظ الإعدادات على الخادم', details: String(error) },
      { status: 500 }
    );
  }
}
