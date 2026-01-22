import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight, Filter, Download, RefreshCcw, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  hideOnMobile?: boolean;
  priority?: "high" | "medium" | "low";
}

interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKey?: keyof T;
  filters?: FilterOption[];
  pageSize?: number;
  title?: string;
  actions?: React.ReactNode;
  onRefresh?: () => void;
  onExport?: () => void;
  mobileCardRender?: (row: T, index: number) => React.ReactNode;
}

export function DataTable<T extends object>({
  columns,
  data,
  emptyMessage = "কোনো ডেটা নেই",
  searchable = true,
  searchPlaceholder = "Search...",
  searchKey,
  filters = [],
  pageSize = 10,
  title,
  actions,
  onRefresh,
  onExport,
  mobileCardRender,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    let result = data;

    if (search && searchKey) {
      result = result.filter((row) => {
        const value = (row as Record<string, unknown>)[searchKey as string];
        return String(value).toLowerCase().includes(search.toLowerCase());
      });
    } else if (search) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    Object.entries(filterValues).forEach(([key, value]) => {
      if (value && value !== "all") {
        result = result.filter((row) => {
          const rowValue = (row as Record<string, unknown>)[key];
          return String(rowValue).toLowerCase() === value.toLowerCase();
        });
      }
    });

    return result;
  }, [data, search, searchKey, filterValues]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const visibleColumns = columns.filter((col) => !col.hideOnMobile);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4">
        {title && (
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <div className="flex items-center gap-2 lg:hidden">
              {onRefresh && (
                <Button variant="outline" size="icon" onClick={onRefresh} className="h-9 w-9">
                  <RefreshCcw className="w-4 h-4" />
                </Button>
              )}
              {onExport && (
                <Button variant="outline" size="icon" onClick={onExport} className="h-9 w-9">
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-11 bg-card border-border focus:border-primary focus:ring-primary/20 rounded-xl"
              />
            </div>
          )}

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {filters.map((filter) => (
              <Select
                key={filter.key}
                value={filterValues[filter.key] || "all"}
                onValueChange={(value) => handleFilterChange(filter.key, value)}
              >
                <SelectTrigger className="w-[120px] sm:w-[140px] h-11 bg-card border-border rounded-xl shrink-0">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

            <div className="hidden lg:flex items-center gap-2">
              {onRefresh && (
                <Button variant="outline" size="icon" onClick={onRefresh} className="h-11 w-11 rounded-xl">
                  <RefreshCcw className="w-4 h-4" />
                </Button>
              )}

              {onExport && (
                <Button variant="outline" onClick={onExport} className="h-11 gap-2 rounded-xl">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              )}
            </div>

            {actions}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      {mobileCardRender && (
        <div className="lg:hidden space-y-3">
          {paginatedData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border border-border">
              <div className="p-4 rounded-full bg-muted mb-4">
                <Search className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground">{emptyMessage}</p>
            </div>
          ) : (
            paginatedData.map((row, index) => mobileCardRender(row, index))
          )}
        </div>
      )}

      {/* Desktop Table View */}
      <div className={cn("rounded-2xl border border-border bg-card overflow-hidden shadow-soft", mobileCardRender && "hidden lg:block")}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/80 to-muted/40 hover:bg-muted/80 border-b-2 border-border">
                {(mobileCardRender ? columns : visibleColumns).map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={cn(
                      "font-bold text-foreground whitespace-nowrap py-4 first:pl-6 last:pr-6",
                      column.className,
                      column.hideOnMobile && !mobileCardRender && "hidden lg:table-cell"
                    )}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-16 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-full bg-muted">
                        <Search className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <p className="font-medium">{emptyMessage}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow
                    key={index}
                    className="group hover:bg-primary/5 transition-all duration-200 border-b border-border/50 last:border-0"
                  >
                    {(mobileCardRender ? columns : visibleColumns).map((column) => (
                      <TableCell 
                        key={String(column.key)} 
                        className={cn(
                          "py-4 first:pl-6 last:pr-6",
                          column.className,
                          column.hideOnMobile && !mobileCardRender && "hidden lg:table-cell"
                        )}
                      >
                        {column.render
                          ? column.render((row as Record<string, unknown>)[column.key as string], row)
                          : String((row as Record<string, unknown>)[column.key as string] ?? "")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border bg-muted/30">
            <p className="text-sm text-muted-foreground order-2 sm:order-1">
              Showing <span className="font-semibold text-foreground">{(currentPage - 1) * pageSize + 1}</span> to{" "}
              <span className="font-semibold text-foreground">{Math.min(currentPage * pageSize, filteredData.length)}</span> of{" "}
              <span className="font-semibold text-foreground">{filteredData.length}</span>
            </p>
            <div className="flex items-center gap-1 order-1 sm:order-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "h-9 w-9 rounded-lg font-semibold",
                        currentPage === pageNum && "shadow-md"
                      )}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 rounded-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Pagination */}
      {mobileCardRender && totalPages > 1 && (
        <div className="lg:hidden flex items-center justify-between gap-4 px-2 py-3">
          <p className="text-sm text-muted-foreground">
            Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-10 w-10 rounded-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-10 w-10 rounded-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected" | "completed";
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = {
    pending: { label: "Pending", className: "bg-warning/15 text-warning border-warning/30", dotColor: "bg-warning" },
    approved: { label: "Approved", className: "bg-success/15 text-success border-success/30", dotColor: "bg-success" },
    rejected: { label: "Rejected", className: "bg-destructive/15 text-destructive border-destructive/30", dotColor: "bg-destructive" },
    completed: { label: "Completed", className: "bg-success/15 text-success border-success/30", dotColor: "bg-success" },
  };

  const { label, className, dotColor } = config[status];

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-semibold border rounded-full gap-1.5",
        className,
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotColor)} />
      {label}
    </Badge>
  );
}

// Mobile Card Component for Transactions
interface TransactionCardProps {
  id: string;
  user: string;
  phone?: string;
  method: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
  type?: "withdrawal" | "deposit";
  accountNo?: string;
  transactionId?: string;
  actions?: React.ReactNode;
  index: number;
}

export function TransactionCard({
  id,
  user,
  phone,
  method,
  amount,
  status,
  date,
  type = "withdrawal",
  accountNo,
  transactionId,
  actions,
  index,
}: TransactionCardProps) {
  return (
    <div 
      className="bg-card rounded-2xl border border-border p-4 shadow-soft card-hover animate-fade-in-up animation-fill-forwards opacity-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-primary-foreground shrink-0",
            type === "withdrawal" ? "gradient-warning" : "gradient-success"
          )}>
            {user.charAt(0)}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground truncate">{user}</h4>
            {phone && <p className="text-sm text-muted-foreground">{phone}</p>}
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/50 rounded-xl p-3">
          <p className="text-xs text-muted-foreground mb-0.5">Amount</p>
          <p className={cn(
            "text-lg font-bold",
            type === "withdrawal" ? "text-destructive" : "text-success"
          )}>
            {type === "withdrawal" ? "-" : "+"}{amount}
          </p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3">
          <p className="text-xs text-muted-foreground mb-0.5">Method</p>
          <p className="font-semibold text-foreground">{method}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
        <span className="bg-muted px-2 py-1 rounded-lg font-mono">{id}</span>
        {accountNo && <span className="bg-muted px-2 py-1 rounded-lg font-mono">{accountNo}</span>}
        {transactionId && <span className="bg-muted px-2 py-1 rounded-lg font-mono">{transactionId}</span>}
        <span className="ml-auto">{date}</span>
      </div>

      {/* Actions */}
      {actions && (
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          {actions}
        </div>
      )}
    </div>
  );
}
