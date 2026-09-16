import { useState, useEffect } from 'react'
import { WeatherOptions, VisibilityOptions, type Diary, type NewDiary, 
        type WeatherOption, type VisibilityOption } from './types'
import diaryService from './services/diaryService.ts'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('');
  const [selectedWeather, setSelectedWeather] = useState<WeatherOption>(WeatherOptions.Sunny);
  const [selectedVisibility, setSelectedVisibility] = useState<VisibilityOption>(VisibilityOptions.Great);
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])
  
  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeather(event.target.value as WeatherOption);
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVisibility(event.target.value as VisibilityOption);
  };

  const addDiaryEntry = async (event: React.SyntheticEvent) => {    
    event.preventDefault();
    setErrorMessage(null);

    try {
      const newEntry: NewDiary = { 
        date: newDate, 
        weather: selectedWeather, 
        visibility: selectedVisibility, 
        comment: newComment
      };
      const newDiaryEntry = await diaryService.create(newEntry);
      
      setDiaries([...diaries, newDiaryEntry.data]);
      console.log(newDiaryEntry?.data);
      setNewDate('');
      setNewComment('');

    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(errMessage);
    }

  };


  return (
    <div>
      <div><h2>Add a new entry</h2></div>
      <div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={addDiaryEntry}>
          <div>
            <label htmlFor="date">Date:</label>
            <input 
              value={newDate} 
              name="date" 
              type="date" 
              placeholder="yyyy-mm-dd" 
              onChange={(event) => setNewDate(event.target.value)} />
          </div>
          <div>
            <label htmlFor="visibility">visibility:</label >
            {Object.values(VisibilityOptions).map((option) => (
              <label key={option} style={{ display: 'inline-block', margin: '5px 0' }}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={selectedVisibility === option}
                onChange={handleVisibilityChange}
              />
              {option}
              </label>
            ))}
          </div>

          <div>
            <label htmlFor="weather-title">weather:</label >
            {Object.values(WeatherOptions).map((option) => (
              <label key={option} style={{ display: 'inline-block', margin: '5px 0' }}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={selectedWeather === option}
                onChange={handleWeatherChange}
              />
              {option}
              </label>
            ))}
          </div>

          <div>       
            <label htmlFor="comment">Comment:</label>
            <input value={newComment} name="comment" onChange={(event) => setNewComment(event.target.value)} />
          </div> 
          <button type='submit'>add</button>
        </form>
      </div>

      <div>
       <div><h2>Diary Entries</h2></div>
       <div>
         {diaries.map((diary) => (
           <div key={diary.id}>
             <p><strong>{diary.date}</strong></p> 
             <p>visibility: {diary.visibility}<br/>
               weather: {diary.weather}
             </p>
           </div>
         ))}
       </div>
      </div>
    </div>
  )
}

export default App
