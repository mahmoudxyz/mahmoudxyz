const calculateStreak = (intentions) => {
    if (!intentions.length) return 0;
  
    const today = startOfDay(new Date());
    const sortedIntentions = intentions
      .filter(i => i.completed)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  
    let streak = 0;
    let currentDate = today;
  
    for (const intention of sortedIntentions) {
      const intentionDate = startOfDay(new Date(intention.date));
      
      if (isSameDay(currentDate, intentionDate)) {
        streak++;
        currentDate = subDays(currentDate, 1);
      } else if (differenceInDays(currentDate, intentionDate) > 1) {
        break;
      }
    }
  
    return streak;
  };
  
  // Helper function to format dates consistently
  const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd');
  
  // Helper function to check if an intention was set today
  const hasIntentionForToday = (intentions) => {
    const today = formatDate(new Date());
    return intentions.some(intention => formatDate(intention.date) === today);
  };
  
  export { calculateStreak, formatDate, hasIntentionForToday };