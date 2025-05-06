import React from "react";

export interface Column<T> {
  // 테이블 컬럼 정의
  label: string;
  render: (item: T) => React.ReactNode;
}

interface TableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  pagination?: React.ReactNode;
}

const Table = <T extends { id: string | number }>({
  // 제네릭 함수형으로 선언
  data,
  columns,
  pagination,
}: TableProps<T>) => {
  return (
    <div className="w-full border border-gray-20 bg-white rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-red-10 text-black">
            {columns.map((col, idx) => {
              let widthClass = "w-1/4";
              if (idx === 1) widthClass = "w-2/5";
              if (idx === 2) widthClass = "w-1/6";
              if (idx === 3) widthClass = "w-1/6";

              return (
                <th
                  key={idx}
                  className={`${widthClass} p-4 text-left font-medium`}
                >
                  {col.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              item,
              index // 데이터를 순회하며 바디 생성
            ) => (
              <tr
                key={item.id}
                className={index !== data.length - 1 ? "border-b" : ""}
              >
                {columns.map((col, idx) => (
                  <td key={idx} className="p-4">
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
      {pagination && (
        <div className="p-4 border-t border-gray-20 flex justify-center">
          {pagination}
        </div>
      )}
    </div>
  );
};

export default Table;
