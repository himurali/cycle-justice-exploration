
import { Institution } from '@/components/InstitutionsList';

export const institutions: Institution[] = [
  {
    id: "1",
    name: "Dutch Cycling Embassy",
    location: "Delft, Netherlands",
    continent: "Europe",
    description: "A public-private network promoting Dutch cycling expertise and culture worldwide.",
    image: "/lovable-uploads/8bb974c8-6efd-4af4-b360-2593b4334372.png",
    website: "https://www.dutchcycling.nl/",
    researchAreas: ["Infrastructure Design", "Policy Development", "Urban Planning"],
    keyProjects: [
      {
        title: "ThinkBike Workshops",
        description: "International workshops bringing Dutch cycling expertise to cities worldwide."
      }
    ]
  },
  {
    id: "2",
    name: "Copenhagenize Design Co.",
    location: "Copenhagen, Denmark",
    continent: "Europe",
    description: "A design consultancy and research center focused on bicycle urbanism.",
    image: "/lovable-uploads/8bb974c8-6efd-4af4-b360-2593b4334372.png",
    website: "https://copenhagenize.eu/",
    researchAreas: ["Urban Design", "Bicycle Infrastructure", "Mobility Planning"],
    keyProjects: [
      {
        title: "Bicycle Friendly Cities Index",
        description: "Annual ranking of bicycle-friendly cities worldwide"
      }
    ]
  },
  {
    id: "3",
    name: "Transportation Alternatives",
    location: "New York, USA",
    continent: "North America",
    description: "Advocacy organization researching and promoting cycling and pedestrian infrastructure.",
    image: "/lovable-uploads/8bb974c8-6efd-4af4-b360-2593b4334372.png",
    website: "https://www.transalt.org/",
    researchAreas: ["Street Safety", "Policy Advocacy", "Urban Mobility"],
    keyProjects: [
      {
        title: "NYC 25x25",
        description: "Campaign to reclaim 25% of street space from cars by 2025"
      }
    ]
  },
  {
    id: "4",
    name: "Institute for Transportation and Development Policy",
    location: "New York, USA",
    continent: "North America",
    description: "Global organization working to promote sustainable and equitable transportation worldwide.",
    image: "/lovable-uploads/8bb974c8-6efd-4af4-b360-2593b4334372.png",
    website: "https://www.itdp.org/",
    researchAreas: ["Sustainable Transportation", "Bus Rapid Transit", "Cycling Infrastructure"],
    keyProjects: [
      {
        title: "Cycling Cities",
        description: "Comprehensive guide to implementing cycling infrastructure in urban areas"
      }
    ]
  },
  {
    id: "5",
    name: "C40 Cities",
    location: "London, UK",
    continent: "Europe",
    description: "Network of the world's megacities committed to addressing climate change.",
    image: "/lovable-uploads/8bb974c8-6efd-4af4-b360-2593b4334372.png",
    website: "https://www.c40.org/",
    researchAreas: ["Climate Action", "Sustainable Mobility", "Urban Planning"],
    keyProjects: [
      {
        title: "Green and Healthy Streets Declaration",
        description: "Initiative to procure only zero-emission buses and ensure major areas are zero-emission by 2030"
      }
    ]
  },
  {
    id: "6",
    name: "World Resources Institute",
    location: "Washington DC, USA",
    continent: "North America",
    description: "Global research organization developing practical solutions for sustainable urban transport.",
    image: "/lovable-uploads/8bb974c8-6efd-4af4-b360-2593b4334372.png",
    website: "https://www.wri.org/",
    researchAreas: ["Sustainable Cities", "Road Safety", "Climate Resilience"],
    keyProjects: [
      {
        title: "NUMO Alliance",
        description: "New Urban Mobility alliance channeling tech-based disruptions in urban transport"
      }
    ]
  },
  {
    id: "7",
    name: "Ricardo Mobility",
    location: "Shoreham-by-Sea, UK",
    continent: "Europe",
    description: "Global consultancy providing engineering solutions for sustainable transport.",
    image: "/lovable-uploads/8bb974c8-6efd-4af4-b360-2593b4334372.png",
    website: "https://ricardo.com/",
    researchAreas: ["Electrification", "Low Carbon Transport", "Connected Vehicles"],
    keyProjects: [
      {
        title: "Zero Emission Mobility",
        description: "End-to-end sustainable mobility solutions for cities and transport operators"
      }
    ]
  },
  {
    id: "8",
    name: "Tsinghua University Transport Research Center",
    location: "Beijing, China",
    continent: "Asia",
    description: "Leading academic center for transportation research in Asia.",
    image: "/lovable-uploads/8bb974c8-6efd-4af4-b360-2593b4334372.png",
    website: "https://www.tsinghua.edu.cn/en/",
    researchAreas: ["Intelligent Transportation", "Urban Mobility", "Transport Planning"],
    keyProjects: [
      {
        title: "Future Urban Mobility",
        description: "Research initiative on smart mobility technologies for Chinese megacities"
      }
    ]
  },
  {
    id: "9",
    name: "African Centre of Excellence for Studies in Public and Non-motorised Transport",
    location: "Cape Town, South Africa",
    continent: "Africa",
    description: "Research center focused on improving urban mobility in African cities.",
    image: "/lovable-uploads/8bb974c8-6efd-4af4-b360-2593b4334372.png",
    website: "http://www.acet-uct.org/",
    researchAreas: ["Non-motorized Transport", "Public Transport", "Transport Equity"],
    keyProjects: [
      {
        title: "Cycling in African Cities",
        description: "Study of cycling patterns and infrastructure needs in rapidly growing urban areas"
      }
    ]
  }
];

export function getAllInstitutions(): Institution[] {
  return institutions;
}

export function getInstitutionsByContinent(continent: string): Institution[] {
  if (continent === 'all') {
    return getAllInstitutions();
  }
  return institutions.filter(institution => institution.continent === continent);
}
