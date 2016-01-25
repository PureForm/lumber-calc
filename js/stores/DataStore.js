var DataStore = function () {
	this.data = {
		ids:		[],
		records:	{}
	}
};

DataStore.prototype.add = function (data) {
	var id = this.genId();
	this.data.ids.push(id);

	data.id					= id;
	this.data.records[id]	= data;
};

DataStore.prototype.rm = function (id) {
	delete this.data.ids[this.data.ids.indexOf(id)];
	delete this.data.records[id];

	// Remove undefined values
	this.data.ids = _.without(this.data.ids,undefined)
};

DataStore.prototype.put = function (id,data) {
	this.data.records[id] = data;
};

DataStore.prototype.get = function (id) {
	return this.data.records[id];
};

DataStore.prototype.getIds = function (id) {
	return this.data.ids;
};

DataStore.prototype.genId = function () {
	return _.uniqueId('DataStore');
};