import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, subDays, startOfWeek, addDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const ProgressTracker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Stomach Pain']);
  const [currentMood, setCurrentMood] = useState<string>('good');
  const [journalNotes, setJournalNotes] = useState<string>('');
  const [glutenFreeItems, setGlutenFreeItems] = useState({
    breakfast: true,
    lunch: true,
    dinner: false,
    snacks: false
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const today = new Date();
  const userId = 1; // Hard-coded for demo purposes

  // Weekly summary data fetch
  const { data: weeklySummary, isLoading: isWeeklySummaryLoading } = useQuery({
    queryKey: ['/api/health-logs/weekly-summary', userId],
    queryFn: async () => {
      // This would normally fetch from the API, but for demo purposes we'll return static data
      const startOfWeekDate = startOfWeek(today);
      const days = Array.from({ length: 7 }, (_, i) => {
        const date = addDays(startOfWeekDate, i);
        return {
          date,
          dayInitial: format(date, 'E')[0],
          isGlutenFree: Math.random() > 0.3 // Simulating some days being GF and others not
        };
      });
      
      return {
        daysGlutenFree: 5,
        totalDays: 7,
        percentage: 71,
        weekDays: days
      };
    }
  });

  // Today's log data fetch
  const { data: todayLog, isLoading: isTodayLogLoading } = useQuery({
    queryKey: ['/api/health-logs/user', userId, 'date', format(today, 'yyyy-MM-dd')],
    queryFn: async () => {
      // This would fetch the actual log for today
      return {
        mood: 'good',
        symptoms: ['Stomach Pain'],
        isGlutenFree: true,
        notes: '',
        mealChecks: {
          breakfast: true,
          lunch: true,
          dinner: false,
          snacks: false
        }
      };
    }
  });
  
  // Update state when todayLog changes
  useEffect(() => {
    if (todayLog) {
      setCurrentMood(todayLog.mood);
      setSelectedSymptoms(todayLog.symptoms || []);
      setJournalNotes(todayLog.notes || '');
      setGlutenFreeItems(todayLog.mealChecks);
    }
  }, [todayLog]);

  // Save log mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const logData = {
        userId,
        mood: currentMood,
        symptoms: selectedSymptoms,
        notes: journalNotes,
        isGlutenFree: Object.values(glutenFreeItems).some(v => v) // At least one meal was gluten-free
      };
      
      return await apiRequest('POST', '/api/health-logs', logData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/health-logs'] });
      toast({
        title: "Success",
        description: "Your progress has been saved!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem saving your progress. Please try again.",
        variant: "destructive"
      });
    }
  });

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const toggleGlutenFree = (meal: string) => {
    setGlutenFreeItems(prev => ({
      ...prev,
      [meal]: !prev[meal as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    saveMutation.mutate();
  };

  const moodOptions = [
    { value: 'bad', label: 'Bad', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="15" x2="16" y2="15"></line>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ) },
    { value: 'notGreat', label: 'Not Great', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="15" x2="16" y2="15"></line>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ) },
    { value: 'okay', label: 'OK', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="15" x2="16" y2="15"></line>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ) },
    { value: 'good', label: 'Good', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ) },
    { value: 'great', label: 'Great', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ) }
  ];

  const symptoms = [
    "Fatigue",
    "Headache",
    "Stomach Pain",
    "Bloating",
    "Skin Issues"
  ];

  // Add console log for debugging
  console.log("Rendering ProgressTracker component");
  
  return (
    <div className="pb-16 mb-16"> {/* Added mb-16 to ensure content doesn't get cut off by bottom nav */}
      <div className="px-4 py-3 bg-primary text-white sticky top-0 z-10">
        <h2 className="text-lg font-medium">Progress Tracker</h2>
        <p className="text-sm opacity-90">Monitor your gluten-free journey</p>
      </div>
      
      {/* Weekly Summary */}
      <section className="px-4 py-4 bg-indigo-50 border-b border-indigo-100">
        <h3 className="font-semibold text-gray-900 mb-2 text-lg">Weekly Summary</h3>
        {isWeeklySummaryLoading ? (
          <div className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded-full mb-3 mx-auto w-3/4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-6 bg-gray-200 rounded-full mb-4 mx-auto w-1/2"></div>
            <div className="grid grid-cols-7 gap-1 mt-4">
              {Array(7).fill(0).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded-full mt-1 w-3 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-center text-sm mb-3 text-gray-900 font-semibold">
              You went GF {weeklySummary?.daysGlutenFree}/{weeklySummary?.totalDays} days this week
            </p>
            <div className="h-2 bg-gray-200 rounded-full mb-3">
              <div 
                className="h-2 bg-primary rounded-full" 
                style={{ width: `${weeklySummary?.percentage || 0}%` }}
              ></div>
            </div>
            <p className="text-center text-primary font-semibold">You're doing great!</p>
            
            <div className="grid grid-cols-7 gap-1 mt-4">
              {weeklySummary?.weekDays.map((day, index) => (
                <div key={index} className="text-center">
                  <div className={`w-6 h-6 rounded-full ${day.isGlutenFree ? 'bg-primary text-white' : 'bg-red-500 text-white'} text-xs flex items-center justify-center mx-auto`}>
                    {day.isGlutenFree ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    )}
                  </div>
                  <p className="text-xs mt-1 text-gray-800 font-medium">{day.dayInitial}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Today's Tracker */}
      <section className="px-4 py-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-lg">Today's Log</h3>
        
        {/* Mood Tracker */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <h4 className="text-md font-semibold mb-3 text-gray-900">How are you feeling today?</h4>
          <div className="flex justify-between items-center">
            {moodOptions.map((mood) => (
              <button 
                key={mood.value}
                className="flex flex-col items-center"
                onClick={() => setCurrentMood(mood.value)}
              >
                <div className={`w-10 h-10 rounded-full ${currentMood === mood.value ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} flex items-center justify-center`}>
                  {mood.icon}
                </div>
                <span className={`text-xs mt-1 font-medium ${currentMood === mood.value ? 'text-primary' : 'text-gray-800'}`}>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Symptoms Tracker */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <h4 className="text-md font-semibold mb-3 text-gray-900">Symptoms</h4>
          <div className="grid grid-cols-2 gap-2">
            {symptoms.map((symptom) => (
              <button 
                key={symptom}
                className={`border ${selectedSymptoms.includes(symptom) ? 'border-primary bg-indigo-50 text-primary font-medium' : 'border-gray-200 text-gray-800 font-medium'} rounded-lg p-2 text-sm text-left`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </button>
            ))}
            <button 
              className="border border-gray-200 rounded-lg p-2 text-sm text-gray-800 font-medium text-left"
              onClick={() => toast({
                title: "Add Symptom", 
                description: "Custom symptom input would appear here"
              })}
            >
              + Add Symptom
            </button>
          </div>
        </div>
        
        {/* GF Adherence */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <h4 className="text-md font-semibold mb-3 text-gray-900">Gluten-Free Adherence</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="breakfast-check" 
                className="h-4 w-4 text-primary rounded"
                checked={glutenFreeItems.breakfast}
                onChange={() => toggleGlutenFree('breakfast')}
              />
              <label htmlFor="breakfast-check" className="ml-2 text-sm text-gray-800 font-medium">Breakfast was GF</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="lunch-check" 
                className="h-4 w-4 text-primary rounded"
                checked={glutenFreeItems.lunch}
                onChange={() => toggleGlutenFree('lunch')}
              />
              <label htmlFor="lunch-check" className="ml-2 text-sm text-gray-800 font-medium">Lunch was GF</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="dinner-check" 
                className="h-4 w-4 text-primary rounded"
                checked={glutenFreeItems.dinner}
                onChange={() => toggleGlutenFree('dinner')}
              />
              <label htmlFor="dinner-check" className="ml-2 text-sm text-gray-800 font-medium">Dinner was GF</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="snack-check" 
                className="h-4 w-4 text-primary rounded"
                checked={glutenFreeItems.snacks}
                onChange={() => toggleGlutenFree('snacks')}
              />
              <label htmlFor="snack-check" className="ml-2 text-sm text-gray-800 font-medium">Snacks were GF</label>
            </div>
          </div>
        </div>
        
        {/* Journal Notes */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <h4 className="text-md font-semibold mb-2 text-gray-900">Journal Notes</h4>
          <textarea 
            className="w-full border border-gray-200 rounded-lg p-3 text-sm" 
            rows={3} 
            placeholder="Any thoughts about today..."
            value={journalNotes}
            onChange={(e) => setJournalNotes(e.target.value)}
          ></textarea>
        </div>
        
        <button 
          className="w-full py-3 bg-primary text-white rounded-lg font-medium"
          onClick={handleSave}
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending ? 'Saving...' : 'Save Today\'s Log'}
        </button>
      </section>
    </div>
  );
};

export default ProgressTracker;
