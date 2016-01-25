var defaultRecord	= {title: null,quantity: 1,dimensions: null,depth: null};
var dataStore		= new DataStore;
var lumberCalc		= new LumberCalc;

var App = React.createClass({
	getInitialState: function () {
		// Add initial record
		dataStore.add(_.clone(defaultRecord));
		return dataStore.data;
	},

	add: function () {
		dataStore.add(_.clone(defaultRecord));
		this.setState(dataStore.data);
	},

	mod: function (id,data) {
		var record = dataStore.get(id);
		dataStore.mod(id,_.assign(record,data));
		this.setState(dataStore.data);
	},

	remove: function (event) {
		dataStore.rm(this.getEventId(event));
		this.setState(dataStore.data);
	},

	getEventId: function (event) {
		var element = event.target;
		var id;

		while (true) {
			element = element.parentElement;

			if (element == null) break;

			if (element.dataset.id != null) {
				id = element.dataset.id;
				break;
			}
		}

		return id;
	},

	onChange: function (property,event) {
		var id		= this.getEventId(event);
		var data	= dataStore.get(id);

		data[property] = event.target.value;

		dataStore.put(id,data);
		this.setState(dataStore.data);
	},

	getRows: function () {
		var rows	= [];
		var ids		= dataStore.getIds();

		{ids.map(function (id) {
			var data		= dataStore.get(id);
			var quantity	= data.quantity;
			var title		= data.title;

			rows.push(
				<tr key={id} data-id={id}>
					<td>
						<input type="text" defaultValue={title} className="title" onChange={this.onChange.bind(this,'title')} />
					</td>
					<td>
						<input type="number" min="1" step="1" defaultValue={quantity} className="quantity" onChange={this.onChange.bind(this,'quantity')} required />
					</td>
					<td>
						<select defaultValue={data.dimensions} onChange={this.onChange.bind(this,'dimensions')}>
							<option key="choose">Choose</option>
							{lumberCalc.dimensions.map(function (dimension) {
								return (<option key={dimension} value={dimension}>{dimension}</option>);
							})}
						</select>
					</td>
					<td>
						<input type="number" min="1" defaultValue={data.depth} className="depth" onChange={this.onChange.bind(this,'depth')} required />
					</td>
					<td>
						<button onClick={this.remove}>-</button>
					</td>
				</tr>
			);
		}.bind(this))}

		return rows;
	},

	getResults: function () {
		lumberCalc.load(dataStore.data);

		var results = lumberCalc.getResults();


return <span>{JSON.stringify(dataStore.data)}</span>;


	},

/*

*/

	render: function () {
		return (
			<span>
				<h2>Lumber Calculator</h2>
				<div id="inputs">
					<table>
						<thead>
							<tr>
								<th>Title</th>
								<th>Quantity</th>
								<th>Dimensions</th>
								<th colSpan="2">Depth (inches)</th>
							</tr>
						</thead>

						<tbody>{this.getRows()}</tbody>

						<tfoot>
							<tr>
								<td colSpan="5">
									<button onClick={this.add}>+</button>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
				<div id="results">
					<h3>Results</h3>
					{this.getResults()}
				</div>
			</span>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
);