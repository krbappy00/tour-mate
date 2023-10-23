
const { addMinutes, format, parse,formatDuration } = require("date-fns");
 
export function addMinutesToTime(time:any, duration:any) {
    try {
        // Ensure the time string is correctly formatted as "HH:mm"
        if (!/^\d{2}:\d{2}$/.test(time)) {
          throw new Error("Invalid time format");
        }
    
        // Parse the input time in HH:mm format
        const parsedTime = parse(time, "HH:mm", new Date());
    
        // Use the addMinutes function to add the specified duration
        const newTime = addMinutes(parsedTime, duration);
    
        // Format the new time back to HH:mm format
        const formattedTime = format(newTime, "HH:mm");
    
        return formattedTime;
      } catch (error:any) {
        console.error("Error calculating time:", error.message);
        return null; // Handle the error or return a default value as needed
      }
  }
export function formatDurationToHoursAndMinutes(seconds:any) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const second = Math.floor(seconds %= 60);
  
    const result = [];
    if (hours > 0) {
      result.push(`${hours}h`);
    }
    if (minutes > 0) {
      result.push(`${minutes}m`);
    }
    if (second > 0) {
      result.push(`${second}s`);
    }
  
    return result.join(' ');
  
  }