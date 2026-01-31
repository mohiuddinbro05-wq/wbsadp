import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Calendar,
  User,
  FileText,
  AlertCircle,
  Ban,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

// Types
type RequestStatus = "pending" | "completed" | "rejected";
type RequestType =
  | "deposit"
  | "withdraw"
  | "account_ban"
  | "turnover"
  | "refer"
  | "bonus_package"
  | "others";
type BanDuration = "no" | "hours";
type UserRole = "admin" | "support" | "agent" | "moderator";

interface Request {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorRole: UserRole;
  targetUserId: string;
  requestType: RequestType;
  requestDetails: string;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  adminComment?: string;
  processedBy?: string;
  banDuration?: BanDuration;
  banHours?: number;
}

// Mock current user - In real app, this would come from auth
const currentUser = {
  id: "ADMIN001",
  name: "Admin User",
  role: "admin" as UserRole,
};

// Mock requests data
const initialRequests: Request[] = [
  {
    id: "REQ001",
    creatorId: "SUP001",
    creatorName: "Support Ali",
    creatorRole: "support",
    targetUserId: "USR12345",
    requestType: "deposit",
    requestDetails: "User claims deposit of 5000 BDT not credited",
    status: "pending",
    createdAt: new Date("2024-01-28T10:30:00"),
    updatedAt: new Date("2024-01-28T10:30:00"),
  },
  {
    id: "REQ002",
    creatorId: "AGT002",
    creatorName: "Agent Karim",
    creatorRole: "agent",
    targetUserId: "USR67890",
    requestType: "withdraw",
    requestDetails: "Urgent withdrawal request for 10000 BDT",
    status: "completed",
    createdAt: new Date("2024-01-27T14:20:00"),
    updatedAt: new Date("2024-01-28T09:15:00"),
    processedBy: "Admin User",
  },
  {
    id: "REQ003",
    creatorId: "MOD003",
    creatorName: "Moderator Rahim",
    creatorRole: "moderator",
    targetUserId: "USR11111",
    requestType: "account_ban",
    requestDetails: "User violating terms - multiple accounts detected",
    status: "rejected",
    createdAt: new Date("2024-01-26T16:45:00"),
    updatedAt: new Date("2024-01-27T11:30:00"),
    adminComment: "Insufficient evidence provided. Please submit proof of multiple accounts.",
    processedBy: "Admin User",
    banDuration: "no",
  },
  {
    id: "REQ004",
    creatorId: "SUP001",
    creatorName: "Support Ali",
    creatorRole: "support",
    targetUserId: "USR22222",
    requestType: "turnover",
    requestDetails: "User requesting turnover reduction from 50000 to 25000 BDT",
    status: "pending",
    createdAt: new Date("2024-01-28T08:00:00"),
    updatedAt: new Date("2024-01-28T08:00:00"),
  },
  {
    id: "REQ005",
    creatorId: "AGT002",
    creatorName: "Agent Karim",
    creatorRole: "agent",
    targetUserId: "USR33333",
    requestType: "bonus_package",
    requestDetails: "VIP user requesting special bonus package upgrade",
    status: "completed",
    createdAt: new Date("2024-01-25T12:00:00"),
    updatedAt: new Date("2024-01-26T10:00:00"),
    processedBy: "Admin User",
  },
  {
    id: "REQ006",
    creatorId: "SUP004",
    creatorName: "Support Fatima",
    creatorRole: "support",
    targetUserId: "USR44444",
    requestType: "refer",
    requestDetails: "Referral bonus not credited for 3 successful referrals",
    status: "pending",
    createdAt: new Date("2024-01-28T11:15:00"),
    updatedAt: new Date("2024-01-28T11:15:00"),
  },
];

const requestTypeLabels: Record<RequestType, string> = {
  deposit: "Deposit",
  withdraw: "Withdraw",
  account_ban: "Account Ban",
  turnover: "Turnover",
  refer: "Refer",
  bonus_package: "Bonus / Package",
  others: "Others",
};

const requestTypeColors: Record<RequestType, string> = {
  deposit: "bg-green-500/10 text-green-600 border-green-500/20",
  withdraw: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  account_ban: "bg-red-500/10 text-red-600 border-red-500/20",
  turnover: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  refer: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  bonus_package: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  others: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

const statusConfig: Record<RequestStatus, { label: string; icon: React.ComponentType<any>; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-500/10 text-red-600 border-red-500/20" },
};

export default function Requests() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<RequestType | "all">("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);

  // New request form state
  const [newRequest, setNewRequest] = useState({
    targetUserId: "",
    requestType: "" as RequestType | "",
    requestDetails: "",
    banDuration: "no" as BanDuration,
    banHours: 0,
  });

  // Process request state
  const [processAction, setProcessAction] = useState<"completed" | "rejected">("completed");
  const [rejectReason, setRejectReason] = useState("");

  // Filter requests based on user role
  const getVisibleRequests = () => {
    if (currentUser.role === "admin") {
      return requests;
    }
    return requests.filter((req) => req.creatorId === currentUser.id);
  };

  const filteredRequests = getVisibleRequests().filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.targetUserId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.creatorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesType = typeFilter === "all" || request.requestType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: getVisibleRequests().length,
    pending: getVisibleRequests().filter((r) => r.status === "pending").length,
    completed: getVisibleRequests().filter((r) => r.status === "completed").length,
    rejected: getVisibleRequests().filter((r) => r.status === "rejected").length,
  };

  const handleCreateRequest = () => {
    if (!newRequest.targetUserId || !newRequest.requestType) {
      toast.error("Target User ID and Request Type are required");
      return;
    }

    const request: Request = {
      id: `REQ${String(requests.length + 1).padStart(3, "0")}`,
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      creatorRole: currentUser.role,
      targetUserId: newRequest.targetUserId,
      requestType: newRequest.requestType,
      requestDetails: newRequest.requestDetails,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      banDuration: newRequest.requestType === "account_ban" ? newRequest.banDuration : undefined,
      banHours: newRequest.requestType === "account_ban" && newRequest.banDuration === "hours" ? newRequest.banHours : undefined,
    };

    setRequests([request, ...requests]);
    setNewRequest({
      targetUserId: "",
      requestType: "",
      requestDetails: "",
      banDuration: "no",
      banHours: 0,
    });
    setIsCreateOpen(false);
    toast.success("Request created successfully");
  };

  const handleProcessRequest = () => {
    if (!selectedRequest) return;

    if (processAction === "rejected" && !rejectReason.trim()) {
      toast.error("Reason is required for rejection");
      return;
    }

    setRequests(
      requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: processAction,
              updatedAt: new Date(),
              processedBy: currentUser.name,
              adminComment: processAction === "rejected" ? rejectReason : undefined,
            }
          : req
      )
    );

    setIsProcessOpen(false);
    setSelectedRequest(null);
    setRejectReason("");
    toast.success(`Request ${processAction === "completed" ? "completed" : "rejected"} successfully`);
  };

  const RequestCard = ({ request }: { request: Request }) => {
    const StatusIcon = statusConfig[request.status].icon;

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0 space-y-2">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-semibold text-primary">{request.id}</span>
                <Badge variant="outline" className={requestTypeColors[request.requestType]}>
                  {requestTypeLabels[request.requestType]}
                </Badge>
                <Badge variant="outline" className={statusConfig[request.status].color}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig[request.status].label}
                </Badge>
              </div>

              {/* Target User */}
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Target:</span>
                <span className="font-medium">{request.targetUserId}</span>
              </div>

              {/* Details Preview */}
              {request.requestDetails && (
                <p className="text-sm text-muted-foreground line-clamp-2">{request.requestDetails}</p>
              )}

              {/* Ban Duration if applicable */}
              {request.requestType === "account_ban" && request.banDuration && (
                <div className="flex items-center gap-2 text-sm">
                  <Ban className="w-4 h-4 text-red-500" />
                  <span className="text-muted-foreground">Ban Duration:</span>
                  <span className="font-medium text-red-600">
                    {request.banDuration === "no" ? "Until Admin Approval" : `${request.banHours} Hours (Auto Unban)`}
                  </span>
                </div>
              )}

              {/* Admin Comment for Rejected */}
              {request.status === "rejected" && request.adminComment && (
                <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-2 border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-400">{request.adminComment}</p>
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {request.creatorName} ({request.creatorRole})
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(request.createdAt, "dd MMM yyyy, hh:mm a")}
                </span>
                {request.processedBy && (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Processed by: {request.processedBy}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedRequest(request);
                  setIsViewOpen(true);
                }}
              >
                <Eye className="w-4 h-4" />
                <span className="sm:hidden ml-1">View</span>
              </Button>
              {currentUser.role === "admin" && request.status === "pending" && (
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedRequest(request);
                    setProcessAction("completed");
                    setRejectReason("");
                    setIsProcessOpen(true);
                  }}
                >
                  <FileText className="w-4 h-4" />
                  <span className="sm:hidden ml-1">Process</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <AdminLayout title="Request Management">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{stats.total}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{stats.pending}</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">{stats.completed}</p>
                  <p className="text-xs text-green-600 dark:text-green-500">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-400">{stats.rejected}</p>
                  <p className="text-xs text-red-600 dark:text-red-500">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, User ID, Creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as RequestStatus | "all")}>
              <SelectTrigger className="w-[140px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as RequestType | "all")}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(requestTypeLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Request</DialogTitle>
                  <DialogDescription>Create a new request. Fill in all required information correctly.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {/* Creator ID - Auto filled */}
                  <div className="space-y-2">
                    <Label>Creator ID</Label>
                    <Input value={currentUser.id} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground">Auto-generated, cannot be changed</p>
                  </div>

                  {/* Target User ID */}
                  <div className="space-y-2">
                    <Label htmlFor="targetUserId">Target User ID *</Label>
                    <Input
                      id="targetUserId"
                      placeholder="e.g., USR12345"
                      value={newRequest.targetUserId}
                      onChange={(e) => setNewRequest({ ...newRequest, targetUserId: e.target.value })}
                    />
                  </div>

                  {/* Request Type */}
                  <div className="space-y-2">
                    <Label>Request Type *</Label>
                    <Select
                      value={newRequest.requestType}
                      onValueChange={(v) => setNewRequest({ ...newRequest, requestType: v as RequestType })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select request type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(requestTypeLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ban Duration Options - Only show for Account Ban */}
                  {newRequest.requestType === "account_ban" && (
                    <div className="space-y-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <Label className="flex items-center gap-2">
                        <Ban className="w-4 h-4 text-red-500" />
                        Ban Duration
                      </Label>
                      <RadioGroup
                        value={newRequest.banDuration}
                        onValueChange={(v) => setNewRequest({ ...newRequest, banDuration: v as BanDuration })}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="ban-no" />
                          <Label htmlFor="ban-no" className="font-normal cursor-pointer">
                            No (Banned until Admin approval)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hours" id="ban-hours" />
                          <Label htmlFor="ban-hours" className="font-normal cursor-pointer">
                            Hour (Auto Unban after specified time)
                          </Label>
                        </div>
                      </RadioGroup>
                      {newRequest.banDuration === "hours" && (
                        <div className="flex items-center gap-2 mt-2">
                          <Timer className="w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="Hours"
                            min={1}
                            value={newRequest.banHours || ""}
                            onChange={(e) => setNewRequest({ ...newRequest, banHours: parseInt(e.target.value) || 0 })}
                            className="w-24"
                          />
                          <span className="text-sm text-muted-foreground">Hours</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Request Details */}
                  <div className="space-y-2">
                    <Label htmlFor="requestDetails">Request Details (Optional)</Label>
                    <Textarea
                      id="requestDetails"
                      placeholder="Enter detailed information..."
                      rows={4}
                      value={newRequest.requestDetails}
                      onChange={(e) => setNewRequest({ ...newRequest, requestDetails: e.target.value })}
                    />
                  </div>

                  {/* Default Status Info */}
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-700 dark:text-yellow-400">
                      Default Status: <strong>Pending</strong>
                    </span>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRequest}>Create Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Requests List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="completed">Done ({stats.completed})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
          </TabsList>

          {["all", "pending", "completed", "rejected"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filteredRequests
                .filter((r) => tab === "all" || r.status === tab)
                .map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              {filteredRequests.filter((r) => tab === "all" || r.status === tab).length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No requests found</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* View Request Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span>Request Details</span>
                {selectedRequest && (
                  <Badge variant="outline" className={statusConfig[selectedRequest.status].color}>
                    {statusConfig[selectedRequest.status].label}
                  </Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Request ID</p>
                    <p className="font-mono font-semibold">{selectedRequest.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <Badge variant="outline" className={requestTypeColors[selectedRequest.requestType]}>
                      {requestTypeLabels[selectedRequest.requestType]}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target User</p>
                    <p className="font-semibold">{selectedRequest.targetUserId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Creator</p>
                    <p className="font-semibold">{selectedRequest.creatorName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created At</p>
                    <p>{format(selectedRequest.createdAt, "dd MMM yyyy, hh:mm a")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Updated At</p>
                    <p>{format(selectedRequest.updatedAt, "dd MMM yyyy, hh:mm a")}</p>
                  </div>
                </div>

                {selectedRequest.requestType === "account_ban" && selectedRequest.banDuration && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm text-muted-foreground mb-1">Ban Duration</p>
                    <p className="font-semibold text-red-600">
                      {selectedRequest.banDuration === "no" 
                        ? "Until Admin Approval" 
                        : `${selectedRequest.banHours} Hours (Auto Unban)`}
                    </p>
                  </div>
                )}

                {selectedRequest.requestDetails && (
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Details</p>
                    <p className="bg-muted p-3 rounded-lg text-sm">{selectedRequest.requestDetails}</p>
                  </div>
                )}

                {selectedRequest.adminComment && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm text-muted-foreground mb-1">Admin Comment (Rejection Reason)</p>
                    <p className="text-red-700 dark:text-red-400">{selectedRequest.adminComment}</p>
                  </div>
                )}

                {selectedRequest.processedBy && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4" />
                    Processed by: <span className="font-medium">{selectedRequest.processedBy}</span>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Process Request Dialog (Admin Only) */}
        <Dialog open={isProcessOpen} onOpenChange={setIsProcessOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process Request</DialogTitle>
              <DialogDescription>
                Request #{selectedRequest?.id} - {selectedRequest?.targetUserId}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Action</Label>
                <RadioGroup
                  value={processAction}
                  onValueChange={(v) => setProcessAction(v as "completed" | "rejected")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="action-complete" />
                    <Label htmlFor="action-complete" className="flex items-center gap-2 cursor-pointer">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Complete
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rejected" id="action-reject" />
                    <Label htmlFor="action-reject" className="flex items-center gap-2 cursor-pointer">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Reject
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {processAction === "rejected" && (
                <div className="space-y-2">
                  <Label htmlFor="rejectReason">
                    Rejection Reason * <span className="text-muted-foreground">(User will see this)</span>
                  </Label>
                  <Textarea
                    id="rejectReason"
                    placeholder="Enter reason for rejection..."
                    rows={3}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsProcessOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleProcessRequest}
                variant={processAction === "rejected" ? "destructive" : "default"}
              >
                {processAction === "completed" ? "Complete Request" : "Reject Request"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
