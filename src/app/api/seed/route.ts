import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({
        success: true,
        message: "Seed artık gerekli değil. Blog verileri statik olarak yüklendi."
    });
}
