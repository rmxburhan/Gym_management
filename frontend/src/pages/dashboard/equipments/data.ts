export interface Equipment {
    _id: string;
    name: string;
    qty: number;
    image?: string;
}

export interface EquipmentLog {
    _id: string;
    equipmentId: string;
    adminId: string;
    descriptionn: string;
    category: string;
    qty?: number;
}

export interface getEquipmentsResponse {
    message: string;
    data: Equipment[];
}

export interface createEquipmentsRequest {
    name: string;
    qty: string;
    image?: FileList | null;
}
