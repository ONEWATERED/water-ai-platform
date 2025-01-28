export interface Contributor {
  id: string;
  name: string;
  type: string;
  logo: string;
  questionsSubmitted: number;
  questionsApproved: number;
  badges: string[];
  recentQuestions?: string[];
}

export const topContributors: Contributor[] = [
  {
    id: '1',
    name: 'OneWater.AI',
    type: 'Organization',
    logo: '/logos/onewater.png',
    questionsSubmitted: 45,
    questionsApproved: 42,
    badges: ['Top Contributor', 'Expert', 'Pioneer'],
    recentQuestions: [
      'What percentage of Earth\'s water is freshwater?',
      'How does reverse osmosis work in water treatment?',
      'What is the role of coagulation in water treatment?'
    ]
  },
  {
    id: '2',
    name: 'EPA',
    type: 'Government Agency',
    logo: '/logos/epa.png',
    questionsSubmitted: 38,
    questionsApproved: 35,
    badges: ['Verified Agency', 'Quality Expert'],
    recentQuestions: [
      'Which technology is commonly used for real-time leak detection?',
      'What are the primary drinking water standards?',
      'How is water hardness measured?'
    ]
  },
  {
    id: '3',
    name: 'Stanford University',
    type: 'Academic Institution',
    logo: '/logos/stanford.png',
    questionsSubmitted: 32,
    questionsApproved: 30,
    badges: ['Research Excellence', 'Academic Leader'],
    recentQuestions: [
      'What is the primary purpose of a bioretention system?',
      'How do constructed wetlands treat water?',
      'What role do microorganisms play in wastewater treatment?'
    ]
  },
  {
    id: '4',
    name: 'American Water Works Association',
    type: 'Professional Organization',
    logo: '/logos/awwa.png',
    questionsSubmitted: 28,
    questionsApproved: 25,
    badges: ['Industry Expert', 'Knowledge Sharer'],
    recentQuestions: [
      'What is the role of activated carbon in water treatment?',
      'How are water distribution systems designed?',
      'What are common water quality indicators?'
    ]
  },
  {
    id: '5',
    name: 'USGS',
    type: 'Government Agency',
    logo: '/logos/usgs.png',
    questionsSubmitted: 25,
    questionsApproved: 23,
    badges: ['Data Expert', 'Research Contributor'],
    recentQuestions: [
      'Which water quality parameter indicates dissolved oxygen?',
      'How is streamflow measured?',
      'What factors affect groundwater recharge?'
    ]
  },
  {
    id: '6',
    name: 'MIT Water Innovation Lab',
    type: 'Research Institution',
    logo: '/logos/mit.png',
    questionsSubmitted: 22,
    questionsApproved: 20,
    badges: ['Innovation Leader', 'Tech Pioneer'],
    recentQuestions: [
      'How do smart meters detect leaks?',
      'What is the role of AI in water management?',
      'How can blockchain improve water trading?'
    ]
  }
];
