import { useEffect, useState } from "react";
import type { ITraining } from "./../../../../model/ITraining";
import { EditModal } from "../EditModal/EditModal";

type Props = {
  readonly records: ITraining[];
  readonly setRecords: React.Dispatch<React.SetStateAction<ITraining[]>>;
};

export function TableInfo({records, setRecords}: Props){
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ITraining | null>(null);

  useEffect(() => {
    localStorage.setItem("trainings", JSON.stringify(records));
  }, [records]);

  const filteredRecords = Object.values(
    records.reduce(
      (acc, item) => {
        acc[item.date] = acc[item.date]
          ? {
              ...acc[item.date],
              distance: acc[item.date].distance + item.distance,
            }
          : { ...item };
        return acc;
      },
      {} as Record<string, ITraining>,
    ),
  ).sort((a, b) => b.date.localeCompare(a.date))
  ;

  const handlerDelete = (item: ITraining): void => {
    setRecords((prev) => prev.filter((el) => el.date !== item.date));
  };

  const openEditModal = (item: ITraining): void => {
    setSelectedItem(item);
    setEditModal(true);
  };

  const handleSaveEdit = (updatedItem: ITraining) => {
    setRecords((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
    closeEditModal();
  };

  const closeEditModal = (): void => {
    setEditModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      {editModal && selectedItem && (
        <EditModal
          item={selectedItem}
          onSave={handleSaveEdit}
          onClose={closeEditModal}
        />
      )}

      <div className="data-table">
        <div className="table-header">
          <div className="col-date">Дата (ДД.ММ.ГГ)</div>
          <div className="col-distance">Пройдено км</div>
          <div className="col-actions">Действия</div>
        </div>

        <div className="table-body" id="tableBody">
          {filteredRecords.length === 0 ? (
            <div className="empty-state">Нет данных о тренировках</div>
          ) : (
            filteredRecords.map((item) => (
              <div key={item.id} className="table-row" data-date={item.date}>
                <div className="col-date">{item.date}</div>
                <div className="col-distance">{item.distance}</div>
                <div className="col-actions">
                  <button
                    className="action-btn edit-btn"
                    title="Редактировать"
                    onClick={() => openEditModal(item)}
                  >
                    ✎
                  </button>
                  <button
                    className="action-btn delete-btn"
                    title="Удалить"
                    onClick={() => handlerDelete(item)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
