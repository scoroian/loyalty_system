interface Achievement {
    id: number; // Identificador único del logro
    name: string; // Nombre del logro
    description: string; // Descripción del logro
    criteria: string; // Criterio para desbloquear el logro (ejemplo: "5 compras en un mes")
    pointsAwarded?: number; // Puntos adicionales otorgados al desbloquear el logro
    specialRewards?: string; // Recompensas especiales asociadas, si las hay
}
