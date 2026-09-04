// SqlTable.tsx
import React from "react";

export interface TableData {
	tableTitle: string;
	tableCol: Array<{ [key: string]: any }>;
	tableData: Array<Array<{ [key: string]: any }>>;
}

const SqlTable: React.FC<TableData> = ({ tableTitle, tableCol, tableData }) => {
	const convertObjectToKeyVal = (tableData: any) => {
		let tableDataArray = [];
		for (let i = 0; i < tableData.length; i++) {
			let row = [];
			for (let key in tableData[i]) {
				row.push({ key: key, value: Object.values(tableData[i][key]) });
			}
			tableDataArray.push(row);
		}
		return tableDataArray;
	};

	let tableDataArray = convertObjectToKeyVal(tableData);
	let tableDataCol = convertObjectToKeyVal(tableCol);

	// const convertToString = (concatenatedString: []): string => {
	// 	return concatenatedString.split("+").join("");
	// };
	return (
		<div className="sql-table">
			<div className="table-title">{tableTitle}</div>
			<table>
				<thead>
					<tr>
						{tableDataCol.map((col, colIndex) => (
							<th key={colIndex}>{col[0].value}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tableDataArray.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((col, colIndex) => (
								<td key={colIndex}>{col.value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SqlTable;
