import { TeamMember } from '../types';

export interface ProjectMetadata {
  institution: string;
  faculty: string;
  department?: string;
  course: string;
  academicTerm?: string;
  title: string;
  subtitle?: string;
  date: string;
}

export const projectMetadata: ProjectMetadata = {
  institution: "Tecnológico de Estudios Superiores de Jocotitlán",
  faculty: "Ingeniería en Sistemas Computacionales",
  department: "División de Ingeniería en Sistemas Computacionales",
  course: "Estructuras de Datos",
  title: "Recursividad y sus Aplicaciones",
  subtitle: "Fundamentos Teóricos, Dinámica de Pila, Complejidad Asintótica y Modelado Gráfico Interactivo",
  date: "Octubre de 2026",
};

export const defaultTeamMembers: TeamMember[] = [
  {
    name: "Cesar Avila Octaviano",
    studentId: "ING-COMP-2026-0814",
  },
  {
    name: "Cristian Uriel Enriquez Romero",
    studentId: "ING-COMP-2026-0922",
  },
  {
    name: "Oliver Garcia Cruz",
    studentId: "ING-COMP-2026-1045",
  },
  {
    name: "Jaziel Rosales Dimas",
    studentId: "ING-COMP-2026-1045",
  },
  {
    name: "Ailin Michel Segundo Rodriguez",
    studentId: "ING-COMP-2026-1045",
  },
];
