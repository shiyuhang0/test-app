import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connect } from '@shiyuhang0/serverless-js'
import { ipAddress } from '@vercel/edge';
export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const ip = ipAddress(request) || 'unknown';
  console.log(ip)
  const conn = connect({url: process.env.TIDB_URL,useIpAddress: true})
  const tx = await conn.begin()
  await tx.execute('select * from test.test')
  // await tx.execute('insert into  test.test values (10,"t")')
  const result = await tx.execute('select * from test.test')
  await tx.rollback()
  return NextResponse.json(
      {result}
  );
}




