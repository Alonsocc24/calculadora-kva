
import React, { useState, useMemo, useCallback } from 'react';
import { Tool } from './types';
import { ToolCard } from './components/ToolCard';
import { TotalKvaDisplay } from './components/TotalKvaDisplay';
import { PlusIcon } from './components/icons';

const initialTools: Tool[] = [
    {
        id: 1,
        name: 'Martillo demoledor',
        watts: 2000,
        startingFactor: 2.5,
        powerFactor: 0.85
    },
    {
        id: 2,
        name: 'Radial',
        watts: 1500,
        startingFactor: 2.0,
        powerFactor: 0.9
    }
];

const App: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>(initialTools);

    const handleAddTool = () => {
        const newTool: Tool = {
            id: Date.now(),
            name: 'Nueva Herramienta',
            watts: 1000,
            startingFactor: 1.5,
            powerFactor: 0.8
        };
        setTools(prevTools => [...prevTools, newTool]);
    };

    const handleRemoveTool = useCallback((id: number) => {
        setTools(prevTools => prevTools.filter(tool => tool.id !== id));
    }, []);

    const handleUpdateTool = useCallback((id: number, field: keyof Tool, value: string | number) => {
        setTools(prevTools => 
            prevTools.map(tool => 
                tool.id === id ? { ...tool, [field]: value } : tool
            )
        );
    }, []);

    const totalKva = useMemo(() => {
        return tools.reduce((total, tool) => {
            if (tool.powerFactor <= 0) return total;
            const kw = tool.watts / 1000;
            const kva = (kw * tool.startingFactor) / tool.powerFactor;
            return total + kva;
        }, 0);
    }, [tools]);

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <main className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 pb-40">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Calculadora de kVA para Generador
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                        Añade tus herramientas para calcular la potencia total que necesita tu generador. Ajusta los valores de cada una para obtener un cálculo preciso.
                    </p>
                </header>

                <div className="space-y-8">
                    {tools.map((tool, index) => (
                        <ToolCard 
                            key={tool.id}
                            tool={tool}
                            onUpdate={handleUpdateTool}
                            onRemove={handleRemoveTool}
                            index={index}
                        />
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={handleAddTool}
                        className="flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        <PlusIcon />
                        Añadir Herramienta
                    </button>
                </div>
                
                {tools.length > 0 && (
                    <div className="mt-12">
                         <TotalKvaDisplay totalKva={totalKva} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
