
import { motion } from 'framer-motion';
import InstitutionsList from '@/components/InstitutionsList';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getAllInstitutions } from '@/lib/institutions';

export default function Institutions() {
  const institutions = getAllInstitutions();
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <InstitutionsList institutions={institutions} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
