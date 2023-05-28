import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
