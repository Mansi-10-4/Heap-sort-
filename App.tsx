
import React, { useState, useEffect } from 'react';
import { generateHeapSortSteps } from './utils/heapSortEngine';
import HierarchyMap from './components/HierarchyMap';
import CommandDeck from './components/CommandDeck';
import { Step } from './types';

const INITIAL_ARRAY = [42, 12, 89, 34, 5, 99, 67, 21, 56, 78, 11, 2];

const App: React.FC = () => {
  const [inputArray, setInputArray] = useState<number[]>(INITIAL_ARRAY);
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputValue, setInputValue] = useState(INITIAL_ARRAY.join(', '));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const newSteps = generateHeapSortSteps(inputArray);
    setSteps(newSteps);
    setStepIndex(0);
    setIsPlaying(false);
  }, [inputArray]);

  useEffect(() => {
    let timer: number;
    if (isPlaying && stepIndex < steps.length - 1) {
      timer = window.setTimeout(() => {
        setStepIndex(prev => prev + 1);
      }, 700);
    } else if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, steps.length]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) setStepIndex(prev => prev + 1);
  };

  const handleUndo = () => {
    if (stepIndex > 0) {
      setIsPlaying(false);
      setStepIndex(prev => prev - 1);
    }
  };

  const handleRedo = () => {
    if (stepIndex < steps.length - 1) setStepIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleRandomize = () => {
    const random = Array.from({ length: 12 }, () => Math.floor(Math.random() * 99) + 1);
    setInputArray(random);
    setInputValue(random.join(', '));
  };

  const handleManualInput = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = inputValue.split(',')
      .map(v => parseInt(v.trim()))
      .filter(v => !isNaN(v))
      .slice(0, 12);
    if (parsed.length > 0) setInputArray(parsed);
  };

  if (steps.length === 0) return null;

  return (
    <div className="h-screen w-screen border-[16px] border-[#111111] bg-[#F4F1EA] flex flex-col overflow-hidden select-none">
      <header className="h-[140px] border-b-[8px] border-[#111111] flex shrink-0">
        <div className="flex-1 flex items-center px-16 gap-12">
          <h1 className="text-6xl font-black italic tracking-tighter leading-none uppercase">Heap Sort.</h1>
          <div className="h-16 w-[2px] bg-[#111111] opacity-20" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-[#111111] text-white px-2 py-0.5">Laboratory_Specs</span>
            <div className="flex gap-6 text-[11px] font-bold italic opacity-70">
              <span>MODEL: MAX_HEAP</span>
              <span>BUFFER_TYPE: STATIC_ARRAY</span>
            </div>
          </div>
        </div>
        
        <div className="w-[420px] border-l-[8px] border-[#111111] bg-[#FFDC00] p-8 flex items-center gap-6">
          <form onSubmit={handleManualInput} className="flex-1 flex flex-col gap-2">
            <label className="text-[9px] font-black uppercase tracking-widest italic flex justify-between">
              <span>Input_Data_Stream</span>
              <span className="opacity-40">#001-012</span>
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-white border-[4px] border-[#111111] px-4 py-2 font-mono text-xs focus:outline-none focus:bg-[#F4F1EA] transition-colors"
              />
              <button type="submit" className="bg-[#111111] text-white px-4 text-[10px] font-bold uppercase hover:bg-[#003049]">SET</button>
            </div>
          </form>
          <button 
            onClick={handleRandomize}
            className="h-12 w-12 bg-[#003049] text-white border-[4px] border-[#111111] text-[10px] font-bold flex items-center justify-center hover:bg-[#E63946] transition-colors bauhaus-shadow-active"
            title="RANDOMIZE"
          >
            RND
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <section className="flex-1 relative">
          <HierarchyMap currentStep={steps[stepIndex]} hoverIndex={hoverIndex} />
        </section>

        <CommandDeck 
          currentStep={steps[stepIndex]}
          stepIndex={stepIndex}
          totalSteps={steps.length}
          onNext={handleRedo}
          onUndo={handleUndo}
          onReset={handleReset}
          onPlay={() => setIsPlaying(!isPlaying)}
          isPlaying={isPlaying}
          onHover={setHoverIndex}
        />
      </main>

      <footer className="h-12 border-t-[6px] border-[#111111] bg-[#111111] text-[#F4F1EA] flex items-center px-16 justify-between text-[11px] font-bold italic uppercase tracking-[0.3em]">
        <div className="flex gap-16">
          <div className="flex items-center gap-3">
             <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#FFDC00] animate-pulse' : 'bg-[#E63946]'}`} />
             <span>CORE: {isPlaying ? 'BUSY' : 'READY'}</span>
          </div>
          <span>ALGO_VER: 2.0.4</span>
        </div>
        <div className="bg-[#E63946] h-full px-12 flex items-center text-white not-italic font-black uppercase">
          By mansi patel
        </div>
      </footer>
    </div>
  );
};

export default App;
