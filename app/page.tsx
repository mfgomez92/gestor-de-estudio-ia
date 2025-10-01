import DashboardMaterias from '@/components/DashboardMaterias';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Gestor de Estudio con IA
        </h1>
        <p className="text-gray-600 mb-8">
          Tu centro de mando para organizar tus materias y generar planes de estudio personalizados.
        </p>
        <DashboardMaterias />
      </div>
    </main>
  );
}
