import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { findUnlockedNodeId } from '../data/campaign';

interface CampaignState {
  completedNodes: string[];
  lastUnlockedNodeId: string | null;
  completeNode: (nodeId: string) => void;
  clearLastUnlocked: () => void;
  isNodeUnlocked: (nodeId: string, prerequisiteId?: string | null) => boolean;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      completedNodes: [],
      lastUnlockedNodeId: null,

      completeNode: (nodeId: string) => {
        set((state) => {
          if (!state.completedNodes.includes(nodeId)) {
            const newlyUnlockedId = findUnlockedNodeId(nodeId);
            return {
              completedNodes: [...state.completedNodes, nodeId],
              lastUnlockedNodeId: newlyUnlockedId,
            };
          }
          return state;
        });
      },

      clearLastUnlocked: () => {
        set({ lastUnlockedNodeId: null });
      },

      isNodeUnlocked: (nodeId: string, prerequisiteId?: string | null) => {
        const { completedNodes } = get();
        if (!prerequisiteId) return true;
        return completedNodes.includes(prerequisiteId);
      }
    }),
    {
      name: 'checkora-campaign-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
