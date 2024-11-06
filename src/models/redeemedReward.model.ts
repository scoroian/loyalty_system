interface RedeemedReward {
    id: number; // Identificador único de la redención
    customerId: number; // Referencia al cliente que redimió la recompensa
    businessId: number; // Referencia al negocio que ofreció la recompensa
    rewardId: number; // Referencia a la recompensa redimida
    redemptionDate: Date; // Fecha y hora de la redención
}
