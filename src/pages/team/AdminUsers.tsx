import TeamManagement from "./TeamManagement";

export default function AdminUsers() {
  return (
    <TeamManagement
      filterRole="admin"
      title="Admin Users"
      description="সকল এডমিন ইউজার ম্যানেজ করুন"
    />
  );
}
