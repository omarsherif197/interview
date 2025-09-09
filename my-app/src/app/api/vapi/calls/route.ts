import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs';
import path from 'path';

const indexFile = path.join(process.cwd(), 'data/index.json');

export async function GET(request: NextRequest) {
    // Example: Get query parameters
    
    let index = {}
    try{
    const data = await fs.readFile(indexFile, 'utf-8');
    index = JSON.parse(data);
    } catch {}

    const calls = Object.values(index);
    return NextResponse.json({
      calls: calls,
    })

  }
    