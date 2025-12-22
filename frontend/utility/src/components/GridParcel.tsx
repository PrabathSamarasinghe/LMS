import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

interface GridParcelProps {
  rowData: any[];
  colDefs: ColDef[];
  height?: string;
  paginationPageSize?: number;
  enableFiltering?: boolean;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
}

export type { GridParcelProps };

function GridParcel({
  rowData,
  colDefs,
  height = "600px",
  paginationPageSize = 10,
  enableFiltering = true,
  enableSorting = true,
  enableRowSelection = true,
}: GridParcelProps) {
  const [rows] = useState(rowData);
  const [columns] = useState<ColDef[]>(colDefs);
  const gridRef = React.useRef<any>(null);

  const defaultColDef: ColDef = {
    filter: enableFiltering,
    sortable: enableSorting,
    resizable: true,
    floatingFilter: false,
    wrapHeaderText: false,
    suppressHeaderMenuButton: !enableFiltering,
    cellStyle: {
      paddingLeft: "12px",
      paddingRight: "12px",
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <div 
      className="w-full bg-white rounded border border-blue-600 shadow-sm overflow-hidden flex flex-col ag-theme-alpine"
      style={{ height: height }}
    >
      <style>{`
        .ag-header-cell-text {
          font-weight: 600;
          font-size: 13px;
          color: #1a1a1a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ag-header-cell {
          padding: 10px 0;
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          height: 45px;
        }
        .ag-header-cell-text {
          padding: 0 12px;
        }
        .ag-row {
          border-bottom: 1px solid #e9ecef;
          height: 44px;
        }
        .ag-row:hover {
          background-color: #f0f7ff;
        }
        .ag-cell {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #495057;
          line-height: 1.4;
          overflow: hidden;
        }
        .ag-root .ag-paging-panel {
          height: auto;
          padding: 10px 20px;
          background-color: #f8f9fa;
          border-top: 1px solid #e9ecef;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        /* Filter menu styling */
        .ag-menu {
          background-color: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .ag-menu-option {
          padding: 8px 12px;
          color: #495057;
          cursor: pointer;
          font-size: 13px;
        }
        .ag-menu-option:hover {
          background-color: #e7f1ff;
          color: #007bff;
        }
        .ag-filter-toolpanel-header {
          font-weight: 600;
          color: #1a1a1a;
        }
        /* Filter input styling */
        .ag-input-text-wrapper input {
          border: 1px solid #dee2e6 !important;
          border-radius: 4px !important;
          padding: 6px 8px !important;
          font-size: 12px !important;
        }
        .ag-input-text-wrapper input:focus {
          border: 1px solid #007bff !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25) !important;
        }
        /* Column menu button - visible on hover */
        .ag-header-menu-button {
          opacity: 0.5;
          cursor: pointer;
          transition: opacity 0.2s, color 0.2s;
          color: #007bff;
          font-size: 16px;
          padding: 0 4px;
        }
        .ag-header-cell:hover .ag-header-menu-button {
          opacity: 1;
          color: #0056b3;
        }
        .ag-header-menu-button:hover {
          opacity: 1 !important;
        }
        /* Filter popup styling */
        .ag-menu {
          background-color: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          z-index: 1000;
        }
        .ag-menu-list {
          padding: 8px 0;
        }
        .ag-menu-option {
          padding: 10px 16px;
          color: #495057;
          cursor: pointer;
          font-size: 13px;
          transition: background-color 0.15s;
        }
        .ag-menu-option:hover {
          background-color: #e7f1ff;
          color: #007bff;
        }
        .ag-menu-option-active {
          background-color: #d4e4f7;
          color: #007bff;
        }
        /* Filter input styling */
        .ag-filter-value {
          padding: 8px 0;
        }
        .ag-input-text-wrapper input,
        .ag-input-text-wrapper select {
          border: 1px solid #dee2e6 !important;
          border-radius: 4px !important;
          padding: 6px 8px !important;
          font-size: 12px !important;
          background-color: #ffffff !important;
        }
        .ag-input-text-wrapper input:focus,
        .ag-input-text-wrapper select:focus {
          border: 1px solid #007bff !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25) !important;
        }
        .ag-filter-body {
          padding: 12px;
          background-color: #f8f9fa;
          border-top: 1px solid #dee2e6;
        }
      `}</style>
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={[5, 10, 15, 20, 50]}
        rowSelection={enableRowSelection ? "multiple" : undefined}
        suppressMovableColumns={false}
        enableCellTextSelection={true}
        headerHeight={45}
        rowHeight={48}
      />
    </div>
  );
}

export default GridParcel;

export async function mount(props: any) {
  ReactDOM.render(
    <GridParcel 
      rowData={props.rowData} 
      colDefs={props.colDefs}
      enableFiltering={props.enableFiltering !== false}
      enableSorting={props.enableSorting !== false}
      enableRowSelection={props.enableRowSelection !== false}
    />, 
    props.domElement
  );
}

export async function unmount(props: any) {
  ReactDOM.unmountComponentAtNode(props.domElement);
}
