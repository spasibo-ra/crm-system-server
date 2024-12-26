import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Local = 'local',
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  HTTP_PORT: number;

  @IsString()
  PGHOST: string;

  @IsNumber()
  PGPORT: number;

  @IsString()
  PGUSER: string;

  @IsString()
  PGPASSWORD: string;

  @IsString()
  PGDATABASE: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  EXPIRES_IN: string;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validateConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validateConfig, { skipMissingProperties: false });

  if (errors.length > 0) throw new Error(errors.toString());

  return validateConfig;
}
