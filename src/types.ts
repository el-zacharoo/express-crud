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
    };
}

type RespJSON = {
    data: User;
    status: string;
    matches?: number;
}

type RespErr = {
    json: (arg0: { error: Error }) => void;
}

export type Response = {
    json: (arg0: RespJSON) => void;
    status: (arg0: number) => RespErr;
}
