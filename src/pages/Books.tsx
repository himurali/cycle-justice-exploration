
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Wrench } from 'lucide-react';

const Books = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-justice-dark to-justice-blue/90 py-20 md:py-32 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-baskerville font-bold mb-6">
              Books for Cycling Advocates
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90 mb-12">
              Explore our curated collection of essential readings, academic works, and practical guides that inform and inspire the movement for more just, people-centered cities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/essential-books">
                <Button className="bg-white text-justice-blue hover:bg-gray-100">
                  Browse Essential Reading
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Book categories section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-baskerville font-semibold text-center mb-16">Our Book Collections</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Essential Books Card */}
              <Card className="bg-gray-50 border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-8 rounded-t-lg flex flex-col items-center">
                  <BookOpen className="h-12 w-12 mb-4" />
                  <CardTitle className="font-baskerville text-2xl">Essential Reading</CardTitle>
                  <CardDescription className="text-gray-200">Foundational texts</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="mb-6">
                    These foundational books provide compelling perspectives on cycling advocacy, urban transformation, 
                    and mobility justice. Essential for anyone interested in how cycling can create more equitable, 
                    sustainable cities.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="bg-gray-200 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                      <span>Strong theoretical foundations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-gray-200 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                      <span>Key advocacy concepts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-gray-200 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                      <span>Historical context</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-0 pb-6">
                  <Link to="/essential-books" className="w-full">
                    <Button className="w-full rounded-full bg-gray-900 hover:bg-black">
                      Browse Essential Books
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Academic Books Card */}
              <Card className="bg-gray-50 border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-8 rounded-t-lg flex flex-col items-center">
                  <GraduationCap className="h-12 w-12 mb-4" />
                  <CardTitle className="font-baskerville text-2xl">Academic Works</CardTitle>
                  <CardDescription className="text-gray-200">Research-based insights</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="mb-6">
                    Scholarly books examining cycling policy, infrastructure development, and social equity. 
                    These research-based works offer data-driven perspectives and theoretical frameworks 
                    for understanding urban mobility.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="bg-gray-200 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                      <span>Peer-reviewed research</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-gray-200 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                      <span>Case studies and empirical data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-gray-200 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                      <span>Theoretical frameworks</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-0 pb-6">
                  <Link to="/academic-books" className="w-full">
                    <Button className="w-full rounded-full bg-blue-800 hover:bg-blue-900">
                      Browse Academic Works
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Practical Books Card */}
              <Card className="bg-gray-50 border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-900 to-green-700 text-white py-8 rounded-t-lg flex flex-col items-center">
                  <Wrench className="h-12 w-12 mb-4" />
                  <CardTitle className="font-baskerville text-2xl">Practical Guides</CardTitle>
                  <CardDescription className="text-gray-200">Hands-on resources</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="mb-6">
                    Hands-on manuals for city planners, activists, and everyday cyclists. 
                    These books offer concrete strategies for building better bike infrastructure, 
                    advocating for change, and enjoying urban cycling.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="bg-gray-200 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                      <span>Step-by-step guidance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-gray-200 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                      <span>Implementation tactics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-gray-200 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                      <span>Best practices & examples</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-0 pb-6">
                  <Link to="/practical-books" className="w-full">
                    <Button className="w-full rounded-full bg-green-800 hover:bg-green-900">
                      Browse Practical Guides
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Reading impact section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-baskerville font-semibold mb-6">Why These Books Matter</h2>
              <p className="text-lg text-gray-700 mb-10">
                Our curated book collection bridges theory and practice, helping readers understand the 
                complex issues of urban mobility and providing the tools to advocate for change. 
                Whether you're a city planner, advocate, researcher, or concerned citizen, 
                these resources will empower you to create more just, people-centered streets.
              </p>
              <Link to="/essential-books">
                <Button className="bg-justice-blue hover:bg-justice-blue/90">
                  Start Your Reading Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
