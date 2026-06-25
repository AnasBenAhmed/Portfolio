import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects, getProjectBySlug, getAdjacentProjects } from '@/data/projects'
import PageTransition from '@/components/ui/PageTransition'
import ProjectDetailClient from '@/components/sections/ProjectDetailClient'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Anas Ben Ahmed`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <PageTransition>
      <ProjectDetailClient project={project} prev={prev} next={next} />
    </PageTransition>
  )
}
