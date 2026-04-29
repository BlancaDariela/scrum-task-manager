import { useEffect, useCallback } from "react";

export default function Toast({ mensaje, tipo, onCerrar }) {
  const handleCerrar = useCallback(() => {
    onCerrar();
  }, [onCerrar]);

  useEffect(() => {
    if (!mensaje) return;
    const t = setTimeout(handleCerrar, 3000);
    return () => clearTimeout(t);
  }, [mensaje, handleCerrar]);

  if (!mensaje) return null;

  const icono = tipo === "success" ? "✓" : "✕";

  return (
    <div className={`toast toast-${tipo}`}>
      <span style={{ fontWeight: 700 }}>{icono}</span>
      {mensaje}
    </div>
  );
}
