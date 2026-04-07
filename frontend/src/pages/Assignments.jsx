import React, { useState, useEffect } from 'react';
import { fetchAssignments } from '../services/api';
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  useReactTable 
} from '@tanstack/react-table';
import { Calendar, CheckCircle, Clock, MoreHorizontal, FileText } from 'lucide-react';
import { cn } from '../utils/utils';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => <span className="font-mono text-xs text-muted-foreground">{info.getValue()}</span>,
  }),
  columnHelper.accessor('title', {
    header: 'Assignment',
    cell: info => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <FileText size={20} />
        </div>
        <div>
          <p className="font-bold text-sm dark:text-white">{info.getValue()}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{info.row.original.course}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('dueDate', {
    header: 'Due Date',
    cell: info => (
      <div className="flex items-center gap-2 text-sm">
        <Calendar size={14} className="text-muted-foreground" />
        <span className="dark:text-slate-300">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      return (
        <div className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
          status === 'Submitted' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
          status === 'In Progress' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
          status === 'Graded' ? "bg-primary/10 text-primary dark:bg-primary/20" :
          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        )}>
          {status === 'Submitted' && <CheckCircle size={12} />}
          {status === 'In Progress' && <Clock size={12} />}
          {status}
        </div>
      );
    },
  }),
  columnHelper.accessor('grade', {
    header: 'Grade',
    cell: info => <span className="font-bold text-sm dark:text-white">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <button className="p-2 hover:bg-surface rounded-lg transition-colors dark:hover:bg-slate-800">
        <MoreHorizontal size={18} className="text-muted-foreground" />
      </button>
    ),
  }),
];

export function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const data = await fetchAssignments();
        setAssignments(data);
      } catch (error) {
        console.error('Failed to load assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  const table = useReactTable({
    data: assignments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold dark:text-white">Assignments</h2>
        <p className="text-muted-foreground mt-1 text-sm">Track your progress and upcoming deadlines</p>
      </div>

      <div className="bg-white rounded-3xl border border-border overflow-hidden dark:bg-slate-900 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-border dark:border-slate-800 bg-surface/50 dark:bg-slate-800/50">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider dark:text-slate-400">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border dark:divide-slate-800">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-surface/50 dark:hover:bg-slate-800/30 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-5 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-surface/30 dark:bg-slate-800/30 flex items-center justify-between border-t border-border dark:border-slate-800">
          <span className="text-xs text-muted-foreground font-medium">Showing {assignments.length} assignments</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold hover:bg-surface transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white">Previous</button>
            <button className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold hover:bg-surface transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
