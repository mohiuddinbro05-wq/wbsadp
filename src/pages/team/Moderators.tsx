import TeamManagement from "./TeamManagement";

export default function Moderators() {
  return (
    <TeamManagement
      filterRole="moderator"
      title="Moderators"
      description="সকল মডারেটর ম্যানেজ করুন"
    />
  );
}
