export const validateCode = (code: string): string[] => {
  const errors: string[] = []

  if (code.includes('eval(')) {
    errors.push('⚠️ Do not use eval() for security reasons!')
  }

  if (!code.includes(';')) {
    errors.push('⚠️ Missing semicolons in code.')
  }

  return errors
}
