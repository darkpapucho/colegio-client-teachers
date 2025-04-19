export type ProfesorAnnouncement = {
  date: string;
  title: string;
  content: string;
  _id: string;
  salones: string[];
};
export type Announcement = {
  date: string;
  title: string;
  content: string;
  _id: string;
  userId: string; //author
};
