
export enum StepType {
  SELECT = 'SELECT',
  COMPARE = 'COMPARE',
  SWAP = 'SWAP',
  LOCKED = 'LOCKED',
  INITIAL = 'INITIAL'
}

export interface Step {
  type: StepType;
  indices: number[];
  array: number[];
  heapSize: number;
  description: string;
}

export interface NodePosition {
  x: number;
  y: number;
  id: number;
}

export interface NodeState {
  value: number;
  index: number;
  status: 'normal' | 'selected' | 'comparing' | 'swapping' | 'locked';
}
