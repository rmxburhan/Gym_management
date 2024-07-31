export interface Equipment {
    _id: string;
    name: string;
    qty: number;
    image?: string;
}

export interface EquipmentLog {
    _id: string;
    equipment:
        | string
        | {
              _id: string;
              name: string;
          };
    admin: {
        _id: string;
        name: string;
    };
    description: string;
    category: string;
    createdAt: string;
}

export interface getEquipmentsResponse {
    message: string;
    data: Equipment[];
}

export interface getEquipmentResponse {
    message: string;
    data: {
        _id: string;
        name: string;
        qty: number;
        image?: string;
        log: EquipmentLog[];
    };
}

export interface createEquipmentsRequest {
    name: string;
    qty: number;
    image?: FileList | null;
}

export interface addEquipmentLogRequest {
    description: string;
    category: string;
}
