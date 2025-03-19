
import { 
  Users, 
  Group, 
  ShieldX, 
  Rocket, 
  DollarSign,
  MapPin,
  Lightbulb,
  Building,
  Users2,
  HeartPulse,
  Leaf,
  Coins,
  Scale
} from "lucide-react";

export interface JusticeType {
  id: string;
  title: string;
  description: string;
  icon: typeof Users;
  cityExample: string;
  cityDescription: string;
  color: string;
  imageUrl: string;
  symbolism: string;
}

export interface BicycleJusticeImpactType {
  id: string;
  title: string;
  description: string;
  icon: typeof Users;
  color: string;
  imageUrl: string;
  steps: {
    title: string;
    description: string;
  }[];
  cityData?: {
    amsterdam?: string;
    copenhagen?: string;
    paris?: string;
  };
}

export const justiceTypes: JusticeType[] = [
  {
    id: "social",
    title: "Social Justice",
    description: "Creating equitable urban spaces through cycling infrastructure",
    icon: Users,
    cityExample: "Barcelona, Spain",
    cityDescription: "Barcelona's superblocks initiative has transformed neighborhoods by restricting car traffic and expanding public spaces for pedestrians and cyclists, creating more equitable access to urban space across social classes.",
    color: "#B22222", // Deep Red - Passion, activism, urgency
    imageUrl: "https://images.unsplash.com/photo-1559348349-86f1f65817fe?q=80&w=2070&auto=format&fit=crop",
    symbolism: "Equity & Inclusion"
  },
  {
    id: "collective",
    title: "Collective Justice",
    description: "Building community-driven change for better mobility",
    icon: Group,
    cityExample: "Copenhagen, Denmark",
    cityDescription: "Copenhagen's transformation into a cycling city was driven by grassroots movements demanding safer streets. Today, more than 40% of trips are made by bike with infrastructure designed based on community input.",
    color: "#4169E1", // Royal Blue - Unity, trust, collaboration
    imageUrl: "https://images.unsplash.com/photo-1533124436425-a9c6f384f199?q=80&w=2070&auto=format&fit=crop",
    symbolism: "Community Power"
  },
  {
    id: "retributive",
    title: "Retributive Justice",
    description: "Reclaiming streets from car-centric policies",
    icon: ShieldX,
    cityExample: "Paris, France",
    cityDescription: "Paris is actively removing 70,000 parking spaces and adding 180km of protected bike lanes, reclaiming public space previously dedicated to cars and returning it to people through cycling infrastructure.",
    color: "#8B0000", // Dark Crimson - Authority, consequence, accountability
    imageUrl: "https://images.unsplash.com/photo-1569955740643-05e1e9e89b74?q=80&w=2070&auto=format&fit=crop",
    symbolism: "Accountability & Rebalance"
  },
  {
    id: "transformative",
    title: "Transformative Justice",
    description: "Reinventing cities for sustainable transportation",
    icon: Rocket,
    cityExample: "Bogotá, Colombia",
    cityDescription: "Bogotá's transformation includes 550km of cycle paths, car-free Sundays (Ciclovía), and rapid transit integration, completely reimagining mobility in a previously congested city and reducing emissions by 40%.",
    color: "#800080", // Vibrant Purple - Change, empowerment, revolution
    imageUrl: "https://images.unsplash.com/photo-1595204375643-7fc87058d92a?q=80&w=2070&auto=format&fit=crop",
    symbolism: "Renewal & Innovation"
  },
  {
    id: "economic",
    title: "Economic Justice",
    description: "Expanding mobility access and economic opportunity",
    icon: DollarSign,
    cityExample: "Portland, USA",
    cityDescription: "Portland's investment in cycling infrastructure has led to $800 million in healthcare savings, reduced transportation costs for residents, and created a thriving bike economy with over 1,000 jobs in bicycle-related businesses.",
    color: "#FFD700", // Golden Yellow - Wealth distribution, equity, prosperity
    imageUrl: "https://images.unsplash.com/photo-1599939571322-792a11b2bba1?q=80&w=2070&auto=format&fit=crop",
    symbolism: "Prosperity & Accessibility"
  }
];

export const bicycleJusticeImpactTypes: BicycleJusticeImpactType[] = [
  {
    id: "social",
    title: "Social Justice",
    description: "Creating equitable infrastructure and accessibility for all communities",
    icon: Scale,
    color: "#B22222", // Deep Red
    imageUrl: "https://images.unsplash.com/photo-1559348349-86f1f65817fe?q=80&w=2070&auto=format&fit=crop",
    steps: [
      {
        title: "Fairness & Objectivity",
        description: "Equal access to cycling infrastructure for all communities"
      },
      {
        title: "Equality of Opportunity",
        description: "Safe, well-connected cycling lanes in all neighborhoods, not just affluent areas"
      },
      {
        title: "Policy Prioritization",
        description: "Policies that prioritize pedestrians and cyclists over cars"
      },
      {
        title: "Removal of Poverty & Freedom",
        description: "Affordable bike-sharing systems and subsidies for low-income groups"
      }
    ],
    cityData: {
      amsterdam: "80% of Amsterdam residents live within 300m of a cycling route, with bike-sharing costs as low as €0.20/hour",
      copenhagen: "Over 95% of Copenhageners have access to a bicycle, and bike lanes connect all socioeconomic districts equally",
      paris: "Paris has invested €250 million in making cycling accessible to all economic backgrounds, with subsidies up to €500 for e-bikes"
    }
  },
  {
    id: "environmental",
    title: "Environmental Justice",
    description: "Promoting green urban planning and sustainable environments",
    icon: Leaf,
    color: "#228B22", // Forest Green
    imageUrl: "https://images.unsplash.com/photo-1558383331-f520f2888351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    steps: [
      {
        title: "Conservation of Green Spaces",
        description: "Integration of cycling routes with parks, rivers, and eco-corridors"
      },
      {
        title: "Air & Noise Pollution Reduction",
        description: "Prioritizing cycling and public transport to cut carbon emissions"
      },
      {
        title: "Sustainable City Planning",
        description: "Car-free zones, climate-friendly urban spaces, and tree-lined cycling paths"
      },
      {
        title: "Climate Change Mitigation",
        description: "Reducing urban heat islands through green infrastructure alongside bike routes"
      }
    ],
    cityData: {
      amsterdam: "Amsterdam's cycling infrastructure has helped reduce CO2 emissions by 40,000 tons annually",
      copenhagen: "Copenhagen's bike routes have contributed to a 30% reduction in city noise levels and 20% less air pollution",
      paris: "Paris has created 30km of eco-corridors alongside bike paths, planting over 20,000 trees since 2018"
    }
  },
  {
    id: "economic",
    title: "Economic Justice",
    description: "Developing sustainable mobility economies that benefit all",
    icon: Coins,
    color: "#FFD700", // Golden Yellow
    imageUrl: "https://images.unsplash.com/photo-1599939571322-792a11b2bba1?q=80&w=2070&auto=format&fit=crop",
    steps: [
      {
        title: "Job Creation & Local Economy",
        description: "Bicycle repair hubs, local manufacturing, and cycling-based delivery services"
      },
      {
        title: "Affordable Transportation",
        description: "Lower transport costs for daily commuters using bicycles"
      },
      {
        title: "Mobility as Economic Equalizer",
        description: "Reducing dependence on expensive fuel-based transport options"
      },
      {
        title: "Infrastructure Investment",
        description: "Creating construction and maintenance jobs through cycling infrastructure development"
      }
    ],
    cityData: {
      amsterdam: "The cycling economy in Amsterdam contributes €700 million annually and supports over 14,000 jobs",
      copenhagen: "Copenhagen residents save an estimated €235 million yearly in healthcare costs through active cycling",
      paris: "Paris's cycling transformation has created over 4,500 direct jobs in bike services and infrastructure maintenance"
    }
  },
  {
    id: "health",
    title: "Health & Well-being Justice",
    description: "Promoting active lifestyles and improved public health through cycling",
    icon: HeartPulse,
    color: "#8A2BE2", // Blue Violet
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    steps: [
      {
        title: "Reducing Sedentary Lifestyles",
        description: "Encouraging cycling as a daily mode of transport and exercise"
      },
      {
        title: "Preventing Diseases",
        description: "Lowering risks of obesity, cardiovascular diseases, and stress-related illnesses"
      },
      {
        title: "Mental & Social Well-being",
        description: "Cycling builds community bonds, fights isolation, and promotes mental wellness"
      },
      {
        title: "Healthcare Cost Reduction",
        description: "Decreasing public health expenditure through active transportation"
      }
    ],
    cityData: {
      amsterdam: "Regular cyclists in Amsterdam have 41% lower mortality rates and live an average of 7 months longer",
      copenhagen: "Copenhagen's cycling culture has reduced healthcare costs by €230 million annually",
      paris: "Health benefits from Paris's cycling infrastructure save an estimated €167 million in annual healthcare costs"
    }
  }
];
