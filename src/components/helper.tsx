
//calculate years
export function calculateYearsDifference(startDate: Date, endDate: Date): number {
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffInYears);
  }


  //gets theme when entering website
export function getLiveTheme() {
    // Always fallback to 'emerald' if null
    const theme = localStorage.getItem("darkmode") ?? "emerald";
  
    document.documentElement.setAttribute("data-theme", theme);   
    document.documentElement.classList.toggle("dark", theme === "coffee");

    console.log(document.documentElement.getAttribute("data-theme"));
  }
  