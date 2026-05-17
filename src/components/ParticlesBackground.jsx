import { useCallback } from 'react';

import Particles from '@tsparticles/react';

import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground() {

  const particlesInit = useCallback(
    async engine => {
      await loadSlim(engine);
    },
    []
  );

  return (

    <Particles

      id="tsparticles"

      init={particlesInit}

      options={{

        fullScreen: {
          enable: true,
          zIndex: -1,
        },

        background: {
          color: '#020617',
        },

        particles: {

          number: {
            value: 50,
          },

          color: {
            value: '#06b6d4',
          },

          links: {
            enable: true,
            color: '#06b6d4',
            opacity: 0.2,
          },

          move: {
            enable: true,
            speed: 1,
          },

          opacity: {
            value: 0.3,
          },

          size: {
            value: {
              min: 1,
              max: 3,
            },
          },

        },

      }}

    />

  );
}