interface MessageStats {
  totalCharacters: number;
  totalMessages: number;
  messagesPerDayAvg: number;
  messagesPerDayMax: number;
}

export interface DashboardTemplateProperties {
  messageStats: MessageStats;
  chartLabels: string[];
  chartValues: number[];
}
