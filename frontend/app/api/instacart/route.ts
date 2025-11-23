import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const authHeader = request.headers.get('authorization');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (authHeader) {
      headers['authorization'] = authHeader;
    }

    const response = await fetch(`${API_URL}/api/instacart`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Instacart integration failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    const authHeader = request.headers.get('authorization');
    const headers: HeadersInit = {};
    if (authHeader) {
      headers['authorization'] = authHeader;
    }

    const url = `${API_URL}/api/instacart${queryString ? '?' + queryString : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get order status' },
      { status: 500 }
    );
  }
}
