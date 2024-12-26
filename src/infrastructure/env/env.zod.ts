import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().default('local'),
  HTTP_PORT: z.coerce.number().optional().default(3000),
  PGHOST: z.coerce.string().default('localhost'),
  PGPORT: z.coerce.number().default(5432),
  PGUSER: z.coerce.string().default('spasibo'),
  PGPASSWORD: z.coerce.string().default('Qwerty123'),
  PGDATABASE: z.coerce.string().default('crm'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.coerce.string().default('secret'),
  EXPIRES_IN: z.coerce.string().default('1h'),
});

export type Env = z.infer<typeof envSchema>;
