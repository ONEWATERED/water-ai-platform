export interface Resource {
  title: string;
  url: string;
}

export interface Contributor {
  name: string;
  type: string;
  logo: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  additionalResources?: Resource[];
  contributor: Contributor;
  category: string;
}

export const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'What percentage of Earth\'s water is freshwater?',
    options: ['3%', '10%', '25%', '50%'],
    correctAnswer: '3%',
    explanation: 'Only about 3% of Earth\'s water is freshwater. Of this small percentage, about 2.5% is locked up in polar ice caps, glaciers, and deep groundwater, leaving only 0.5% easily accessible for human use.',
    contributor: {
      name: 'OneWater.AI',
      type: 'Organization',
      logo: '/logos/onewater.png'
    },
    category: 'General Water Knowledge'
  },
  {
    id: '2',
    question: 'Which technology is commonly used for real-time leak detection in water distribution systems?',
    options: [
      'Acoustic Sensors',
      'pH Meters',
      'Thermometers',
      'Barometers'
    ],
    correctAnswer: 'Acoustic Sensors',
    explanation: 'Acoustic sensors are widely used for leak detection as they can detect the unique sound frequencies produced by water escaping from pipes. This technology enables utilities to identify and locate leaks quickly, reducing water loss and infrastructure damage.',
    contributor: {
      name: 'EPA',
      type: 'Government Agency',
      logo: '/logos/epa.png'
    },
    category: 'Technology'
  },
  {
    id: '3',
    question: 'What is the primary purpose of a bioretention system?',
    options: [
      'Generate electricity',
      'Filter stormwater runoff',
      'Store drinking water',
      'Measure water quality'
    ],
    correctAnswer: 'Filter stormwater runoff',
    explanation: 'Bioretention systems are engineered to filter stormwater runoff through layers of vegetation, soil, and other natural materials. This process removes pollutants, reduces runoff volume, and helps recharge groundwater.',
    contributor: {
      name: 'Stanford University',
      type: 'Academic Institution',
      logo: '/logos/stanford.png'
    },
    category: 'Infrastructure'
  },
  {
    id: '4',
    question: 'What is the role of activated carbon in water treatment?',
    options: [
      'pH adjustment',
      'Contaminant adsorption',
      'Disinfection',
      'Hardness removal'
    ],
    correctAnswer: 'Contaminant adsorption',
    explanation: 'Activated carbon works through adsorption, where contaminants stick to its highly porous surface. It\'s particularly effective at removing organic compounds, chlorine, and compounds causing taste and odor issues.',
    contributor: {
      name: 'American Water Works Association',
      type: 'Professional Organization',
      logo: '/logos/awwa.png'
    },
    category: 'Treatment'
  },
  {
    id: '5',
    question: 'Which water quality parameter indicates the amount of dissolved oxygen in water?',
    options: ['DO', 'BOD', 'COD', 'TSS'],
    correctAnswer: 'DO',
    explanation: 'DO (Dissolved Oxygen) directly measures the amount of oxygen dissolved in water. It\'s crucial for aquatic life and is an important indicator of water quality and ecosystem health.',
    contributor: {
      name: 'USGS',
      type: 'Government Agency',
      logo: '/logos/usgs.png'
    },
    category: 'Water Quality'
  },
  // Add 20 more questions here...
];
