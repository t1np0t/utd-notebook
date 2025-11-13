import { NextResponse } from 'next/server';
import { db } from '@src/server/db';
import { file } from '@src/server/db/schema/file';
import { ilike } from 'drizzle-orm';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get('q') || '';
    // console.log(query);

    if (!query) {
      return NextResponse.json(
        { error: 'Missing search query parameter "q"' },
        { status: 400 }
      );
    }

    const files = await db.query.file.findMany({
        where: (file) => 
            ilike(file.fileTitle, `%${query}%`)
    });
    
    return NextResponse.json(
        { message: `Search: ${query}`, data: files},
        { status: 201 }
    );
}