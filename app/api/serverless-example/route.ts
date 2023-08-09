import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connect } from '@shiyuhang0/serverless-js'
export const runtime = 'edge'

export async function GET(request: NextRequest) {

  const conn = connect({url: process.env.TIDB_URL})
  const tx = await conn.begin()
  await tx.execute('select * from test.test')
  const result = await tx.execute('select * from test.test')
  await tx.rollback()
  return NextResponse.json(
      {result}
  );
}




