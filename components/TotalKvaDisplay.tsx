import React from 'react';

interface TotalKvaDisplayProps {
    totalKva: number;
}

export const TotalKvaDisplay: React.FC<TotalKvaDisplayProps> = ({ totalKva }) => {
    const recommendedKva = Math.ceil(totalKva);

    return (
        <div className="w-full bg-slate-800 p-5 shadow-lg text-white rounded-xl">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                        Total kVA Requerido
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Recomendado: un generador de al menos <strong>{recommendedKva} kVA</strong>.
                    </p>
                </div>
                <div className="flex-shrink-0 rounded-lg bg-emerald-400 px-6 py-3 text-center shadow-md">
                    <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        {totalKva.toFixed(2)} kVA
                    </p>
                </div>
            </div>
        </div>
    );
};