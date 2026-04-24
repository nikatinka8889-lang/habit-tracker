import React from 'react'
import statCardCss from './StatCard.module.css'
export default function StatCard({information, nameCard, text}) {
  return (
    <div className={statCardCss.statCard}>
            <h3 className={statCardCss.statLabel}>{nameCard}</h3>
            <h2 className={statCardCss.statValue} style={{ color: '#68d391' }}>
                {information} {text}
            </h2>
        </div>
  )
}
