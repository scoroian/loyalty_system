interface CustomerAchievement {
    id: number; // Identificador único del registro de logro
    customerId: number; // Referencia al cliente
    achievementId: number; // Referencia al logro desbloqueado
    dateUnlocked: Date; // Fecha en que se desbloqueó el logro
}
