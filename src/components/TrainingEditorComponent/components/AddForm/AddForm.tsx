import { useState } from "react";
import type { ITraining } from "../../../../model/ITraining";
import { v4 as uuidv4 } from 'uuid';

interface AddFormProps {
  readonly setRecords: React.Dispatch<React.SetStateAction<ITraining[]>>;
}

export function AddForm({ setRecords }:AddFormProps){
  const [date, setDate] = useState<string>('');
  const [distance, setDistance] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRecords(prev => [
      ...prev,
      { id: uuidv4(), date, distance }
    ]);
  };
  
  return (
    <div className="form-container">
      <form id="trainingForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="20.07.2019"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="distance">Пройдено км</label>
            <input
              type="number"
              id="distance"
              name="distance"
              placeholder="5.7"
              step="0.1"
              min="0"
              onChange={(e) => setDistance(Number.parseFloat(e.target.value))}
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            >
            OK
          </button>
        </div>
      </form>
    </div>
  );
}
