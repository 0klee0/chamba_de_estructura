import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SectionDefinition } from './components/SectionDefinition';
import { SectionCharacteristics } from './components/SectionCharacteristics';
import { SectionApplications } from './components/SectionApplications';
import { SectionComplexity } from './components/SectionComplexity';
import { SimulatorsBlock } from './components/SimulatorsBlock';
import { SectionConclusion } from './components/SectionConclusion';
import { SectionReferences } from './components/SectionReferences';
import { Footer } from './components/Footer';
import { TeamModal } from './components/TeamModal';
import { ReadingModeWidget } from './components/ReadingModeWidget';
import { projectMetadata, defaultTeamMembers, ProjectMetadata } from './data/teamMembers';
import { TeamMember } from './types';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<ProjectMetadata>(projectMetadata);
  const [members, setMembers] = useState<TeamMember[]>(defaultTeamMembers);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#FBFBFB] dark:bg-[#0D0D0D] text-[#121212] dark:text-[#EAEAEA] selection:bg-[#121212] dark:selection:bg-white selection:text-white dark:selection:text-black flex flex-col font-sans transition-colors duration-200">
        
        {/* Formal Top Navigation Bar with Dark/Light Toggle */}
        <Navbar onOpenTeam={() => setIsTeamModalOpen(true)} />

        {/* Main Scholarly Document */}
        <main className="flex-1">
          
          {/* Academic Hero Section with Insignia & Authorship */}
          <Hero
            metadata={metadata}
            members={members}
            onOpenTeam={() => setIsTeamModalOpen(true)}
          />

          {/* Section 01: Formal Definition & Base/Recursive Cases */}
          <SectionDefinition />

          {/* Section 02: Theoretical Foundations & Call Stack Control */}
          <SectionCharacteristics />

          {/* Section 03: Recursive Procedures & Real-World Engineering Applications */}
          <SectionApplications />

          {/* Section 04: Computational Complexity & Big-O Master Matrix */}
          <SectionComplexity />

          {/* Section 05: The 4 Functional Interactive Simulators & Guide */}
          <SimulatorsBlock />

          {/* Section 06: Epilogue & Epistemological Conclusion */}
          <SectionConclusion />

          {/* Section 07: IEEE Standard Bibliographical References */}
          <SectionReferences />

        </main>

        {/* Institutional Colophon Footer */}
        <Footer
          metadata={metadata}
          onOpenTeam={() => setIsTeamModalOpen(true)}
        />

        {/* Authors & Academic Committee Modal */}
        <TeamModal
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          metadata={metadata}
          members={members}
        />

        {/* Floating Quick Reading Mode Widget (Day/Night & Key T shortcut) */}
        <ReadingModeWidget />

      </div>
    </ThemeProvider>
  );
}
