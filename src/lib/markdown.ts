
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type StoryCategory = 'advocacy' | 'transformation' | 'community';

export interface StoryMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  category: StoryCategory;
  content: string;
  author?: string;
}

// Mock function to simulate server-side file system operations in the browser
export const getStories = (): StoryMeta[] => {
  // This is mock data that matches our Markdown files
  return [
    {
      slug: 'safe-streets-initiative',
      title: 'Safe Streets Initiative: A Community-Led Approach',
      date: '01-05-2023',
      excerpt: 'How a grassroots movement transformed urban planning priorities in Portland.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      category: 'advocacy',
      content: '# Safe Streets Initiative: A Community-Led Approach\n\nIn the spring of 2022, residents of Portland\'s East Side neighborhood were fed up with dangerous intersections and speeding cars that threatened pedestrians and cyclists daily. What began as informal conversations between neighbors quickly evolved into a powerful advocacy movement.\n\n"We kept seeing near-misses at the corner of 42nd and Belmont," explains Sarah Chen, who became one of the movement\'s organizers. "My child almost got hit while we were in the crosswalk, and that was the last straw."\n\nChen and a group of neighbors began documenting incidents, collecting data, and presenting their findings to city officials. They created a comprehensive safety proposal that included:\n\n- Reduced speed limits\n- Protected bike lanes\n- Pedestrian islands\n- Improved crosswalk visibility\n- Traffic calming measures\n\nAfter months of persistent advocacy, including attendance at every city council meeting, organizing community walks, and gathering over 3,000 signatures, the Safe Streets Initiative achieved remarkable success. The city approved a $2.3 million investment in safety improvements for the East Side, with construction beginning in early 2023.\n\n"What made this effort successful was the combination of passionate community members and hard data," notes Transportation Commissioner Marcus Williams. "They didn\'t just complain—they came with solutions."\n\nThe initiative has become a model for other neighborhoods in Portland and beyond, demonstrating how determined citizens can effect meaningful change in urban infrastructure and policy.'
    },
    {
      slug: 'bicycle-commuting-rights',
      title: 'Fighting for Bicycle Commuting Rights',
      date: '15-03-2023',
      excerpt: 'One lawyer\'s journey to establish legal protections for cycle commuters.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      category: 'advocacy',
      content: '# Fighting for Bicycle Commuting Rights\n\nWhen Maria Gonzalez began commuting by bicycle to her downtown law office in 2018, she quickly realized that cyclists operated in a precarious legal environment. After experiencing several close calls and witnessing a fellow cyclist\'s accident, Gonzalez decided to use her legal expertise to address these systemic issues.\n\n"The problem wasn\'t just infrastructure—it was that the legal system itself wasn\'t adequately protecting vulnerable road users," Gonzalez explains.\n\nOver the next three years, Gonzalez worked pro bono to establish precedent-setting cases that:\n\n- Clarified cyclists\' right-of-way at unmarked intersections\n- Established higher duty-of-care standards for motorists around cyclists\n- Created legal pathways for cyclists to seek damages for infrastructure-related injuries\n\nHer biggest victory came in 2022 with the landmark case of *Rodriguez v. City Transit Authority*, which established that public transit agencies must provide safe passage alternatives during construction projects that disrupt bicycle lanes.\n\n"Before this ruling, agencies could simply post a \'Bike Lane Closed\' sign with no alternative route," Gonzalez notes. "Now they have a legal obligation to maintain safe cycling routes during construction."\n\nGonzalez has since founded the Cycling Justice Project, which provides legal assistance to cyclists and advocates for stronger legal protections. Her work has directly influenced municipal policies in three major cities, with more considering similar reforms.\n\n"This is about recognizing that our transportation systems should protect all users, not just those in cars," says Gonzalez. "The law needs to catch up to that reality."'
    },
    {
      slug: 'amsterdam-lessons',
      title: 'Lessons from Amsterdam: How One City Transformed',
      date: '10-04-2023',
      excerpt: 'The remarkable story of Amsterdam\'s evolution from car-centric to cyclist paradise.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      category: 'transformation',
      content: '# Lessons from Amsterdam: How One City Transformed\n\nIn the 1970s, Amsterdam was following the same car-centric development path as many cities around the world. Streets were being widened, historic buildings demolished, and the city\'s famous canals filled in to make room for more automobiles. But a series of tragic accidents involving children led to one of the most remarkable urban transformations in modern history.\n\nThe "Stop de Kindermoord" (Stop the Child Murder) movement began in 1972 when journalist Vic Langenhoff, whose child was killed by a car, wrote a series of influential articles calling for safer streets. The movement gained tremendous public support, eventually changing not just infrastructure but Dutch culture itself.\n\n"What people often misunderstand about Amsterdam is that it wasn\'t always a cycling paradise," explains urban planner Johanna van der Meer. "This transformation was the result of deliberate policy choices and persistent citizen activism."\n\nKey elements of Amsterdam\'s transformation included:\n\n- Reducing car access to the historic center\n- Creating a comprehensive network of protected bike lanes\n- Implementing traffic calming in residential areas\n- Changing law to presume driver responsibility in car-bicycle accidents\n- Prioritizing bike parking at transit stations\n\nToday, Amsterdam boasts over 500 kilometers of cycle paths, and more than 60% of trips in the inner city are made by bicycle. The transformation has led to measurable improvements in air quality, public health, and quality of life.\n\n"The most important lesson from Amsterdam is that a city\'s character is not fixed," notes van der Meer. "With political will and citizen engagement, any city can transform itself, even after decades of car-centric development."'
    },
    {
      slug: 'bogota-ciclovia',
      title: 'Bogotá\'s Ciclovía: Reclaiming Streets for People',
      date: '20-02-2023',
      excerpt: 'How a weekly car-free event transformed urban mobility and public health in Colombia\'s capital.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      category: 'transformation',
      content: '# Bogotá\'s Ciclovía: Reclaiming Streets for People\n\nEvery Sunday and holiday in Bogotá, Colombia, a remarkable transformation takes place. More than 120 kilometers of city streets—normally dominated by cars and buses—become completely car-free from 7am to 2pm. This event, known as Ciclovía (Spanish for "cycleway"), attracts up to 1.7 million people each week to walk, cycle, dance, and exercise in public space normally dominated by motor vehicles.\n\nWhat began as a small demonstration in December 1974 has evolved into a nationwide phenomenon that has inspired similar programs in more than 100 cities around the world, from Los Angeles to Mexico City to Brussels.\n\n"Ciclovía wasn\'t just about creating recreational space—it was about democratizing our streets," explains Ricardo Montezuma, an urban mobility expert and historian of the program. "It helped people reimagine what our city could be."\n\nThe program gained significant momentum under Mayor Enrique Peñalosa (1998-2001, 2016-2019), who expanded Ciclovía as part of a broader transformation of Bogotá\'s transportation system. This included creating TransMilenio, a bus rapid transit system, and building an extensive network of permanent bicycle infrastructure.\n\nResearch has documented numerous benefits from Ciclovía:\n\n- Physical activity equivalent to 41% of weekly recommended exercise for participants\n- Significant air quality improvements during Ciclovía hours\n- Economic benefits for small vendors and businesses along the routes\n- Enhanced social cohesion across socioeconomic boundaries\n\nPerhaps most importantly, Ciclovía helped shift the culture and politics of transportation in Bogotá. What was once seen as radical is now a beloved institution that transcends political divisions.\n\n"Ciclovía shows us that transforming urban mobility isn\'t just about infrastructure—it\'s about creating experiences that change how people think about public space," Montezuma notes. "Once people experience streets as public spaces rather than just traffic corridors, it\'s hard to go back."'
    },
    {
      slug: 'youth-bike-program',
      title: 'Youth Bike Program Transforms Neighborhood Safety',
      date: '05-05-2023',
      excerpt: 'How a community bike shop became a catalyst for neighborhood transformation.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      category: 'community',
      content: '# Youth Bike Program Transforms Neighborhood Safety\n\nWhen Marcus Johnson opened a small community bike shop in Chicago\'s South Side in 2017, he had a modest goal: teach neighborhood kids basic bicycle repair skills while providing access to affordable transportation. Six years later, Wheelhouse Community Cycles has become a powerful force for neighborhood transformation.\n\n"We started with just a few bikes and some basic tools in a converted garage," Johnson recalls. "Now we\'ve helped over 2,000 youth learn mechanical skills, given away hundreds of bikes, and created safe cycling programs that have changed how people move through the neighborhood."\n\nThe shop\'s impact extends far beyond bicycles. By organizing youth-led neighborhood rides and safety patrols, Wheelhouse has helped reclaim public spaces that were previously avoided due to safety concerns. Parents report feeling more comfortable letting their children play outside, and local businesses have seen increased foot traffic.\n\n"The kids on bikes changed the dynamic completely," explains Latisha Williams, who owns a small café near the bike shop. "Before, people would just hurry through this area. Now they stop, they interact, they feel safe enough to hang out."\n\nKey aspects of the program include:\n\n- Free "earn-a-bike" programs where youth learn repair skills and earn a bicycle\n- Youth-led group rides that build confidence in navigating the city\n- Partnerships with schools for bicycle safety education\n- Community riding events that bring different neighborhoods together\n\nThe success has attracted attention from city officials, who are now working with Wheelhouse to design bike infrastructure improvements for the neighborhood.\n\n"What Marcus understood was that bikes aren\'t just transportation—they\'re tools for community building," notes Alderman Jamal Wilson. "The program has created young leaders who are now advocating for their neighborhood at city meetings."\n\nJohnson emphasizes that the community ownership is what makes the program sustainable. "This isn\'t my program anymore—it belongs to the kids and families who have made it their own. They\'re the ones who decided to use bicycles as a way to transform their neighborhood."'
    },
    {
      slug: 'elder-cycling-revolution',
      title: 'The Elder Cycling Revolution',
      date: '12-01-2023',
      excerpt: 'How seniors are leading the charge for age-friendly streets and mobility options.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      category: 'community',
      content: '# The Elder Cycling Revolution\n\nWhen 72-year-old Eleanor Washington started the "Silver Wheels" cycling group in her suburban community, she faced skepticism from neighbors and even her own family. "Everyone thought it was too dangerous for seniors to be cycling on these roads," Washington recalls. "But I knew the real danger was inactivity and isolation."\n\nThree years later, Silver Wheels boasts over 200 active members ranging in age from 65 to 93, and has become an influential voice in local transportation planning. The group has successfully advocated for:\n\n- Lower speed limits on key community corridors\n- Protected bike lanes connecting senior living facilities to community centers\n- More benches and rest areas along bicycle and pedestrian routes\n- Extended crossing times at key intersections\n\nTheir advocacy approach combines personal storytelling with data collection. Members systematically document hazards and barriers to mobility, creating detailed "age-friendly audits" of neighborhoods that have proven persuasive to local officials.\n\n"When we started bringing 20 seniors in matching t-shirts to city council meetings, they couldn\'t ignore us," laughs Washington. "We vote, we volunteer, we\'re organized—and we\'re persistent."\n\nHealth professionals have taken notice of the program\'s impact. Dr. Sarah Jennings, a geriatrician at the local medical center, has tracked improved health outcomes among Silver Wheels participants.\n\n"We\'re seeing significant improvements in cardiovascular health, balance, and cognitive function," notes Dr. Jennings. "But equally important are the mental health benefits from social connection and sense of purpose."\n\nThe program has inspired similar groups in neighboring communities, and Washington now offers workshops to help other seniors start their own cycling advocacy groups.\n\n"Streets that work well for seniors work well for everyone," Washington emphasizes. "When we design for the most vulnerable users, we create communities where people of all ages can thrive."'
    }
  ];
};

export const getStoryBySlug = (slug: string): StoryMeta | undefined => {
  const stories = getStories();
  return stories.find(story => story.slug === slug);
};

export const getStoriesByCategory = (category: StoryCategory): StoryMeta[] => {
  const stories = getStories();
  return stories
    .filter(story => story.category === category)
    .sort((a, b) => {
      // Parse the date strings (DD-MM-YYYY) and sort in descending order (newest first)
      const [aDay, aMonth, aYear] = a.date.split('-').map(Number);
      const [bDay, bMonth, bYear] = b.date.split('-').map(Number);
      
      // Compare years first
      if (aYear !== bYear) return bYear - aYear;
      // Then months
      if (aMonth !== bMonth) return bMonth - aMonth;
      // Then days
      return bDay - aDay;
    });
};
