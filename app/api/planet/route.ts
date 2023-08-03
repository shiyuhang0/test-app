import { connect } from '@planetscale/database'
import {NextRequest, NextResponse} from "next/server";
import {ipAddress} from "@vercel/edge";
export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const config = {
    url: process.env['DATABASE_URL'] || 'mysql://user:pass@host'
  }
  const conn = connect(config)
  const results = await conn.transaction(async (tx) => {
    const r1 = await tx.execute('select * from test.user ')
    const r2 = await tx.execute('select * from test.user ')
    const r3 = await tx.execute('select * from test.user ')
    return [r1, r2,r3]
  })

  return NextResponse.json(
      {results}
  );
}
