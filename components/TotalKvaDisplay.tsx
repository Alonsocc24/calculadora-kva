
import React from 'react';

interface TotalKvaDisplayProps {
    totalKva: number;
}

export const TotalKvaDisplay: React.FC<TotalKvaDisplayProps> = ({ totalKva }) => {
    const recommendedKva = Math.ceil(totalKva);

    return (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-gradient-to-t from-slate-900 to-slate-800 p-5 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.2)] text-white z-50">
            <div className="mx-auto max-w-5xl flex flex-col items-center justify-between gap-4 sm:flex-row">
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
