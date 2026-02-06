
import { Step, StepType } from '../types';

export function generateHeapSortSteps(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  const arr = [...inputArray];
  let heapSize = arr.length;

  const pushStep = (type: StepType, indices: number[], description: string) => {
    steps.push({
      type,
      indices,
      array: [...arr],
      heapSize,
      description: description.toUpperCase()
    });
  };

  pushStep(StepType.INITIAL, [], "PROTOCOL INITIATED: AWAITING COMMANDS");

  // Phase 1: Build Max Heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    maxHeapify(arr, arr.length, i, pushStep, () => heapSize);
  }

  // Phase 2: Extraction
  for (let i = arr.length - 1; i > 0; i--) {
    pushStep(StepType.SELECT, [0, i], `ACTION: ROOT EXTRACTION AT INDEX ${i}`);
    
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    
    pushStep(StepType.SWAP, [0, i], `KINETIC: VALUES SWAPPED`);
    
    heapSize--;
    pushStep(StepType.LOCKED, [i], `FINALIZED: NODE ${i} SECURED`);

    maxHeapify(arr, heapSize, 0, pushStep, () => heapSize);
  }

  heapSize = 0;
  pushStep(StepType.LOCKED, [0], `FINALIZED: CORE SECURED`);
  pushStep(StepType.INITIAL, [], "PROCESS COMPLETE: DATA STABILIZED");

  return steps;
}

function maxHeapify(
  arr: number[], 
  n: number, 
  i: number, 
  pushStep: (type: StepType, indices: number[], desc: string) => void,
  getHeapSize: () => number
) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  pushStep(StepType.SELECT, [i], `PROBE: ANALYZING NODE AT ADDR ${i}`);

  if (left < n) {
    pushStep(StepType.COMPARE, [i, left], `QUERY: COMPARE NODE ${i} VS CHILD ${left}`);
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    pushStep(StepType.COMPARE, [largest, right], `QUERY: COMPARE CURRENT PEAK VS CHILD ${right}`);
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    pushStep(StepType.SELECT, [i, largest], `KINETIC PREP: SWAP ADDR ${i} <> ${largest}`);
    const swapTemp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swapTemp;
    pushStep(StepType.SWAP, [i, largest], `SWAP EXECUTION COMPLETE`);

    maxHeapify(arr, n, largest, pushStep, getHeapSize);
  } else {
    pushStep(StepType.SELECT, [i], `STABLE: HEAP PROPERTY VERIFIED AT ADDR ${i}`);
  }
}
