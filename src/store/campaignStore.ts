import { create } from 'zustand';

interface CampaignState {
  completedNodes: string[]; // List of defeated boss IDs
  completeNode: (nodeId: string) => void;
  isNodeUnlocked: (nodeId: string, prerequisiteId?: string) => boolean;
}

export const useCampaignStore = create<CampaignState>((set, get) => ({
  completedNodes: [],

  completeNode: (nodeId: string) => {
    set((state) => {
      if (!state.completedNodes.includes(nodeId)) {
        return { completedNodes: [...state.completedNodes, nodeId] };
      }
      return state;
    });
  },

  isNodeUnlocked: (nodeId: string, prerequisiteId?: string) => {
    const { completedNodes } = get();
    // First node or no prerequisite means it's unlocked by default
    if (!prerequisiteId) return true;
    return completedNodes.includes(prerequisiteId);
  }
}));
