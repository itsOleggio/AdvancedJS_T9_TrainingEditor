import type { ITraining } from "../../../../model/ITraining";
import { useState } from "react";

interface EditModalProps {
  item: ITraining;
  onSave: (updatedItem: ITraining) => void;
  onClose: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ item, onSave, onClose }) => {
  const [date, setDate] = useState(item.date);
  const [distance, setDistance] = useState(item.distance);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    
    const updatedItem: ITraining ={
      ...item,
      date,
      distance
    };
    onSave(updatedItem)
  }

  return (
    <div className="data-table">
      <form className="edit-modal form-group" onSubmit={handleSubmit}>
        <label htmlFor="edit-data">Дата</label>
        <input 
          type="text" 
          id="edit-data" 
          name="edit-data" 
          defaultValue = {date}
          onChange={(e) => setDate(e.target.value)} />

        <label htmlFor="edit-distance">Пройдено км</label>
        <input
          type="number"
          id="edit-distance"
          name="edit-distance"
          defaultValue={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
        />
        <button className="submit-btn" type="submit">
          Сохранить
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Отмена
        </button>
      </form>
    </div>
  );
};
