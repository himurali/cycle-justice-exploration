
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Stories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="section pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-baskerville font-medium mb-4">Justice Stories</h1>
              <p className="text-lg text-justice-text/80 max-w-3xl mx-auto">
                Explore stories of advocacy, transformation and community champions making streets safer for everyone.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="flex flex-col">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-baskerville mb-4">Advocate Stories</h2>
                  <p className="text-justice-text/70 mb-6">
                    Stories of individuals advocating for safer streets and urban justice.
                  </p>
                  <Link to="/advocate-stories">
                    <Button className="rounded-full bg-justice-dark hover:bg-black text-white text-sm gap-2">
                      Explore Advocate Stories
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="flex flex-col">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-baskerville mb-4">Transformation Stories</h2>
                  <p className="text-justice-text/70 mb-6">
                    Stories of cities and neighborhoods that have transformed to prioritize safer streets.
                  </p>
                  <Link to="/city-transformations">
                    <Button className="rounded-full bg-justice-dark hover:bg-black text-white text-sm gap-2">
                      Explore Transformation Stories
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="flex flex-col">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-baskerville mb-4">Community Champions</h2>
                  <p className="text-justice-text/70 mb-6">
                    Stories of community leaders and organizations championing for safer streets.
                  </p>
                  <Link to="/community-champions">
                    <Button className="rounded-full bg-justice-dark hover:bg-black text-white text-sm gap-2">
                      Explore Community Champions
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Stories;
