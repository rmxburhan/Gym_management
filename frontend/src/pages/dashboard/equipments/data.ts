export interface Equipment {
    _id: string;
    name: string;
    qty: number;
    image: string;
    createdAt: string;
    updatedAt: string;
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
    equipments: Equipment[];
}
