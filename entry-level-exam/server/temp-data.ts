import {Ticket} from '../client/src/api';

const data = require('./data.json') as Ticket[];

export function getSortedData(sortBy:keyof Ticket, ascending:boolean) {
    return data.sort((a, b) => ascending
    ? a[sortBy]! > b[sortBy]! ? -1 : 1
    : a[sortBy]! < b[sortBy]! ? -1 : 1
    )
}