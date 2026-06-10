export interface CampaignNode {
  id: string;
  prerequisite: string | null;
}

export interface CampaignEra {
  name: string;
  description: string;
  nodes: CampaignNode[];
}

export const CAMPAIGN_ERAS: CampaignEra[] = [
  {
    name: 'Ancient & Medieval',
    description: 'Face the greatest conquerors of the old world.',
    nodes: [
      { id: 'alexander-the-great', prerequisite: null },
      { id: 'chanakya', prerequisite: 'alexander-the-great' },
      { id: 'chandragupta-maurya', prerequisite: 'chanakya' },
      { id: 'emperor-ashoka', prerequisite: 'chandragupta-maurya' },
      { id: 'julius-caesar', prerequisite: 'emperor-ashoka' },
      { id: 'raja-raja-chola-i', prerequisite: 'julius-caesar' },
      { id: 'genghis-khan', prerequisite: 'raja-raja-chola-i' },
      { id: 'akbar-the-great', prerequisite: 'genghis-khan' },
      { id: 'chhatrapati-shivaji', prerequisite: 'akbar-the-great' },
    ]
  },
  {
    name: 'Industrial & Modern History',
    description: 'Challenge the visionaries of the 19th and 20th centuries.',
    nodes: [
      { id: 'napoleon-bonaparte', prerequisite: 'chhatrapati-shivaji' },
      { id: 'abraham-lincoln', prerequisite: 'napoleon-bonaparte' },
      { id: 'winston-churchill', prerequisite: 'abraham-lincoln' },
      { id: 'queen-elizabeth-ii', prerequisite: 'winston-churchill' },
      { id: 'nelson-mandela', prerequisite: 'queen-elizabeth-ii' },
    ]
  },
  {
    name: 'Modern Leaders',
    description: 'Match wits with the politicians of the 21st century.',
    nodes: [
      { id: 'donald-trump', prerequisite: 'nelson-mandela' },
      { id: 'vladimir-putin', prerequisite: 'donald-trump' },
      { id: 'narendra-modi', prerequisite: 'vladimir-putin' },
    ]
  },
  {
    name: 'Tech & Innovators',
    description: 'Challenge the visionaries who built the modern digital age.',
    nodes: [
      { id: 'elon-musk', prerequisite: 'narendra-modi' },
      { id: 'larry-page', prerequisite: 'elon-musk' },
    ]
  },
  {
    name: 'Chess Masters',
    description: 'The final frontier. Face the ultimate Grandmasters and content creators.',
    nodes: [
      { id: 'gotham-chess', prerequisite: 'larry-page' },
      { id: 'pragg', prerequisite: 'gotham-chess' },
      { id: 'magnus', prerequisite: 'pragg' },
    ]
  }
];

export function findUnlockedNodeId(completedNodeId: string): string | null {
  for (const era of CAMPAIGN_ERAS) {
    for (const node of era.nodes) {
      if (node.prerequisite === completedNodeId) {
        return node.id;
      }
    }
  }
  return null;
}
