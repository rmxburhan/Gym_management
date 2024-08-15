export interface getAnnouncementsResponse {
    message: string;
    data: Announcement[];
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    attachments: string[];
    createdAt: string;
    updatedAt: string;
}
