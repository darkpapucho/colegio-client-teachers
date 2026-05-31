export function formatListIndex(index: number): string {
  return index < 9 ? `0${index + 1}` : `${index + 1}`;
}

export function formatNombreCompletoForList(nombreCompleto: string): string {
  const [apellidos, nombres] = nombreCompleto.split(' ');
  const nombresSplit = nombres.split(' ');
  if (nombresSplit.length > 1) {
    return `${apellidos}, ${nombresSplit[0]} ${nombresSplit[1]}.`;
  } else {
    return nombreCompleto;
  }
}
