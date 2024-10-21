export const formatUsername = (name: string) => {
    return name.replace(/\s+/g, "").toLowerCase();
  };
  
  export const diffForHuman = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    const units = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];
  
    for (const { label, seconds } of units) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${label}${interval > 1 ? "s" : ""} ago`;
      }
    }
  
    return "just now"; // For very recent times
  };
  