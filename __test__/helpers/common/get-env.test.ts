import { describe, it, expect, vi, beforeEach } from 'vitest';

import { getEnvValue } from '@/helpers/common/get-env';
import { devConsoleLog } from '@/helpers/common/dev-console-log';

// Mock del módulo devConsoleLog
vi.mock('@/helpers/common/dev-console-log', () => ({
  devConsoleLog: {
    log: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe('getEnvValue', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();

    process.env = { ...originalEnv };
  });

  it('should return the value of the environment variable if it exists', () => {
    process.env.TEST_VAR = 'testValue';

    const result = getEnvValue('TEST_VAR');

    expect(result).toBe('testValue');
    expect(devConsoleLog.warn).not.toHaveBeenCalled();
  });

  it('should return the default value if the environment variable does not exist', () => {
    const result = getEnvValue('NON_EXISTENT_VAR', 'defaultValue');

    expect(result).toBe('defaultValue');
    expect(devConsoleLog.warn).toHaveBeenCalledWith(
      'Environment variable not found: NON_EXISTENT_VAR, using default value: defaultValue',
    );
  });

  it('should throw an error if the environment variable does not exist and no default value is provided', () => {
    expect(() => getEnvValue('NON_EXISTENT_VAR')).toThrowError(
      'Environment variable not found: NON_EXISTENT_VAR',
    );

    expect(devConsoleLog.error).toHaveBeenCalledWith(
      'Environment variable not found: NON_EXISTENT_VAR',
    );
  });
});
