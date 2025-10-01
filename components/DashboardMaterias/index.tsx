'use client';

import React, { useState, useEffect } from 'react';
// Importamos la configuración de nuestra base de datos
import { db } from '@/firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

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

const TarjetaMateria = ({ materia }: { materia: Materia }) => (
    // ... el código de la tarjeta no cambia ...
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300 flex flex-col justify-between">
        <div>
            <h3 className="text-xl font-bold text-gray-800">{materia.nombre}</h3>
        </div>
        <div className="mt-6 flex gap-2">
            <a href={`/materia/${materia.id}`} className="flex-1 text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Ver
            </a>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Editar</button>
            <button className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors">Eliminar</button>
        </div>
    </div>
);

export default function DashboardMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [estadoConexion, setEstadoConexion] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setMaterias(materiasDeEjemplo);
      setCargando(false);
    }, 1000);
  }, []);

  // --- NUEVA FUNCIÓN DE PRUEBA ---
  const probarConexionFirebase = async () => {
    setEstadoConexion("Probando conexión...");
    try {
      // Intentamos escribir un documento en una colección de prueba
      const testDocRef = doc(db, "test_collection", "test_doc");
      await setDoc(testDocRef, {
        mensaje: "¡Hola desde la app!",
        timestamp: serverTimestamp(),
      });
      setEstadoConexion("✅ ¡Conexión a Firebase exitosa!");
      
      // Ve a tu consola de Firestore y deberías ver una colección
      // llamada "test_collection" con este documento dentro.

    } catch (error) {
      console.error("Error al conectar con Firebase:", error);
      setEstadoConexion("❌ Error en la conexión. Revisa la consola para más detalles.");
    }
  };

  if (cargando) {
    return <p className="text-center text-gray-500">Cargando materias...</p>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-end items-center mb-6 gap-4">
        {/* --- NUEVO BOTÓN Y MENSAJE DE ESTADO --- */}
        <div className="flex items-center gap-4">
            {estadoConexion && <p className="text-sm text-gray-600 font-semibold">{estadoConexion}</p>}
            <button 
                onClick={probarConexionFirebase}
                className="px-5 py-2 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
            >
                Probar Conexión a Firebase
            </button>
        </div>
        <button className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105">
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

