import axios from 'axios';
import {APIRootPath} from '@fed-exam/config';

export type Ticket = {
    id: string,
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
}

export type ApiClient = {
    getTickets: (params: GetTicketParams, page: number, searchBarInput: string) => Promise<GetTicketsPage>;
}

export type GetTicketParams = {
    sortBy: string;
    ascending: string;
    page: number;
    searchBarInput: string;
}

export type GetTicketsPage = {
    pageTickets: Ticket[];
    hasNext: boolean;
}

export const createApiClient = (): ApiClient => {
    return {
        getTickets: (params: GetTicketParams) => {
            return axios.get(APIRootPath, {
                params: params
            }).then((res) => res.data)
        }
    }
}
