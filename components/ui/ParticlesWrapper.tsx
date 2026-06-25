'use client'

import { Particles, ParticlesProvider, useParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine, ISourceOptions } from '@tsparticles/engine'

interface Props {
  id: string
  options: ISourceOptions
}

async function initEngine(engine: Engine) {
  await loadSlim(engine)
}

function ParticlesInner({ id, options }: Props) {
  const { loaded } = useParticlesProvider()
  if (!loaded) return null
  return (
    <Particles
      id={id}
      className="h-full w-full"
      options={options}
    />
  )
}

export default function ParticlesWrapper({ id, options }: Props) {
  return (
    <ParticlesProvider init={initEngine}>
      <ParticlesInner id={id} options={options} />
    </ParticlesProvider>
  )
}
