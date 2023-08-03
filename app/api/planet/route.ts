import { connect } from '@planetscale/database'

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
console.log(results)
