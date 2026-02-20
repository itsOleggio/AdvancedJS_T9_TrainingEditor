import { AddForm } from "./components/AddForm/AddForm";
import { TableInfo } from "./components/TableInfo/TableInfo";
import { useState, useEffect } from "react";
import type { ITraining } from "../../model/ITraining";

export function TrainingEditorComponent() {
  const [records, setRecords] = useState<ITraining[]>(() => {
    const saved = localStorage.getItem("trainings");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("trainings", JSON.stringify(records));
  }, [records]);

  return (
    <div className="container">
      <AddForm setRecords={setRecords} />
      <TableInfo records={records} setRecords={setRecords} />
    </div>
  );
}
