import { describe, it, expect } from 'vitest';
import { z } from 'zod';

import { handleZodError } from '@/helpers/error/zod-handler';

describe('handleZodError', () => {
  it('should format Zod validation errors correctly', () => {
    // Define a Zod schema
    const schema = z.object({
      name: z.string().min(3, 'Name must have at least 3 characters'),
      age: z.number().min(18, 'Age must be at least 18'),
    });

    // Validate invalid data to generate a ZodError
    const invalidData = { name: 'Jo', age: 16 };
    let error: z.ZodError | null = null;

    try {
      schema.parse(invalidData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        error = err;
      }
    }

    // Ensure the error is not null
    expect(error).not.toBeNull();

    // Use the function to handle the error
    const result = handleZodError(error!);

    // Check the expected results
    expect(result.errorTextReduce).toBe(
      'name: Name must have at least 3 characters, age: Age must be at least 18',
    );
    expect(result.errorList).toEqual([
      'name: Name must have at least 3 characters',
      'age: Age must be at least 18',
    ]);
  });

  it('should return empty strings if there are no errors', () => {
    // Create an empty ZodError
    const emptyError = new z.ZodError([]);

    // Use the function to handle the error
    const result = handleZodError(emptyError);

    // Check the expected results
    expect(result.errorTextReduce).toBe('');
    expect(result.errorList).toEqual([]);
  });
});
