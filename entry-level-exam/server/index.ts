import express from 'express';
import bodyParser = require('body-parser');
import { getSortedData } from './temp-data';
import { serverAPIPort, APIPath } from '@fed-exam/config';
import { Ticket, GetTicketsPage } from '../client/src/api';

console.log('starting server', { serverAPIPort, APIPath });

const app = express();

const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});


app.get(APIPath, (req, res) => {

  // @ts-ignore
  const searchBarInput: string = req.query.searchBarInput;
  const {sortBy, ascending} = req.query;
  // @ts-ignore
  const page: number = req.query.page;
  const tempData = getSortedData(sortBy as keyof Ticket, ascending === "true");
  let paginatedData: Ticket[] = tempData;
  if (searchBarInput.includes('from: ')) {
    const email: string = searchBarInput.slice(6);
    paginatedData = paginatedData.filter((ticket: Ticket) => ticket.userEmail.toLowerCase().includes(email)).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE + 1)
  }
  else if (searchBarInput.includes('after: ')) {
    const dateStr: string[] = (searchBarInput.slice(6,16)).split('/');
    let date = new Date(parseInt(dateStr[2]), parseInt(dateStr[1]), parseInt(dateStr[0]));
    paginatedData = paginatedData.filter((ticket: Ticket) => new Date(ticket.creationTime) < date).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE + 1)
  }
  else if (searchBarInput.includes('before: ')) {
    const dateStr: string[] = (searchBarInput.slice(6,16)).split('/');
    let date = new Date(parseInt(dateStr[2]), parseInt(dateStr[1]), parseInt(dateStr[0]));
    paginatedData = paginatedData.filter((ticket: Ticket) => new Date(ticket.creationTime) > date).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE + 1)
  }

  else {
    paginatedData = paginatedData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE + 1); // for page 1, take tickets[0] to tickets[21], +1 from next term.
  }
  const hasNext: boolean = paginatedData.length === 21;
  if (hasNext) { // handles data that have to have next page.
    paginatedData = paginatedData.slice(0, paginatedData.length - 1);
  }
  const batch: GetTicketsPage = {pageTickets: paginatedData, hasNext:hasNext}

  res.send(batch);
});

app.listen(serverAPIPort);
console.log('server running', serverAPIPort)

