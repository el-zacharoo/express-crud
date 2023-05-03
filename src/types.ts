export type User = {
    name: string;
    email: string;
    id: string;
    date: Date;
}

export type Request = {
    body: User;
    params: {
        id: string;
    }
}

export type Response = {
    json: (arg0: { data: User; status: string; }) => void;
    status: any;
}
