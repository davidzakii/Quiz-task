import apiClient from "../api/axios";
import type { Announcement } from "../types";
import type { ApiSuccessResponse } from "../utils/api-response";

const announcementsBasePath = "/announcements";

const normalizeAnnouncement = (announcement: Announcement) => {
  const semesterId =
    typeof announcement.semesterId === "object" && announcement.semesterId?._id
      ? String(announcement.semesterId._id)
      : String(announcement.semesterId);

  return {
    ...announcement,
    _id: announcement._id ? String(announcement._id) : undefined,
    semesterId,
  };
};

export const announcementService = {
  list: async () => {
    const { data } = await apiClient.get<ApiSuccessResponse<Announcement[]>>(
      announcementsBasePath
    );
    return data.data.map(normalizeAnnouncement);
  },

  listBySemester: async (semesterId: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<Announcement[]>>(
      `${announcementsBasePath}/semester/${semesterId}`
    );
    return data.data.map(normalizeAnnouncement);
  },
};

export type AnnouncementService = typeof announcementService;
