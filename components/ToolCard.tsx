
import React from 'react';
import { Tool } from '../types';
import { TrashIcon } from './icons';

interface InputFieldProps {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    step?: string;
    min?: string;
    max?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text', step, min, max }) => (
    <div className="flex flex-col space-y-1.5">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            step={step}
            min={min}
            max={max}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
    </div>
);

interface ToolCardProps {
  tool: Tool;
  onUpdate: (id: number, field: keyof Tool, value: string | number) => void;
  onRemove: (id: number) => void;
  index: number;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onUpdate, onRemove, index }) => {
    const calculateKva = (t: Tool): number => {
        if (t.powerFactor <= 0) return 0;
        const kw = t.watts / 1000;
        const kva = (kw * t.startingFactor) / t.powerFactor;
        return kva;
    };

    const kva = calculateKva(tool);

    const handleInputChange = (field: keyof Tool) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = field === 'name' ? e.target.value : e.target.valueAsNumber || 0;
        onUpdate(tool.id, field, value);
    };

    return (
        <div className="relative animate-fade-in rounded-xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white shadow-lg">
                {index + 1}
            </div>
            <button
                onClick={() => onRemove(tool.id)}
                className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                aria-label="Eliminar herramienta"
            >
                <TrashIcon />
            </button>
            <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                <InputField 
                    label="Nombre de la Herramienta" 
                    value={tool.name} 
                    onChange={handleInputChange('name')}
                />
                <InputField 
                    label="Potencia (W)" 
                    value={tool.watts} 
                    onChange={handleInputChange('watts')}
                    type="number"
                    min="0"
                />
                <InputField 
                    label="Factor de Arranque" 
                    value={tool.startingFactor} 
                    onChange={handleInputChange('startingFactor')}
                    type="number"
                    step="0.1"
                    min="1"
                />
                <InputField 
                    label="Factor de Potencia" 
                    value={tool.powerFactor} 
                    onChange={handleInputChange('powerFactor')}
                    type="number"
                    step="0.01"
                    min="0.1"
                    max="1"
                />
            </div>
            <div className="mt-5 border-t border-slate-200 pt-4 text-right">
                <p className="text-lg font-semibold text-slate-700">
                    kVA para esta herramienta: <span className="font-bold text-blue-600">{kva.toFixed(2)} kVA</span>
                </p>
            </div>
        </div>
    );
};
