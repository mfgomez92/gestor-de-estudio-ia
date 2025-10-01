'use client';

import React, { useState, useEffect } from 'react';

// Interfaz para definir la estructura de una materia
interface Materia {
  id: string;
  nombre: string;
}

// Datos de ejemplo hasta que conectemos Firebase
const materiasDeEjemplo: Materia[] = [
  { id: '1', nombre: 'Cálculo Avanzado' },
  { id: '2', nombre: 'Álgebra Lineal' },
  { id: '3', nombre: 'Física II' },
];

// Componente para una tarjeta de materia individual
const TarjetaMateria = ({ materia }: { materia: Materia }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-bold text-gray-800">{materia.nombre}</h3>
    </div>
    <div className="mt-6 flex gap-2">
      {/* El enlace nos llevará al dashboard de la materia */}
      <a href={`/materia/${materia.id}`} className="flex-1 text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
        Ver
      </a>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Editar</button>
      <button className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors">Eliminar</button>
    </div>
  </div>
);


// Componente principal del Dashboard
export default function DashboardMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [cargando, setCargando] = useState(true);

  // useEffect se ejecutará cuando el componente se monte.
  // Aquí es donde haremos la llamada a nuestra API para obtener las materias.
  useEffect(() => {
    // Por ahora, usamos los datos de ejemplo después de un segundo.
    setTimeout(() => {
      setMaterias(materiasDeEjemplo);
      setCargando(false);
    }, 1000);
  }, []);

  if (cargando) {
    return <p className="text-center text-gray-500">Cargando materias...</p>;
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105">
          + Agregar Nueva Materia
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materias.map((materia) => (
          <TarjetaMateria key={materia.id} materia={materia} />
        ))}
      </div>
    </div>
  );
}
