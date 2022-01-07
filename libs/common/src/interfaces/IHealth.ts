import { HealthCheckResult } from '@nestjs/terminus';

interface IHealth {
  environment: string | null;
  health: HealthCheckResult;
  name: string | null;
  version: string | null;
}

export default IHealth;
