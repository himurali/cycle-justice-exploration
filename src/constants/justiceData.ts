
import { 
  Users, 
  Group, 
  ShieldX, 
  Rocket, 
  DollarSign 
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
