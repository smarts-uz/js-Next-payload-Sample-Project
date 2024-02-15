import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'

const  mockModulePath = path.resolve(__dirname,'mocks','emptyFunction.js')
export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_EXTERNAL_SERVER_URL || 'http://localhost:4000',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  cors:process.env.WHITELIST_ORIGINS ? process.env.WHITELIST_ORIGINS.split(','):[],
  csrf:process.env.WHITELIST_ORIGINS ? process.env.WHITELIST_ORIGINS.split(','):[],
  editor: slateEditor({}),
  collections: [Users],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
