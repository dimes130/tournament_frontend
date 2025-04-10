
//calculate years
export function calculateYearsDifference(startDate: Date, endDate: Date): number {
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffInYears);
  }