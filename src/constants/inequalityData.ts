
import { ArrowDown, Heart, TreePine, Baby, Landmark, Users } from "lucide-react";

export interface InequalityData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Heart;
  color: string;
  stats: {
    label: string;
    value: string;
    context?: string;
  }[];
  imageUrl: string;
  bicycleSolution: string;
}

export const inequalityData: InequalityData[] = [
  {
    id: "health",
    title: "Health Inequities",
    subtitle: "A silent public health crisis",
    description: "India faces severe health inequities due to automobile-centric urban planning. Air pollution from vehicles leads to respiratory diseases, while lack of active transportation increases risks of obesity and cardiovascular conditions. These health burdens disproportionately affect vulnerable populations.",
    icon: Heart,
    color: "#ef4444",
    stats: [
      {
        label: "Premature deaths",
        value: "1.67M",
        context: "annual deaths in India attributed to air pollution"
      },
      {
        label: "Children affected",
        value: "8 in 10",
        context: "children in urban India breathe unsafe air"
      },
      {
        label: "Respiratory diseases",
        value: "+42%",
        context: "increase in respiratory conditions in high-traffic areas"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
    bicycleSolution: "Regular cycling reduces risk of cardiovascular disease by 46% and improves mental health while creating zero emissions."
  },
  {
    id: "environmental",
    title: "Environmental Inequities",
    subtitle: "Destroying our shared future",
    description: "India's reliance on cars worsens climate change, deforestation, and pollution. Vehicle emissions are a major contributor to greenhouse gases, while road construction destroys green spaces. Bicycle infrastructure requires significantly less space and produces zero emissions.",
    icon: TreePine,
    color: "#10b981",
    stats: [
      {
        label: "CO2 emissions",
        value: "300M tons",
        context: "annual CO2 from transportation in India"
      },
      {
        label: "Land use",
        value: "10×",
        context: "more land required for cars than bicycles"
      },
      {
        label: "Urban green space",
        value: "-18%",
        context: "reduction in major cities due to road expansion"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1972&auto=format&fit=crop",
    bicycleSolution: "Bicycles produce zero emissions and replacing just 20% of car trips could reduce CO2 emissions by 11% while preserving green spaces."
  },
  {
    id: "intergenerational",
    title: "Intergenerational Injustice",
    subtitle: "Burdening the next generation",
    description: "Children in India face worsening environmental and health conditions due to today's transportation choices. They inherit polluted cities, degraded infrastructure, and climate instability. Future generations bear the costs of our car-centric decisions without having a voice in making them.",
    icon: Baby,
    color: "#8b5cf6",
    stats: [
      {
        label: "Life expectancy",
        value: "-2.6 years",
        context: "reduction due to air pollution exposure"
      },
      {
        label: "Climate impact",
        value: "3×",
        context: "greater climate burden for today's children"
      },
      {
        label: "Safe play spaces",
        value: "-35%",
        context: "reduction in accessible outdoor spaces for children"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1516731415730-0c29380043f2?q=80&w=2070&auto=format&fit=crop",
    bicycleSolution: "Cycling infrastructure creates cleaner air and safer streets for future generations, building a sustainable legacy for children to inherit."
  },
  {
    id: "economic",
    title: "Economic Inequities",
    subtitle: "An unnecessary financial burden",
    description: "Car ownership in India is expensive, but poor public transport forces reliance on private vehicles. The costs of purchasing, maintaining, and fueling cars create significant financial strain. Meanwhile, lower-income communities often have the worst access to affordable transportation alternatives.",
    icon: ArrowDown,
    color: "#f59e0b",
    stats: [
      {
        label: "Transportation costs",
        value: "18-25%",
        context: "of household income spent on transportation"
      },
      {
        label: "Cost comparison",
        value: "₹50 vs ₹2",
        context: "daily cost of car vs. bicycle commuting"
      },
      {
        label: "Infrastructure investment",
        value: "1:12",
        context: "ratio of cycling to road infrastructure funding"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1636360264463-16fb4b699acd?q=80&w=2070&auto=format&fit=crop",
    bicycleSolution: "Bicycles cost just 1% of a car to purchase and maintain, saving households up to ₹1.3 lakh annually while providing reliable mobility."
  },
  {
    id: "political",
    title: "Political Inequities",
    subtitle: "Unequal representation in decisions",
    description: "Government policies heavily favor automobiles over sustainable alternatives. Decision-making around transportation infrastructure often excludes non-drivers and marginalized communities. Roads and highways receive the majority of funding while bicycle infrastructure is treated as an afterthought.",
    icon: Landmark,
    color: "#6366f1",
    stats: [
      {
        label: "Budget allocation",
        value: "<3%",
        context: "of transportation budget for cycling infrastructure"
      },
      {
        label: "Policy influence",
        value: "17:1",
        context: "ratio of car industry to cycling advocacy lobbying"
      },
      {
        label: "Public consultation",
        value: "26%",
        context: "of transportation plans include meaningful public input"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1444252455043-a895c95c2b8e?q=80&w=2069&auto=format&fit=crop",
    bicycleSolution: "Bicycle-friendly policies democratize mobility, giving voice and access to all citizens regardless of income or status."
  },
  {
    id: "social",
    title: "Social Inequities",
    subtitle: "Dividing communities and people",
    description: "Car-centric planning creates physical barriers between communities, reinforces social isolation, and limits access to opportunities. Roads often divide neighborhoods, while those without cars face mobility barriers that restrict access to jobs, education, and services.",
    icon: Users,
    color: "#ec4899",
    stats: [
      {
        label: "Community division",
        value: "72%",
        context: "of neighborhoods bisected by major roadways"
      },
      {
        label: "Social isolation",
        value: "+38%",
        context: "higher in car-dependent versus walkable areas"
      },
      {
        label: "Job access",
        value: "-45%",
        context: "reduced access to employment for non-drivers"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
    bicycleSolution: "Cycling creates connected communities, reduces isolation, and enables equal access to opportunities for all citizens."
  }
];
