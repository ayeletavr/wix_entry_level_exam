import React from 'react';
import './App.scss';
import {createApiClient, GetTicketParams, Ticket} from './api';
// @ts-ignore
import ShowMoreText from 'react-show-more-text';
// @ts-ignore
import ScrollArea from 'react-scrollbar';

export type AppState = {
	tickets?: Ticket[],
	search: string,
	hidden: any[],
	ascending: Boolean,
	sortBy: keyof Ticket,
	page: number,
	hasNext: boolean;
}

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',
		hidden: [],
		ascending: false,
		sortBy: 'title',
		page: 1,
		hasNext: true
	}

	searchDebounce: any = null;

	async componentDidMount() {
		const {sortBy} = this.state
		await this.getTickets(sortBy);
	}

	/**
	 * Handled toggle (hide) button by finding the clicked ticket by its id,
	 * removing it from tickets array and adding it to the hidden tickets array.
	 * @param id: ticket id.
	 */
	handleToggle = (id:string) => {
		if (this.state.tickets) {
			this.setState( {
				tickets: [...this.state.tickets.filter(ticket => ticket.id !== id)],
				hidden: [...this.state.hidden, this.state.tickets.find(ticket => ticket.id === id)]
			})
		}
	}

	/**
	 * Handling restore button: adds the tickets from the hidden tickets array to the (displayed) tickets array.
	 */
	handleRestore = () => {
		if (this.state.tickets) {
			this.setState({
				tickets: [...this.state.tickets, ...this.state.hidden],
				hidden: []
			})
		}
	}


	/**
	 * async method - getter and setter.
	 */
	getTickets = async (sortBy:keyof Ticket) => {
		const {ascending, page, search} = this.state;
		const params: GetTicketParams = {
			sortBy: sortBy,
			ascending: ascending.toString(),
			page: page,
			searchBarInput: search.toLowerCase()
		}

		const t = await api.getTickets(params, page, search);
		this.setState({
			tickets: t.pageTickets,
			hasNext: t.hasNext,
			ascending: !ascending,
			sortBy: sortBy,
			page: page,
			search: search
		});
	}

	/**
	 * Helper to renderSortButton: gets the sorting state (sortBy, ascending) and puts an arrow by the current sort.
	 * (up-arrow to ascending order, down-arrow to decending order.)
	 */
	renderButton = (name: string, property:keyof Ticket) => {
		const {sortBy, ascending} = this.state;
		const orderArrow = sortBy === property 
		? ascending
		? "⬆"f
		: "⬇"
		: null;
		
		return (
			<button className='sort-button' onClick={() => this.getTickets(property)}>{name}{orderArrow}</button>
		)
	}

	/**
	 * Renders the sort button according to its sort-type.
	 */
	renderSortButtons = () => {
		return (
			<div>
				{this.renderButton('Title', 'title')}
				{this.renderButton('Date', 'creationTime')}
				{this.renderButton('Email', 'userEmail')}
			</div>
		)
	}

	/**
	 * (My addition for ex.3), handles a click on a lable by searching cards according to the label.
	 */
	handleLabalFilter = async (label: string) => {
		await this.setState({search: label})
		const {sortBy} = this.state;
		await this.getTickets(sortBy);
	}

	/**
	 * Creats buttons for previous and next page, and present the current label.
	 */
	getPageNumber = () => {
		let prev = null;
		let curr: number = this.state.page;
		let next;
		const {hasNext, page} = this.state
		if (hasNext) {
			next = <button className='next-page' onClick={() => this.nextPage()}> &#9654; </button>
		}
		if (page > 1) {
			prev = <button className='previous-page' onClick={() => this.prevPage()}> &#9664; </button>
		}
		let currentPage: string = ' page: ' + curr.toString() + ' ';
		return (<div className='page-buttons'>{prev}{currentPage}{next}</div>)
	}

	/**
	 * Sets page's state to previous page.
	 */
	prevPage = async () => {
		await this.setState({hasNext: true, page: this.state.page - 1})
		const {sortBy} = this.state
		await this.getTickets(sortBy)
	}

	/**
	 * Sets page's state to next page.
	 */
	nextPage = async () => {
		await this.setState({page:this.state.page + 1})
		const {sortBy} = this.state
		await this.getTickets(sortBy)
	}

	setSearchBarInput = async () => {
		await this.setState({search:this.state.search.toLowerCase()})
		const {sortBy} = this.state
		await this.getTickets(sortBy)
	}
	


	renderTickets = (tickets: Ticket[]) => {
		
		const filteredTickets = tickets
			.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(this.state.search.toLowerCase()));


		return (<ul className='tickets'>

			
			{filteredTickets.map((ticket) => (<li key={ticket.id} className='ticket'>
				<button type='button' className='hide-button' onClick={() => this.handleToggle(ticket.id)}>hide</button>
				<div> <ScrollArea>
				<h5 className='title'>{ticket.title}</h5>
				<ShowMoreText className='show-more' lines={3}>{ticket.content}</ShowMoreText>
				<div className='labels'>{ticket.labels? ticket.labels.map((labels)=>
				(<button key={labels} className ='label' onClick={() => this.handleLabalFilter(labels)}>{labels}</button>))  : null }</div>
				<footer>
					<div className='meta-data'>By {ticket.userEmail} | { new Date(ticket.creationTime).toLocaleString()}</div>
				</footer>
				</ScrollArea> </div>
				
			</li>))}
		</ul>);
	}


	onSearch = async (val: string, newPage?: number) => {
		
		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val,
				page: 1
			});
			this.setSearchBarInput()
		}, 300);
	}

	render() {	
		const {tickets, hidden} = this.state;

		return (<main>
			<h1 className='ticket-list'>Tickets List</h1>
			<header>
				<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value, this.state.page)}/>
			</header>
			<div> {this.getPageNumber()} </div>
			{tickets ? <div className='results'>Showing {tickets.length} results ({this.state.hidden.length} hidden tickets) <span onClick={this.handleRestore}>restore</span></div> : null }	
			{this.renderSortButtons()}
			{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
		</main>)
	}
}

export default App;

