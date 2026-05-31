export function isTelefono(value: string | null | undefined): boolean {
  if (!value) throw new Error('El campo teléfono es obligatorio');
  // Regex: Empieza con 9 y tiene exactamente 9 dígitos
  const regex = /^9\d{8}$/;
  if (!regex.test(value)) {
    throw new Error('Teléfono debe contener exactamente 9 dígitos');
  }
  return true;
}

export function isDni(value: string | null | undefined): boolean {
  if (!value) return true;
  const dniRegex = /^\d{8}$/;
  if (!dniRegex.test(value)) {
    throw new Error('DNI debe contener exactamente 8 dígitos');
  }
  return true;
}

export function isCorreo(value: string | null | undefined): boolean {
  if (!value) return true;
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(value)) {
    throw new Error('Correo no válido');
  }
  return true;
}

export function isNombreCompleto(value: string): boolean {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s\-]{3,}$/;
  if (!regex.test(value)) {
    throw new Error('Nombre completo no válido');
  }
  return true;
}
